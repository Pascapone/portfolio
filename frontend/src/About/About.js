import React, { useEffect } from 'react';
import ReactDOM from 'react-dom';
import * as THREE from 'three'
import Render3D from '../3D/Render3D';
import Render3DTest from '../3D/Render3DTest';

const About = () => {   

    return(
        <div>            
            <h1>About</h1>
                <Render3DTest/>
                {/* <Render3D/> */}
           
        </div>
        
    )
}

export default About