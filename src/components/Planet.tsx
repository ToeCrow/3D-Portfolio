import { useRef } from 'react';
import { useFrame, useThree } from '@react-three/fiber';
import * as THREE from 'three';
import { Text } from '@react-three/drei';

type PlanetProps = {
  name: string;
  color: string;
  index: number;
  orbitalPeriodDays: number;
  radiuskm: number;
};

const Planet = ({ name, color, index, orbitalPeriodDays, radiuskm }: PlanetProps) => {
  const groupRef = useRef<THREE.Group>(null);
  const textRef = useRef<THREE.Mesh>(null);
  const { camera } = useThree();

  const earthRadiusKm = 6371;
  const earthSize = 1.15; // Jordens storlek i din skala
  const maxSize = 2; // Maxstorlek för en planet i din skala

  // Proportionell skala baserad på planetens verkliga radie jämfört med jorden
  let size = (radiuskm / earthRadiusKm) * earthSize;

  // Begränsa storleken till maxSize
  if (size > maxSize) size = maxSize;

  // Minsta storlek så den syns lite bättre (valfritt)
  const minSize = 0.3;
  if (size < minSize) size = minSize;

  // Avstånd från solen, justerat för index så att planeter lägger sig i rad
  const radius = 5 + index * 2.5;

  // Orbital hastighet baserat på orbital_period_days
  const baseDays = 365;
  const baseDuration = 15; // sekunder för jorden
  const speed = (2 * Math.PI) / baseDuration * (baseDays / orbitalPeriodDays);

  useFrame(({ clock }) => {
    const t = clock.getElapsedTime();
    const angle = -t * speed; // Motsols

    const x = Math.cos(angle + index) * radius;
    const z = Math.sin(angle + index) * radius;

    if (groupRef.current) {
      groupRef.current.position.set(x, 0, z);
      groupRef.current.rotation.y = angle;
    }

    if (textRef.current) {
      textRef.current.lookAt(camera.position);
    }
  });

  return (
    <group ref={groupRef}>
      <mesh>
        <sphereGeometry args={[size, 32, 32]} />
        <meshStandardMaterial color={color} />
      </mesh>
      <Text
        ref={textRef}
        fontSize={0.25}
        position={[0, size + 0.3, 0]}
        anchorX="center"
        anchorY="middle"
      >
        {name}
      </Text>
    </group>
  );
};

export default Planet;
