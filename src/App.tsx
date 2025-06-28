// src/App.tsx
import { useState } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, Stars } from '@react-three/drei';
import Universe from './components/Universe';
import CameraController from './components/CameraController';
import ProjectModal from './components/ProjectModal';

function App() {
  const [modalProject, setModalProject] = useState<any | null>(null);
  const [modalVisible, setModalVisible] = useState(false);

  const handlePlanetHover = (project: any) => {
    setModalProject(project);
    setModalVisible(true);
  };

  const handleModalClose = () => {
    setModalVisible(false);
    setModalProject(null);
  };

  return (
    <>
      <Canvas
        shadows
        camera={{ position: [0, 5, 20], fov: 60 }}
        style={{ width: '100vw', height: '100vh' }}
        gl={{ antialias: true }}
      >
        <ambientLight intensity={0.5} />
        <pointLight position={[5, 5, 5]} intensity={1.5} />
        <color attach="background" args={['black']} />
        <Stars />
        <CameraController />
        <Universe onPlanetHover={handlePlanetHover} />
        <OrbitControls />
      </Canvas>

      {modalProject && (
        <ProjectModal
          project={modalProject}
          visible={modalVisible}
          onClose={handleModalClose}
        />
      )}
    </>
  );
}

export default App;
