import { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

type PlanetProps = {
  name: string;
  color: string;
  index: number;
  orbitalPeriodDays: number;
  radiuskm: number;
};

const Planet = ({ name, color, index, orbitalPeriodDays, radiuskm }: PlanetProps) => {
  const groupRef = useRef<THREE.Group>(null);
  const meshRef = useRef<THREE.Mesh>(null);

  const earthRadiusKm = 6371;
  const earthSize = 1.15;
  const maxSize = 2;
  const minSize = 0.3;
  let size = (radiuskm / earthRadiusKm) * earthSize;
  if (size > maxSize) size = maxSize;
  if (size < minSize) size = minSize;

  const radius = 5 + index * 2.5;

  const baseDays = 365;
  const baseDuration = 15;
  const speed = (2 * Math.PI) / baseDuration * (baseDays / orbitalPeriodDays);

  // Skapa textur med namn inbäddat
  const texture = useMemo(() => {
    const canvas = document.createElement('canvas');
    canvas.width = 512;
    canvas.height = 256;
    const ctx = canvas.getContext('2d')!;
    ctx.fillStyle = color;
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    ctx.fillStyle = 'white';
    ctx.font = 'bold 42px Arial';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillText(name, canvas.width / 2, canvas.height / 2);

    const tex = new THREE.CanvasTexture(canvas);
    tex.wrapS = THREE.RepeatWrapping;
    tex.wrapT = THREE.RepeatWrapping;
    tex.repeat.set(2, 1); // duplicera texten runt planeten
    return tex;
  }, [name, color]);

  // Snurra planeten runt solen + egen rotation
  useFrame(({ clock }) => {
    const t = clock.getElapsedTime();
    const angle = -t * speed;

    const x = Math.cos(angle + index) * radius;
    const z = Math.sin(angle + index) * radius;

    if (groupRef.current) {
      groupRef.current.position.set(x, 0, z);
      groupRef.current.rotation.y = angle; // för orbital rörelse
    }

    if (meshRef.current) {
      meshRef.current.rotation.y = t * 0.2; // planetens egen snurr
    }
  });

  return (
    <group ref={groupRef}>
      <mesh ref={meshRef}>
        <sphereGeometry args={[size, 64, 64]} />
        <meshStandardMaterial map={texture} />
      </mesh>
    </group>
  );
};

export default Planet;
