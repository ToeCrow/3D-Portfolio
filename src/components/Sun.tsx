import { useRef } from 'react';
import { useFrame, useLoader, useThree } from '@react-three/fiber';
import * as THREE from 'three';

const Sun = () => {
  const glowRef = useRef<THREE.Mesh>(null);
  const imageRef = useRef<THREE.Mesh>(null);
  const texture = useLoader(THREE.TextureLoader, '/your-image.jpg');
  const { camera } = useThree();

  useFrame(() => {
    // Snurra glow som tidigare
    if (glowRef.current) glowRef.current.rotation.y += 0.01;

    // Gör att bilden alltid pekar mot kameran (billboarding)
    if (imageRef.current) {
      // Vänd mesh mot kameran
      imageRef.current.lookAt(camera.position);
    }
  });

  return (
    <group>
      <mesh ref={imageRef}>
        <circleGeometry args={[2.5, 64]} />
        <meshBasicMaterial map={texture} transparent />
      </mesh>

      <mesh ref={glowRef}>
        <sphereGeometry args={[2.5, 64, 64]} />
        <meshBasicMaterial color="orange" transparent opacity={0.4} />
      </mesh>
    </group>
  );
};

export default Sun;
