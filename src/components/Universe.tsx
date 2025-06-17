import { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import Sun from './Sun';
import Planet from './Planet';
import { Group } from 'three';

const Universe = () => {
  const planetGroup = useRef<Group>(null);

  useFrame(() => {
    if (planetGroup.current) {
      planetGroup.current.rotation.y += 0.01;
    }
  });

  return (
    <>
      <Sun />
      <group ref={planetGroup}>
        <Planet color="orange" position={[5, 0, 0]} />
      </group>
    </>
  );
};

export default Universe;
