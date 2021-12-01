import React, { useState, useEffect } from "react";
import KNearestSidebar from "./KNearestSidebar";
import { ClusterinContext } from "../../Context";
import { ScatterChart , Scatter, CartesianGrid, XAxis, YAxis, ZAxis, ComposedChart, Cell  } from 'recharts'
import Statusbar from '../../Shared/Statusbar'

const status = require('../../configs/status.json')

const colors = [
    '#7FFF00', // Chartreuse
    '#7FFFD4', // Aquamarine
    '#FF7F50', // Coral
    '#5F9EA0', // CadetBlue
    '#8A2BE2', // BlueViolet
    '#008B8B', // DarkCyan
    '#DC143C', // Crimson
    '#696969', // DimGrey
    '#FF00FF', // Magenta
    '#FFFF00'  // Yellow
]

const KNearest = () => {
    const [nClusters, setNClusters] = useState(2)
    const [nSamples, setNSamples] = useState(50)
    const [std, setStd] = useState(1)
    const [points, setPoints] = useState([])
    const [classifiers, setClassifiers] = useState([])
    const [animationTime, setAnimationTime] = useState(500)
    const [clusteringRunning, setClusteringRunning] = useState(false)
    const [currentStatus, setCurrentStatus] = useState(status.Ready)
    const [statusText, setStatusText] = useState('Ready')
    const [windowSize, setWindowSize] = useState({ "height" : window.innerHeight, "width" : window.innerWidth})

    const handleResize = () => {
        setWindowSize({ "height" : window.innerHeight, "width" : window.innerWidth})
    }

    useEffect(() => {        
        window.addEventListener("resize", handleResize, false);       
        }, []);

    const timeout = async (ms) => {
        return new Promise(resolve => setTimeout(resolve, ms));
    }

    const handlePopulateGraphClick = async () => {
        const respone = await fetch('/api-generate-clusters', {
            method : 'POST', 
            body : JSON.stringify({"centers" : nClusters, "n_samples" : nSamples, 'cluster_std' : std})
        })

        if (respone.status == 200){
            const text = await respone.text()
            const points = JSON.parse(text)
            console.log(points)
            if (classifiers.length > 0){
                setClassifiers([])
            }
            setCurrentStatus(status.Ready)
            setStatusText('Clusters created')
            setPoints(points)
        }
        else{
            setCurrentStatus(status.Error)
            setStatusText('Error from API')
        }
    }

    const handleFindClustersClicked = async () => {
        setCurrentStatus(status.Loading)
        setStatusText('Classifying clusters')

        const response = await fetch('/api-knearest', { 
            method : 'POST',
            body : JSON.stringify({points, nClusters})
        })

        if (response.status == 200){
            const text = await response.text()
            const result = JSON.parse(text)
            
            setCurrentStatus(status.Loading)
            setStatusText('Animation playing')

            for(const iter of result['iteration_tracker']){
                setPoints(iter['points'])
                setClassifiers(iter['classifiers'])
                await timeout(animationTime);  
            }            

            setPoints(result['points'])
            setClusteringRunning(false)

            setCurrentStatus(status.Ready)
            setStatusText('Classifying clusters completed')
        }
        else{
            setCurrentStatus(status.Error)
            setStatusText('Error from API')
            setClusteringRunning(false)
        }
    }

    return(
        <ClusterinContext.Provider value={{handlePopulateGraphClick, setNClusters, setNSamples, setStd, 
            handleFindClustersClicked, setAnimationTime, clusteringRunning, setClusteringRunning}}>
            <div style={{paddingBottom : 40}}>  
                <div style={{position : 'absolute', zIndex: 1}}>   
                    <KNearestSidebar/>
                </div> 
                <h1>K-Nearest Neighbors</h1>
                <div>
                    <ComposedChart width={800}
                        height={400}
                        margin={{ top: 20, right: 20, bottom: 10, left: 300 }}>
                            <CartesianGrid />
                            <XAxis dataKey="x" name="x" type="number"/>
                            <YAxis dataKey="y" name="y" />
                            <ZAxis dataKey="z" name="z" type="number" range={[50, 200]}/>
                            <Scatter name="Points" data={points} fill="#8884d8">
                                {points.map((entry, index) => (
                                    <Cell key={`cell-${index}`} fill={colors[entry['classifier']]} />
                                ))}
                            </Scatter>
                            <Scatter name="Clasifiers" data={classifiers} shape="cross" fill="#8884d8">
                                {points.map((entry, index) => (
                                    <Cell key={`cell-${index}`} fill={colors[index]} />
                                ))}
                            </Scatter>
                    </ComposedChart>
                </div>                             
            </div>     
            <Statusbar status={currentStatus} statusText={statusText} windowSize={windowSize}/>         
        </ClusterinContext.Provider>
    )
}

export default KNearest