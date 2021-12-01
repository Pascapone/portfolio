import React from "react";
import { Segment } from 'semantic-ui-react'
import { StatusLight } from '@adobe/react-spectrum'

const Statusbar = (props) => {
    const height = 35
    console.log('Rerender INNER')
    return (
        <div style={{position : 'absolute', 
            zIndex: 1,  
            top : props.windowSize.height - height,            
            marginBottom : 0,
            paddingBottom : 0}}>
            <Segment style={{height : height, margin : 'auto', paddingTop : 3, paddingLeft : 2, width : props.windowSize.width}} textAlign="left">
                <StatusLight variant={props.status}>{props.statusText}</StatusLight>
            </Segment>     
        </div>
    )
}

export default Statusbar;