import { useRef, useEffect } from 'react';
import { useFrame, useLoader } from '@react-three/fiber';
import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';

type MoonProps = {
  parentRef: React.RefObject<THREE.Group> | null;
  radius: number; // orbital radius runt planeten
  size?: number;  // storlek på månen
  speed?: number; // rotationshastighet (radians/s)
  blink?: boolean;
  name: string;
  model?: string;
  phase?: number; // fasförskjutning i radianer
};

const Moon = ({
  parentRef,
  radius,
  size = 1,
  speed = 1,
  blink,
  model,
  phase = 0,
}: MoonProps) => {
  const moonGroup = useRef<THREE.Group>(null);
  const moonMesh = useRef<THREE.Mesh>(null);

  const gltf = model ? useLoader(GLTFLoader, model) : null;

  const blinkMaterial = useRef(
    new THREE.MeshStandardMaterial({
      color: 'white',
      emissive: new THREE.Color('white'),
      emissiveIntensity: blink ? 1.0 : 0.1,
    })
  );

  useFrame(({ clock }) => {
    const t = clock.getElapsedTime();
    const angle = t * speed + phase;

    if (parentRef?.current && moonGroup.current) {
      const x = Math.cos(angle) * radius;
      const z = Math.sin(angle) * radius;
      const parentPos = parentRef.current.position;

      moonGroup.current.position.set(
        parentPos.x + x,
        parentPos.y,
        parentPos.z + z
      );
    }

    if (blink && moonMesh.current?.material instanceof THREE.MeshStandardMaterial) {
      moonMesh.current.material.emissiveIntensity = 0.5 + Math.sin(t * 10) * 0.5;
    }
  });

  useEffect(() => {
    if (gltf && gltf.scene) {
      const box = new THREE.Box3().setFromObject(gltf.scene);
      const sizeBox = box.getSize(new THREE.Vector3());
      const center = box.getCenter(new THREE.Vector3());

      const maxSize = Math.max(sizeBox.x, sizeBox.y, sizeBox.z);
      const desiredMaxSize = size ?? 1;
      const originalScale = gltf.scene.scale.x;
      const scaleFactor = (desiredMaxSize / maxSize) * originalScale;

      gltf.scene.scale.set(scaleFactor, scaleFactor, scaleFactor);
      gltf.scene.position.set(-center.x, -center.y, -center.z);
    }
  }, [gltf, size]);

  return (
    <group ref={moonGroup}>
      {gltf ? (
        <primitive object={gltf.scene} />
      ) : (
        <mesh ref={moonMesh} castShadow receiveShadow material={blinkMaterial.current}>
          <sphereGeometry args={[0.15 * size, 32, 32]} />
        </mesh>
      )}
    </group>
  );
};

export default Moon;
