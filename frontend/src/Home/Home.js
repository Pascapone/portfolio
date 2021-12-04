import React, { useRef } from 'react';
import HomeSidebar from './HomeSidebar';
import colonnaMT from '../Fonts/Colonna MT_Regular.json';
import * as THREE from 'three';
import { Canvas, useFrame } from '@react-three/fiber'
import { FontLoader } from 'three/examples/jsm/loaders/FontLoader'
import { Segment, Icon, Button } from "semantic-ui-react";
import { TextGeometry } from 'three/examples/jsm/geometries/TextGeometry'
import { extend } from '@react-three/fiber'



const Home = () => {    
    extend({ TextGeometry })

    const font = new FontLoader().parse(colonnaMT)

    const textOptions = {
        font : font,
        size: 4,
        height: 1,
        depth : 1
      };  
    

    function AnimatedLogo() {
        const ref = useRef()
        useFrame(({ clock }) => {
            const timePassed = clock.getElapsedTime()
            ref.current.rotation.y = timePassed
            console.log(timePassed)
        })
        return (
            <group ref={ref} position={[0, 0, 0]}>
                <mesh position={[-1, -1, -0.5]} castShadow={true}>
                    <textGeometry args={["P", textOptions]} />
                    <meshStandardMaterial color="#42c5f5" roughness={0.5} metalness={0.8} /> 
                </mesh>                
            </group>
        )
      }    

      const handleGithubClicked = () => {
        window.open('https://github.com/Pascapone/portfolio', "_blank")
      }

    return(
        <div>
            {/* <div style={{position : 'absolute', zIndex: -1}}>
                <HomeSidebar/>        
            </div>               */}
            <h1>Home</h1> 
            
            <Segment style={{ width  : 600, margin : 'auto' }}>
                Welcome to the homepage of Pascal Schott. On this homepage I'm presenting some of my work. The webapp is
                still being developed and will be updated frequently. The project's on this website are designed to be visually
                appealing. Some more sophisticated machine learning project's will be added next, in the form of colab notebooks.
            </Segment>
            <Button
                basic
                color='blue'
                content='Github'
                icon='github'
                label={{
                    as: 'a',
                    basic: true,
                    color: 'blue',
                    pointing: 'left',
                    content: 'Pascal Schott',
                }}
                style={{ marginTop : 20 }}
                onClick={handleGithubClicked}
                />
            {/* <div style={{ margin : 'auto' }}> 
                <Canvas style={{ width : 400, height : 400, margin : 'auto'}}>                    
                    <ambientLight intensity={0.8} />
                    <pointLight position={[0, 4, 0]} intensity={1} castShadow={true}/>
                   
                    <hemisphereLight color="#ffffff" groundColor="#b9b9b9" position={[0, 5, 0]} intensity={0.85} />                 
                    <AnimatedLogo/>                    
                </Canvas>
            </div>  */}
        </div>
    );
};

export default Home;