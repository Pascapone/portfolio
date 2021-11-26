import React, { useState, useEffect } from 'react';
import AstarSidebar from './AstarSidebar';
import { Grid } from 'semantic-ui-react'
import RenderGrid from '../RenderGrid';


const Astar = () => {
    const gridMargin = 250;
    const rows = 8;
    const cols = 16;

    const [nodeSize, setNodeSize] = useState((window.innerWidth - gridMargin * 2) / 16);

    const HandleResize = () => {
        setNodeSize((window.innerWidth - gridMargin * 2) / 16)
    };    

    useEffect(() => {        
        window.addEventListener("resize", HandleResize, false);       
        }, []);

    return(
        <div>
            <div style={{position : 'absolute', zIndex: -1}}>
                <AstarSidebar/> 
            </div>  
            <h1>A* Pathfinding</h1>
            <div style={{marginLeft: gridMargin, marginRight: gridMargin, marginTop: 40}}>
                <Grid>
                    <RenderGrid width={nodeSize} rows={rows} cols={cols}/>
                </Grid>
            </div>
        </div>
    )
}

export default Astar