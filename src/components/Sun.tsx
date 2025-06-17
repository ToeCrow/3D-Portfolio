//src\components\Sun.tsx
import { useRef } from 'react';
import { useFrame, useLoader } from '@react-three/fiber';
import * as THREE from 'three';

const Sun = () => {
  const texture = useLoader(THREE.TextureLoader, '/your-image.jpg'); // soltextur
  const meshRef = useRef<THREE.Mesh>(null);
  const glowRef = useRef<THREE.Mesh>(null);

  useFrame(() => {
    // Solens egen rotation
    if (meshRef.current) {
      meshRef.current.rotation.y += 0.01;
    }

    // Glow-pulsering
    if (glowRef.current) {
      const scale = 3 + Math.sin(Date.now() * 0.002) * 0.2;
      glowRef.current.scale.set(scale, scale, scale);
    }
  });

  return (
    <group>
      {/* Solkropp */}
      <mesh ref={meshRef}>
        <sphereGeometry args={[2, 64, 64]} />
        <meshBasicMaterial map={texture} />
      </mesh>

      {/* Glow runt solen
      <mesh ref={glowRef}>
        <sphereGeometry args={[2.2, 64, 64]} />
        <meshBasicMaterial color="orange" transparent opacity={0.3} />
      </mesh> */}
    </group>
  );
};

export default Sun;

