import './App.css';
import 'semantic-ui-css/semantic.min.css'

import React, { useState, useEffect, useContext } from 'react';

import AppRoutes from './AppRoutes';
import Navbar from './Shared/Navbar';
import {Provider, defaultTheme } from '@adobe/react-spectrum';

import Statusbar from './Shared/Statusbar'
import { StatusbarContext } from './Context';

const status = require('./configs/status.json')

function App() {
  const [windowSize, setWindowSize] = useState( {"height" : window.innerHeight, "width" : window.innerWidth} )
  const [globalStatus, setGlobalStatus] = useState( {'status' : status.Ready, 'statusText' : 'Ready'} )
  const handleResize = () => {
    setWindowSize({ "height" : window.innerHeight, "width" : window.innerWidth })
  }

  useEffect(() => {        
      window.addEventListener("resize", handleResize, false);     
      }, []);


  return (
    <div className="App">  
      <Provider theme={defaultTheme} colorScheme="light">
        <StatusbarContext.Provider value={{globalStatus, setGlobalStatus}}>
          <Navbar/>     
          <div style={{overflowY: "scroll", marginLeft : '1%', marginRight : '1%', height : window.innerHeight - 105}}>  
            <AppRoutes/> 
          </div>    
          <Statusbar status={globalStatus.status} statusText={globalStatus.statusText}/>
        </StatusbarContext.Provider>
      </Provider>
    </div>
  );
}

export default App;
