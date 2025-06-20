//src\App.tsx
import { Canvas } from '@react-three/fiber';
import { OrbitControls, Stars } from '@react-three/drei';
import Universe from './components/Universe';
import CameraController from './components/CameraController';

function App() {
  return (
    <Canvas 
      shadows
      camera={{ position: [0, 0, 15], fov: 60 }}
      style={{ width: '100vw', height: '100vh' }}
      gl={{ antialias: true }}>
      <ambientLight intensity={0.2} />
      <pointLight position={[0, 0, 0]} intensity={1.5} />
      <color attach="background" args={['black']} />
      <Stars />
      <CameraController />
      <Universe />
      <OrbitControls />
    </Canvas>
  );
}

export default App;
