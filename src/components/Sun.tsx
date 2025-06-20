import { useRef } from 'react';
import { useFrame, useLoader, useThree } from '@react-three/fiber';
import * as THREE from 'three';

const Sun = () => {
  const glowRef = useRef<THREE.Mesh>(null);
  const imageRef = useRef<THREE.Mesh>(null);
  const lightRef = useRef<THREE.PointLight>(null);
  const texture = useLoader(THREE.TextureLoader, '/models/sun.jpg'); // se till att du har rätt path
  const { camera } = useThree();

  useFrame(({ clock }) => {
    const t = clock.getElapsedTime();

    // Glödens puls och rotation
    if (glowRef.current?.material instanceof THREE.MeshBasicMaterial) {
      glowRef.current.rotation.y += 0.001;
      glowRef.current.material.opacity = 0.5 + Math.sin(t * 3) * 0.1;
    }

    // Ljusintensitet pulserar som solen
    if (lightRef.current) {
      lightRef.current.intensity = 5 + Math.sin(t * 2) * 0.5;
    }

    // Billboard-effekt: solens yta alltid mot kameran
    if (imageRef.current) {
      imageRef.current.lookAt(camera.position);
    }
  });

  return (
    <group>
      {/* Solljus: påverkar alla material i scenen */}
      <pointLight
        ref={lightRef}
        position={[0, 0, 0]}
        intensity={20}
        distance={200}
        decay={2}
        color="#ffffee"
        castShadow
        shadow-mapSize-width={1024}
        shadow-mapSize-height={1024}
        shadow-bias={-0.001}

      />

      {/* Svagt ambient ljus – bara så att skuggor inte blir helt svarta */}
      <ambientLight intensity={0.2} />

      {/* Glöd bakom solen */}
      <mesh ref={glowRef}>
        <sphereGeometry args={[3.5, 64, 64]} />
        <meshBasicMaterial
          color="orange"
          transparent
          opacity={0.5}
          side={THREE.BackSide}
          depthWrite={false}
        />
      </mesh>

      {/* Själva solytan som bild mot kameran */}
      <mesh ref={imageRef}>
        <circleGeometry args={[3.5, 64]} />
        <meshBasicMaterial
          map={texture}
          transparent
          opacity={1}
        />
      </mesh>
    </group>
  );
};

export default Sun;
