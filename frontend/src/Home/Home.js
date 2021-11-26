import React from 'react';
import HomeSidebar from './HomeSidebar';

const Home = () => {
    return(
        <div>
            <div style={{position : 'absolute', zIndex: -1}}>
                <HomeSidebar/> 
            </div>  
            <h1>Home</h1>
        </div>
    )
}

export default Home