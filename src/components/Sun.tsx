import { useRef } from 'react';
import { useFrame, useLoader, useThree } from '@react-three/fiber';
import * as THREE from 'three';

const Sun = () => {
  const glowRef = useRef<THREE.Mesh>(null);
  const imageRef = useRef<THREE.Mesh>(null);
  const lightRef = useRef<THREE.PointLight>(null);
  const texture = useLoader(THREE.TextureLoader, '/sun.jpg');
  const { camera } = useThree();

  useFrame(({ clock }) => {
    const t = clock.getElapsedTime();

    // Snurra och pulsera glöden
    if (glowRef.current?.material instanceof THREE.MeshBasicMaterial) {
      glowRef.current.rotation.y += 0.001;
      glowRef.current.material.opacity = 0.5 + Math.sin(t * 2) * 0.1;
    }

    // Pulserande solljus
    if (lightRef.current) {
      lightRef.current.intensity = 2.5 + Math.sin(t * 2) * 0.2;
    }

    // Billboard
    if (imageRef.current) {
      imageRef.current.lookAt(camera.position);
    }
  });

  return (
    <group>
      {/* Solljus som påverkar planeterna */}
      <pointLight
        ref={lightRef}
        position={[0, 0, 0]}
        intensity={2.5}
        distance={100}
        decay={2}
        color="#ffffcc"
      />

      {/* Lätt ambient ljus */}
      <ambientLight intensity={0.1} />

      {/* Glöd bakom bilden */}
      <mesh ref={glowRef}>
        <sphereGeometry args={[3.45, 64, 64]} />
        <meshBasicMaterial
          color="orange"
          transparent
          opacity={0.6}
          side={THREE.BackSide}
          depthWrite={false}
        />
      </mesh>

      {/* Solens yta som bild */}
      <mesh ref={imageRef}>
        <circleGeometry args={[3.5, 64]} />
        <meshBasicMaterial map={texture} transparent opacity={0.8} />
      </mesh>
    </group>
  );
};

export default Sun;
