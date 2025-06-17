import { useRef } from 'react';
import { useFrame, useLoader } from '@react-three/fiber';
import * as THREE from 'three';

const Sun = () => {
  const glowRef = useRef<THREE.Mesh>(null);
  const texture = useLoader(THREE.TextureLoader, '/your-image.jpg');

  useFrame(() => {
    // Snurra bara glow om du vill
    if (glowRef.current) glowRef.current.rotation.y += 0.01;
  });

  return (
    <group>
      {/* Rund platt bild (istället för planeGeometry) */}
      <mesh>
        <circleGeometry args={[2.5, 64]} /> {/* radius = 2.5 → diameter = 5 */}
        <meshBasicMaterial map={texture} transparent />
      </mesh>

      {/* Eventuell snurrande glow ovanpå */}
      <mesh ref={glowRef}>
        <sphereGeometry args={[2.5, 64, 64]} />
        <meshBasicMaterial color="orange" transparent opacity={0.4} />
      </mesh>
    </group>
  );
};

export default Sun;
