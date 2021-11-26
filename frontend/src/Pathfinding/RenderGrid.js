import React from 'react';
import { Segment, Grid } from 'semantic-ui-react'

let grid = []

const NodeType = {
    Open: 1,
    Blocked: 2,
    Start: 3,
    Finish: 4
}

class Node{
    constructor(x, y, nodeType){
        this.x = x;
        this.y = y;
        this.nodeType = nodeType;
    }
}

const CreateGrid = (props) => {
    grid = []
    for (let row = 0; row < props.rows; row++) { 
        for (let col = 0; col < props.cols; col++) {
            grid.push(new Node(col, row, NodeType.Open))
        }
    }
}

const RenderGrid = (props) => {
    if(grid.length == 0){
        console.log('Create Grid')
        CreateGrid({rows: props.rows, cols: props.rows})
    }

    let renderGrid = []
    for (let row = 0; row < props.rows; row++) {        
        let renderRow = []
        for (let col = 0; col < props.cols; col++) {
            renderRow.push(
                <Grid.Column style={{margin: 0, padding : 0}}>
                    <Segment style={{margin: 0, height : props.width}}>
                    </Segment>
                </Grid.Column>
            )            
        } 
        renderGrid.push(<Grid.Row style={{margin: 0, padding : 0}} columns={16}>{renderRow}</Grid.Row>)     
    }
    return renderGrid;
}

export default RenderGrid;