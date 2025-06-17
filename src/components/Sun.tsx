import { useLoader } from '@react-three/fiber';
import * as THREE from 'three';

const Sun = () => {
  const texture = useLoader(THREE.TextureLoader, '/your-image.jpg');

  return (
    <mesh>
      <sphereGeometry args={[2, 64, 64]} />
      <meshBasicMaterial map={texture} />
    </mesh>
  );
};

export default Sun;
