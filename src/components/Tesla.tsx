import { useRef, useEffect } from 'react';
import { useLoader, useFrame } from '@react-three/fiber';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';
import * as THREE from 'three';

const Tesla = () => {
  const model = useLoader(GLTFLoader, '/models/tesla.glb');
  const ref = useRef<THREE.Group>(null);

  useFrame(({ clock }) => {
    if (ref.current) {
      ref.current.rotation.y = clock.getElapsedTime() * 1.5;
    }
  });

  useEffect(() => {
    const scene = model.scene;

    // Försök hitta bilen (första barn med mesh)
    const mesh = scene.getObjectByProperty('type', 'Mesh');
    if (mesh) {
      // Centrera modellen så att den snurrar runt sin egen mitt
      const box = new THREE.Box3().setFromObject(mesh);
      const center = new THREE.Vector3();
      box.getCenter(center);
      mesh.position.sub(center); // flytta själva bilen till origo
    }
  }, [model]);

  return (
    <primitive
      ref={ref}
      object={model.scene}
      scale={10} // börja med 10 — justera sen
      castShadow
      receiveShadow
    />
  );
};

export default Tesla;
