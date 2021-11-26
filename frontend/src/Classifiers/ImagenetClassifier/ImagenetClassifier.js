import React, { useEffect, useState } from "react";
import { Grid, Image, Button, Segment, Form, Icon, Modal } from "semantic-ui-react";

const ImageClassifier = () => {  

    const [result, setResult] = useState("Lion");
    const [imageURL, setImageURL] = useState("https://upload.wikimedia.org/wikipedia/commons/1/1e/Cecil_the_lion_at_Hwange_National_Park_%284516560206%29.jpg");
    const [urlForm, setUrlForm] = useState(""); 
    const [openHelp, setOpenHelp] = useState(false)
    const [helpImage, setHelpImage] = useState(false)

    useEffect(() => {
    // Placeholder
    }, []);   
   

    const HandleURLChange = (event) => {
        setUrlForm(event.target.value)
    };

    const LoadImageURL = (event) => {
        event.preventDefault();
        setImageURL(urlForm);
        
    };    

    const OpenHelpModal = () => {
        setHelpImage("./")     
        setOpenHelp(true);
        setTimeout(() => {
            setHelpImage("./images/ImageInstructions.gif")
          }, 0)   
    }

    // Api call to flask
    const HandlePredictClick = async (event) => {  
        if (imageURL) {  
            setResult('Predicting...');    
            const response = await fetch('/api-classify-image', {
              method: "POST",
              body: imageURL,
            });
    
            if (response.status === 200) {
              const text = await response.text();
              setResult(text);
            } else {
              setResult("Error from API.");
            }
        }
    }

    return (
        <div>     
            <Modal
                onClose={() => setOpenHelp(false)}
                onOpen={() => setOpenHelp(true)}
                open={openHelp}                
            >
                <Modal.Header>Instructions</Modal.Header>
                <Modal.Content image>
                    <Image fluid src={helpImage} wrapped />
                </Modal.Content>
                <Modal.Actions>
                    <Button color='black' onClick={() => setOpenHelp(false)}>
                    Close
                    </Button>                    
                </Modal.Actions>
            </Modal>
            <h1>Imagenet</h1>
            <div style={{paddingBottom: 20}}>
                <div style={{width : 500, margin : 'auto'}}>
                    <Segment>
                        <Grid centered>
                            <Grid.Row>
                                <h3 style={{marginRight : 'auto', marginLeft : 'auto'}}>Link to the image</h3>
                            </Grid.Row>
                            <Grid.Row>                            
                                <Grid.Column>                                
                                    <Form>                                    
                                        <Form.Field>                                        
                                            <input placeholder='URL' onChange={HandleURLChange}/>
                                        </Form.Field>
                                    </Form>
                                </Grid.Column>
                            </Grid.Row>                        
                            <Grid.Row centered>                                
                                    <Button onClick={LoadImageURL}>Load Image</Button>           
                                    <Button onClick={HandlePredictClick}>Predict</Button>
                                    <Button primary icon onClick={OpenHelpModal}>
                                        <Icon name='question circle outline' />
                                    </Button>                                                              
                            </Grid.Row>
                        </Grid>
                    </Segment>
                    <Segment>
                        <h4>Prediction: {result}</h4>
                        <Image src={imageURL}/>
                    </Segment>
                </div>
            </div>     
        </div>
    );
};

export default ImageClassifier;