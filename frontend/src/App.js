import logo from './logo.svg';
import './App.css';
import 'semantic-ui-css/semantic.min.css'

import AppRoutes from './AppRoutes';
import Navbar from './Shared/Navbar';


function App() {
  return (
    <div className="App"> 
      <Navbar/>        
      <AppRoutes/>
    </div>
  );
}

export default App;
