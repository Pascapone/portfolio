import './App.css';
import 'semantic-ui-css/semantic.min.css'

import AppRoutes from './AppRoutes';
import Navbar from './Shared/Navbar';

import {Provider, defaultTheme } from '@adobe/react-spectrum';

function App() {
  return (
    <div className="App">  
      <Provider theme={defaultTheme} colorScheme="light">
        <Navbar/>        
        <AppRoutes/>    
      </Provider>
    </div>
  );
}

export default App;
