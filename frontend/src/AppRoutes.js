import React from 'react';
import { BrowserRouter, Routes, Route, Link, Outlet } from "react-router-dom";
// import ImageClassifier from './Classifiers/ImageClassifier';
// import MNISTClassiefier from './Classifiers/MNISTClassifier';
// import Astar_Pathfinding from './Pathfinding/Astar_Pathfinding';
import Home from './Home/Home';
import About from './About/About';
import MNISTClassiefier from './Classifiers/MNISTClassifier/MNISTClassifier';
import ImageClassifier from './Classifiers/ImagenetClassifier/ImagenetClassifier';
import Astar from './Pathfinding/Astar/Astar';

const AppRoutes = ()=> {
    return (     
        <Routes>
            <Route path="/" element={<Home />} />        
            <Route path="/about" element={<About />} />    
            <Route path="/mnist-classifier" element={<MNISTClassiefier />} /> 
            <Route path="/imagenet-classifier" element={<ImageClassifier />} />   
            <Route path="/astar-pathfinding" element={<Astar />} />  
        </Routes>
    );
}

export default AppRoutes;