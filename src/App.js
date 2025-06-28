import React, { Suspense, useRef, useState} from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { OrbitControls, useGLTF } from '@react-three/drei';
import { DirectionalLight } from '@react-three/drei';
import { Vector3 } from 'three';
import * as Three from 'three';

function Ball(){
  const gltf = useGLTF('/ball.glb');
  const ref = useRef();
  const velocity = useRef(new Three.Vector3(0, 0, 0));
  const position = useRef(new Three.Vector3(0, 0, 0));
  const { mouse } = useThree();
  
  const raycaster = useRef(new Three.Raycaster());

  useFrame(() => {
    if (!ref.current) return;

    const mouse3D = new Three.Vector3(mouse.x , mouse.y , ref.current.position.z);
    const distance = position.current.distanceTo(mouse3D);
    const gravity = new Three.Vector3(0, -0.01, 0);
    const intersects = raycaster.current.intersectObject(ref.current, true);

    if (intersects.length > 0) {
      const away = position.current.clone().sub(mouse3D).normalize();
      velocity.current.add(away);
    }

    velocity.current.multiplyScalar(0.95);
    velocity.current.add(gravity);

    
    position.current.add(velocity.current);
    ref.current.position.copy(position.current);
    
    if (position.current.x > limitX) {
    position.current.x = limitX;
    velocity.current.x = -Math.abs(velocity.current.x);
  } else if (position.current.x < -limitX) {
    position.current.x = -limitX;
    velocity.current.x = Math.abs(velocity.current.x);
  }

  if (position.current.y > limitY) {
    position.current.y = limitY;
    velocity.current.y = -Math.abs(velocity.current.y);
  } else if (position.current.y < -limitY) {
    position.current.y = -limitY;
    velocity.current.y = Math.abs(velocity.current.y);
  }
  })
  return(
    <primitive ref={ref} object={gltf.scene} scale={1} />
  )
}

function App(){
  return(
    <Canvas style={{width: '100vw', height: '100vh'}} >
      <ambientLight intensity={1} />
      <directionalLight position={[1, 1, 1]} intensity={15} />
      <Ball />
    </Canvas>
    
  );
} 

export default App;