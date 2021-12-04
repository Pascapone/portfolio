// import React, { Component } from "react";
// import ReactDOM from "react-dom";
// import * as THREE from "three";
// import { FontLoader } from 'three/examples/jsm/loaders/FontLoader';
// import { TextGeometry } from 'three/examples/jsm/geometries/TextGeometry';
// import { FBXLoader } from 'three/examples/jsm/loaders/FBXLoader';
// import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';
// import { TGALoader } from 'three/examples/jsm/loaders/TGALoader';
// import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';

// import colonnaMT from '../Fonts/Colonna MT_Regular.json';
// import { Mesh } from "three";




// class Render3D extends Component {
//   constructor(props) {
//     super(props);
//     const font = new FontLoader().parse(colonnaMT)
//     const textOptions = {
//       font : font,
//       size: 2,
//       height: 0.2,
//       depth : 1
//     };  
//     this.state = { width: 1000, height : 1000/16*9, sceneRatio : 16/9, font : font, 
//       textOptions};
//   }
  
  
//   componentDidMount() {    
//     // Scene Setup
//     var scene = new THREE.Scene();    
//     var camera = new THREE.PerspectiveCamera( 75, this.state.sceneRatio, 0.1, 1000 );
//     var renderer = new THREE.WebGLRenderer({ alpha: true });
//     renderer.shadowMap.enabled = true;
//     renderer.shadowMap.type = THREE.PCFSoftShadowMap;
//     renderer.setSize( this.state.width, this.state.height);
//     this.mount.appendChild( renderer.domElement );
    
//     // Animation Paramets
//     const animationActions = [];
//     let activeAction = null;
//     let crossFadeAction = null;
//     let mixer = null;

//     let idleAction;

//     const robotSpeed =  5;    
//     const jumpSpeed = 2

//     // Controls
//     var orbitControls = new OrbitControls(camera, renderer.domElement);
//     orbitControls.enableDamping = true;
//     orbitControls.target.set(0, 1, 0);

    
//     const onDocumentKeyDown = (event) => {
//         var keyCode = event.which;
//         if (keyCode == 32 && !event.Handled) {
//           crossFadeAction = animationActions[0]         
//           console.log("Space")          
//           event.Handled = true;
//         } 
//     };
//     document.addEventListener("keydown", onDocumentKeyDown, false);
        
//     // Load FBX Model
//     var robot;
//     var robotLoaded = false;
//     const loader = new FBXLoader();
//       loader.load( 'FBX/Kyle.fbx', ( object ) => {
//         object.scale.set(0.01, 0.01, 0.01)
//         object.position.set(1, -1, -0)
//         mixer = new THREE.AnimationMixer( object );
        
//         object.traverse( function ( child ) {

//             if ( child.isMesh ) {

//               child.castShadow = true;
//               child.receiveShadow = true;

//             } 
//           }
//         )        
//         loader.load('FBX/Animations/Running.fbx',
//             (object) => {
//                 console.log("loaded running")

//                 const animationAction = mixer.clipAction(object.animations[0]);
                
//                 animationActions.push(animationAction);              
                

//                 loader.load('FBX/Animations/Jump To Freehang.fbx',
//                   (object) => {
//                       console.log("loaded hanging jump")

//                       const animationAction = mixer.clipAction(object.animations[0]);                      
//                       animationActions.push(animationAction);                      

//                       loader.load('FBX/Animations/Idle.fbx', (object) => {
//                         console.log("loaded idle")
//                         const animationAction = mixer.clipAction(object.animations[0]);  
//                         idleAction = animationAction                     
//                         animationActions.push(animationAction);

//                         // animationAction.play()

//                         activeAction = animationAction;
//                         robotLoaded = true;
//                       })

//                   }
//                )
//             }
//         )  

//         robot = object;
//         scene.add( robot );

//       } );  

//     // Plane
//     var geometry = new THREE.PlaneGeometry( 100, 40, 10 );
//     var material = new THREE.MeshStandardMaterial( { color: "#ffffff", roughness : 0, metalness : 0  } );
//     var plane = new THREE.Mesh( geometry, material );
//     scene.add( plane );
//     plane.rotation.x = -Math.PI / 2;
//     plane.position.y = -1;
//     plane.receiveShadow = true;

