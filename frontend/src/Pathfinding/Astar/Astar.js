import React, { useState, useEffect, useContext } from 'react';
import AstarSidebar from './AstarSidebar';
import { Grid } from 'semantic-ui-react'
import RenderGrid from '../RenderGrid';
import { PathfindingContext } from '../../Context';

const pathfindingConfig = require('../../configs/pathfinding.json');

const NodeType = pathfindingConfig['nodeTypes']
const NodeColors = pathfindingConfig['nodeColors']

const Astar = () => {    

    const gridMargin = 250;
    const rows = 8;
    const cols = 16;

    const [nodeSize, setNodeSize] = useState((window.innerWidth - gridMargin * 2) / 16);
    const [rerender, setRerender] = useState(true)
    const [selectedNodeType, setSelectedNodeType] = useState('obstacle')
    const [clearGrid, setClearGrid] = useState(false)
    const [pathfindingGrid, setPathfindingGrid] = useState([])
    const [result, setResult] = useState('Result')
    const [showFCost, setShowFCost] = useState(false)

    const HandleResize = () => {
        setNodeSize((window.innerWidth - gridMargin * 2) / 16)
    };   
    
    // Api call to flask
    const handleFindPathClick = async (animationTime) => {  
        if (pathfindingGrid) {    
            let grid = pathfindingGrid
            grid.forEach(row => {
                row.forEach(element => {                 
                    if(element.nodeType == NodeType.Path || element.nodeType == NodeType.Explored || element.nodeType == NodeType.Open){
                        element.nodeType = NodeType.Unblocked
                    }
                })                
            })       
            setPathfindingGrid(grid)

            setResult("Pathfining...") 
            const response = await fetch('/api-astar-find-path', {
                method: "POST",
                body: JSON.stringify(grid),
            });

            if (response.status === 200) {
                const text = await response.text();                
                handleResult(text, grid, animationTime)
            } else {
                console.log('ERROR')
                setResult("Error from API.");
            }
        }
    }

    const timeout = (ms) => {
        return new Promise(resolve => setTimeout(resolve, ms));
    }

    const handleResult = async (text, grid, animationTime) => {
        let result = JSON.parse(text)
        let resultPath = result['path']
        let status = result['status']
        let gridHistory = result['gridHistory']
        let currentRerender = rerender

        if(status == "success" || status == "blocked"){
            for(const step of gridHistory){
                for(const row of step){
                    for(const node of row){
                        const nodeType = grid[node.row][node.col].nodeType
                        if(nodeType != NodeType['Finish'] && nodeType != NodeType['Start']){
                            grid[node.row][node.col].nodeType = node.nodeType
                        }  

                        if(node.nodeType == NodeType['Explored'] || node.nodeType == NodeType['Open']){
                            grid[node.row][node.col].fCost = node.fCost;
                        }            
                        else{
                            grid[node.row][node.col].fCost = 0
                        }          
                    }
                }
                setPathfindingGrid(grid);
                currentRerender = !currentRerender
                setRerender(currentRerender)
                await timeout(animationTime);            
            }   
            
            if(status == 'success'){
                for(const element of resultPath){
                    if(grid[element.row][element.col].nodeType != NodeType['Finish']){
                        grid[element.row][element.col].nodeType = NodeType['Path']
    
                        setPathfindingGrid(grid)
                        currentRerender = !currentRerender
                        setRerender(currentRerender)
                        await timeout(animationTime); 
                    }                     
                }
            }            
                        
            setResult(status);            
        }
        else{
            console.log(status)
            setResult(status); 
        }
    } 

    useEffect(() => {        
        window.addEventListener("resize", HandleResize, false);       
        }, []);

    return(
        <PathfindingContext.Provider value={{pathfindingGrid, setPathfindingGrid , clearGrid, setClearGrid, 
            selectedNodeType, setSelectedNodeType, handleFindPathClick, showFCost, setShowFCost}}>
            <div style={{paddingBottom : 40}}>
                <div style={{position : 'absolute', zIndex: 9999}}>
                    <AstarSidebar/> 
                </div>  
                <h1>A* Pathfinding</h1>
                <div style={{marginLeft: gridMargin, marginRight: gridMargin, marginTop: 40}}>
                    <Grid>
                        <RenderGrid width={nodeSize} 
                            rows={rows} 
                            cols={cols} 
                            setRerender={setRerender} 
                            rerender={rerender}
                            />
                    </Grid>
                </div>
            </div>
        </PathfindingContext.Provider>
    )
}

export default Astar