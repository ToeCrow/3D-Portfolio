// components/Tesla.tsx
import { useRef } from 'react';
import { useLoader, useFrame } from '@react-three/fiber';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';
import * as THREE from 'three';

const Tesla = () => {
  const model = useLoader(GLTFLoader, '/models/tesla.glb'); // lägg filen i public/models/
  const ref = useRef<THREE.Group>(null);

  useFrame(({ clock }) => {
    if (ref.current) {
      ref.current.rotation.y = clock.getElapsedTime() * 1.5; // egen rotation
    }
  });

  return <primitive ref={ref} object={model.scene} scale={0.25} />;
};

export default Tesla;
