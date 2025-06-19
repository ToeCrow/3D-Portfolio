import { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import { Text } from '@react-three/drei';

type PlanetProps = {
  name: string;
  color: string;
  index: number;
  total: number;
};

const Planet = ({ name, color, index, total }: PlanetProps) => {
  const groupRef = useRef<THREE.Group>(null);
  const size = 0.5 + name.length * 0.05; // storlek baserat på namn
  const radius = 5 + index * 2.5; // olika avstånd
  const duration = 20; // alla varv = 20s

  const speed = (2 * Math.PI) / duration;

  useFrame(({ clock }) => {
    const t = clock.getElapsedTime();
    const angle = t * speed;
    const x = Math.cos(angle + index) * radius;
    const z = Math.sin(angle + index) * radius;

    if (groupRef.current) {
      groupRef.current.position.set(x, 0, z);
      groupRef.current.rotation.y = -angle - index;
    }
  });

  return (
    <group ref={groupRef}>
      <mesh>
        <sphereGeometry args={[size, 32, 32]} />
        <meshStandardMaterial color={color} />
      </mesh>
      <Text
        fontSize={0.25}
        position={[0, size + 0.3, 0]}
        rotation={[-Math.PI / 2, 0, 0]}
        anchorX="center"
        anchorY="middle"
      >
        {name}
      </Text>
    </group>
  );
};

export default Planet;
