import { useFrame, useThree } from '@react-three/fiber';
import { useRef } from 'react';
import * as THREE from 'three';

const CameraController = () => {
  const { camera } = useThree();
  const angleRef = useRef(0);

  useFrame((_, delta) => {
    angleRef.current += delta * 0.02; // 0.1 = rotationshastighet

    const radius = 15; // avstånd från solen
    const x = Math.sin(angleRef.current) * radius;
    const z = Math.cos(angleRef.current) * radius;

    camera.position.set(x, 5, z); // höjd = 5 för lite diagonal vy
    camera.lookAt(0, 0, 0); // titta på solen
  });

  return null;
};

export default CameraController;