//     // Lighting
//     var hemisphereLight = new THREE.HemisphereLight("#ffffff" ,"#ffffff", 0.6);
//     scene.add(hemisphereLight);

//     var directionalLight = new THREE.DirectionalLight("#ffffff", 1);
//     scene.add(directionalLight);
//     directionalLight.position.set(10, 10, 10);
//     directionalLight.castShadow =  true;

//     // Text
//     var textRotationAxis = new THREE.Mesh()
//     var geometry = new TextGeometry("P", this.state.textOptions);
//     var material = new THREE.MeshStandardMaterial( { color: 0xd3e4e2, roughness : 0, metalness : 0  } );
//     var text = new Mesh(geometry, material);
//     text.castShadow = true;
//     text.position.set(-0.5, -0.8, -0.1);
//     textRotationAxis.add(text);
//     scene.add(textRotationAxis);

//     // Scene
//     camera.position.z = 5;

    
//     // CrossFade
//     function prepareCrossFade( startAction, endAction, duration ) {        

//       // If the current action is 'idle' (duration 4 sec), execute the crossfade immediately;
//       // else wait until the current action has finished its current loop

//       if ( startAction === idleAction ) {
//         executeCrossFade( startAction, endAction, duration );
//       } else {
//         synchronizeCrossFade( startAction, endAction, duration );
//       }
//     }

//     function synchronizeCrossFade( startAction, endAction, duration ) {

//       mixer.addEventListener( 'loop', onLoopFinished );

//       function onLoopFinished( event ) {
//         if ( event.action === startAction ) {
//           console.log('START ACTION')
//           mixer.removeEventListener( 'loop', onLoopFinished );

//           executeCrossFade( startAction, endAction, duration );

//         }

//       }

//     }

//     function executeCrossFade( startAction, endAction, duration ) {
//       // Not only the start action, but also the end action must get a weight of 1 before fading
//       // (concerning the start action this is already guaranteed in this place)

//       setWeight( endAction, 1 );
//       endAction.time = 0;

//       // Crossfade with warping - you can also try without warping by setting the third parameter to false

//       startAction.crossFadeTo( endAction, duration, true ).play();

//     }

//     function setWeight( action, weight ) {

//       action.enabled = true;
//       action.setEffectiveTimeScale( 1 );
//       action.setEffectiveWeight( weight );

//     }

//     // Animation
//     const clock = new THREE.Clock()
//     var crossFading = false;
//     var animate =  () => {
//       requestAnimationFrame( animate );   
//       var delta = clock.getDelta()
//       textRotationAxis.rotation.y += 0.01;
      
//       if ( mixer ){
//         mixer.update( delta );
//         console.log(mixer)
//       } 
     
//       if ( crossFadeAction ){
//         console.log('Transition')
//         // prepareCrossFade(activeAction, crossFadeAction, 1)
//         // animationActions[2].crossFadeTo(animationActions[0], 1, true).play()
//         console.log(animationActions[2])
//         animationActions[2].play()
//         activeAction = crossFadeAction
//         crossFadeAction = null
//       }

//       // if (clock.getElapsedTime() > 20 && !crossFading){
//       //   // animationActions[2].crossFadeTo(animationActions[0], 1, true).play();
//       //   prepareCrossFade(animationActions[2], animationActions[0], 1)
//       //   crossFading = true;
//       //   console.log("Cross")
//       // }
//       // if ( robotLoaded ) {
//       //   robot.position.set( robot.position.x, robot.position.y, robot.position.z + delta * robotSpeed)
//       //   if (robot.position.z >= -6){
//       //     robot.position.set( robot.position.x, robot.position.y + delta * jumpSpeed/2, robot.position.z )
//       //     animationActions[1].play()
//       //   }
//       // }     

//       renderer.render( scene, camera );
//     };

//     animate();
//   }
//   render() {
//     return (
//       <div style={{ margin : 'auto', width : this.state.width, height : this.state.height , padding : 0 }}>
//         <div style={{ width : this.state.width, height : this.state.height, padding : 0}} ref={ref => (this.mount = ref)} />
//       </div>
//     )
//   }
// }
// const rootElement = document.getElementById("root");
// ReactDOM.render(<Render3D />, rootElement);

// export default Render3D;