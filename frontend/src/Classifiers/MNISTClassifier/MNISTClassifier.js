import React, { useRef, useEffect, useState } from "react";
import CanvasDraw from "react-canvas-draw";
import { Card, Grid, Image, Button, Segment } from "semantic-ui-react";


const MNISTClassifier = () => {
    const canvasRef = useRef();

    const [result, setResult] = useState("None");

    // const HandleResize = () => {
    //     setCardSize(cardRef.current.offsetWidth - canvasRightOffset)
    // };    

    // useEffect(() => {        
    //     window.addEventListener("resize", HandleResize, false);       
    //     }, []);
    
    const ClearCanvas = () => {
        canvasRef.current.clear();
    };

    const PredictDigit = async () => {
        const image = canvasRef.current.getSaveData();       
        if (image) {  
            setResult('Predicting...');    
            const response = await fetch('/api-classify-mnist', {
              method: "POST",
              body: image,
            });
    
            if (response.status === 200) {
              const text = await response.text();
              setResult(text);
            } else {
              setResult("Error from API.");
            }
        }
    };

    return (
        <div>            
            <h1>MNIST Classifier</h1>
            <div style={{paddingBottom: 20}}>
            <div style={{width : 500, margin : 'auto'}}>
                <Segment>
                    You can draw a digit and let the classifier guess which number it is.<br/>
                    (One is currently only working reliable with [I] and not the classical [1]. <br/>
                    The mnist dataset mostly consists of [I]-examples. Fix incoming.)             
                </Segment>
            </div>
            </div>  
            <div style={{width : 500, margin : 'auto'}}>
                <Segment>            
                    <div style={{
                        margin: 'auto', 
                        width : 202,
                        height : 202, 
                        border: '1px solid black',
                        }}>
                        <CanvasDraw ref={canvasRef} canvasWidth={200} canvasHeight={200} brushRadius={20} loadTimeOffset={1}/>
                    </div>  
                    <Grid centered columns={5} style={{marginTop : 1}}>
                        <Grid.Row>
                            <Grid.Column textAlign="center">
                                <Button onClick={PredictDigit}>Predict</Button> 
                            </Grid.Column>
                            <Grid.Column textAlign="center">
                                <Button onClick={ClearCanvas}>Clear</Button> 
                            </Grid.Column>
                        </Grid.Row>    
                        <Grid.Row>
                            <h4>Prediction: {result}</h4>
                        </Grid.Row> 
                    </Grid>    
                    </Segment>     
            </div> 
        </div>
    );
};

export default MNISTClassifier;