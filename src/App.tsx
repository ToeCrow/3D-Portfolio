import { Canvas } from '@react-three/fiber';
import { OrbitControls, Stars } from '@react-three/drei';
import Universe from './components/Universe';

function App() {
  return (
    <Canvas camera={{ position: [0, 0, 10], fov: 75 }}>
      <ambientLight intensity={0.5} />
      <pointLight position={[0, 0, 0]} intensity={1.5} />
      <Stars />
      <Universe />
      <OrbitControls />
    </Canvas>
  );
}

export default App;
