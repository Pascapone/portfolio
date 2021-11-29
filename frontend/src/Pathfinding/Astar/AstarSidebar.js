import React, { useState, useContext } from 'react'
import { Menu } from 'semantic-ui-react'
import {Slider, Picker, Item, Switch } from '@adobe/react-spectrum'
import { PathfindingContext } from '../../Context';

const AstarSidebar = (props) => {
  const [obstacleValue, setObstacleValue] = useState(50)  
  const [animationTime, setAnimationTime] = useState(500)

  const {selectedNodeType, setSelectedNodeType, clearGrid, setClearGrid, handleFindPathClick,
    showFCost, setShowFCost} = useContext(PathfindingContext)

  const handleItemClick = (e, { name }) => {
    switch (name) {
      case 'clear':
        setClearGrid(true)
        break;
      case 'find':
        handleFindPathClick(animationTime)
        break;    
      default:
        break;
    }
  }

  const handelShowFCostChange = (value) => {
    setShowFCost(value)
  }

  const handleObstacleChange = (e, { name, value }) => {
    setObstacleValue(value)
  }

  const handleNodeTypeChanged = (value) => {
    setSelectedNodeType(value)
  }

  const handleAnimationTimeChange = (value) => {
    setAnimationTime(value)
  }

  return (       
    <Menu vertical visible={false}>
        <Menu.Item header
          name='header'
        >         
          Grid Controll
        </Menu.Item>   
        <Menu.Item name='populate'
          onClick={handleItemClick}>       
          Populate Grid
        </Menu.Item>  
        <Menu.Item name='clear'
          onClick={handleItemClick}
        >        
          Clear Grid
        </Menu.Item>  
        <Menu.Item name='find'
          onClick={handleItemClick}
        >        
          Find Path
        </Menu.Item>  
        <Menu.Item >          
          <Slider width={150} 
          label="Animation Time" 
          defaultValue={500}
          minValue={0}
          maxValue={1000}
          getValueLabel={(value) => `${value} ms`}
          onChange={handleAnimationTimeChange} />        
        </Menu.Item>  
        <Menu.Item>
          <Switch onChange={handelShowFCostChange}>Show F-Cost</Switch>
        </Menu.Item>
        <Menu.Item >          
          <Slider width={150} 
          label="Obstacles" 
          defaultValue={20}
          minValue={0}
          maxValue={40} />        
        </Menu.Item>   
        <Menu.Item >
          <Picker label="Choose Node Type" width={150} onSelectionChange={handleNodeTypeChanged} defaultSelectedKey={'obstacle'}>
            <Item key="obstacle">Obstacle</Item>
            <Item key="start">Start</Item>
            <Item key="finish">Finish</Item>
            <Item key="unblocked">Unblocked</Item>
          </Picker>
        </Menu.Item>     
      </Menu>   
  )
}

export default AstarSidebar;