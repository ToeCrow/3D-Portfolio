//src\App.tsx
import { Canvas } from '@react-three/fiber';
import { OrbitControls, Stars } from '@react-three/drei';
import Universe from './components/Universe';

function App() {
  return (
    <Canvas 
      camera={{ position: [0, 0, 10], fov: 75 }}
      style={{ width: '100vw', height: '100vh' }}
      gl={{ antialias: true }}>
      <ambientLight intensity={0.5} />
      <pointLight position={[0, 0, 0]} intensity={1.5} />
      <color attach="background" args={['black']} />
      <Stars />
      <Universe />
      <OrbitControls />
    </Canvas>
  );
}

export default App;
