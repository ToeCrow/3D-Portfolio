// components/TeslaOrbit.tsx
import { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import Tesla from './Tesla';

type Props = {
  centerRef: React.RefObject<THREE.Group | null>; // Tillåt null
  distance?: number;
  speed?: number;
};


const TeslaOrbit = ({ centerRef, distance = 2, speed = 0.5 }: Props) => {
  const orbitRef = useRef<THREE.Group>(null);

  useFrame(({ clock }) => {
    if (centerRef.current && orbitRef.current) {
      const t = clock.getElapsedTime();
      const angle = t * speed;
      const x = Math.cos(angle) * distance;
      const z = Math.sin(angle) * distance;
      orbitRef.current.position.set(
        centerRef.current.position.x + x,
        0,
        centerRef.current.position.z + z
      );
    }
  });

  return (
    <group ref={orbitRef}>
      <Tesla />
    </group>
  );
};

export default TeslaOrbit;
