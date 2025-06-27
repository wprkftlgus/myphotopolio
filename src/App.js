import { Canvas } from '@react-three/fiber';
import { DefaultLoadingManager } from 'three';

function Box(){
  return(
    <mesh>
      <boxGeometry args={[1 , 1, 1]}/>
      <meshStandardMaterial color={"orange"} />
    </mesh>
  );
}


function App() {
  return (
    <Canvas>
    <Box />  
    </Canvas>
  )
}

export default App; 