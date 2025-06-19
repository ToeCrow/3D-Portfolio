import { forwardRef, useRef, useMemo, useImperativeHandle } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

type PlanetProps = {
  name: string;
  color: string;
  index: number;
  orbitalPeriodDays: number;
  radiuskm: number;
};

const Planet = forwardRef<THREE.Group, PlanetProps>(({ name, color, index, orbitalPeriodDays, radiuskm }, ref) => {
  const groupRef = useRef<THREE.Group>(null);
  const meshRef = useRef<THREE.Mesh>(null);

  useImperativeHandle(ref, () => groupRef.current!, []);

  const earthRadiusKm = 6371;
  const earthSize = 1.15;
  const maxSize = 1.6;
  const minSize = 0.3;
  let size = (radiuskm / earthRadiusKm) * earthSize;
  if (size > maxSize) size = maxSize;
  if (size < minSize) size = minSize;

  const radius = 6 + index * (maxSize * 2.5);

  const baseDays = 365;
  const baseDuration = 20;
  const speed = (2 * Math.PI) / baseDuration * (baseDays / orbitalPeriodDays);

  // Skapa textur med namn inbäddat
  const texture = useMemo(() => {
    const canvas = document.createElement('canvas');
    canvas.width = 512;
    canvas.height = 512;
    const ctx = canvas.getContext('2d')!;

    // Måla hela bakgrunden med planetens färg
    ctx.fillStyle = color;
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // Skapa skugga för texten så den syns bättre
    ctx.shadowColor = 'rgba(0, 0, 0, 0.9)';
    ctx.shadowBlur = 8;
    ctx.shadowOffsetX = 2;
    ctx.shadowOffsetY = 2;

    // Textinställningar
    ctx.fillStyle = 'white';
    ctx.font = 'bold 48px Arial';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';

    // Skriv texten mitt på planetens textur
    ctx.fillText(name, canvas.width / 2, canvas.height / 2);

    // Skapa Three.js textur
    const tex = new THREE.CanvasTexture(canvas);
    tex.wrapS = THREE.RepeatWrapping;
    tex.wrapT = THREE.RepeatWrapping;
    tex.repeat.set(2, 1); // duplicera texten runt planeten
    tex.anisotropy = 16;

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
      meshRef.current.rotation.y = t * -0.2; // planetens egen snurr
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
});

export default Planet;
