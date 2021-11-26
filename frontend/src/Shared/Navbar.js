import React from "react";
import { Dropdown, Menu } from 'semantic-ui-react'
import { useNavigate } from 'react-router';

const Navbar = () => {
  let navigate = useNavigate();
  return (      
    <Menu pointing>
      <Menu.Item>
        <img src='./images/Logo.png' />
      </Menu.Item>      
      <Menu.Item
        name='home'
        // active={activeItem === 'messages'}
        onClick={() => navigate('/')}
      />        
      <Dropdown item text='Classifiers'>
        <Dropdown.Menu>
          <Dropdown.Item onClick={() => navigate('/mnist-classifier')}>MNIST Classifier</Dropdown.Item>
          <Dropdown.Item onClick={() => navigate('/imagenet-classifier')}>Imagenet Classifier</Dropdown.Item>
        </Dropdown.Menu>
      </Dropdown>
      <Dropdown item text='Pathfinding'>
        <Dropdown.Menu>
          <Dropdown.Item onClick={() => navigate('/astar-pathfinding')}>A* Pathfinding</Dropdown.Item>     
        </Dropdown.Menu>
      </Dropdown>
      <Menu.Item
        name='about'
        // active={activeItem === 'messages'}
        onClick={() => navigate('/about')}
      />
    </Menu>
  );
};

export default Navbar;