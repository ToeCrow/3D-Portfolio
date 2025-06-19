import { useFrame, useThree } from '@react-three/fiber';
import { useRef, useEffect } from 'react';

const MIN_RADIUS = 10;
const MAX_RADIUS = 30;

const CameraController = () => {
  const { camera, gl } = useThree();
  const angleRef = useRef(0);
  const radiusRef = useRef(24); // Startvärde för radius

  useEffect(() => {
    const handleWheel = (event: WheelEvent) => {
      event.preventDefault();
      // Ändra radius baserat på scrollhjulet
      // event.deltaY är positivt när man scrollar ner (zoomar ut) och negativt vid zoom in
      const zoomSpeed = 0.5; // justera hastighet på zoom
      radiusRef.current += event.deltaY * zoomSpeed * 0.01;

      // Begränsa till min och max radius
      radiusRef.current = Math.min(MAX_RADIUS, Math.max(MIN_RADIUS, radiusRef.current));
    };

    gl.domElement.addEventListener('wheel', handleWheel, { passive: false });

    return () => {
      gl.domElement.removeEventListener('wheel', handleWheel);
    };
  }, [gl.domElement]);

  useFrame((_, delta) => {
    angleRef.current += delta * -0.005; // justerat från 0.005 till 0.5 för bättre känsla

    const radius = radiusRef.current;
    const x = Math.sin(angleRef.current) * radius;
    const z = Math.cos(angleRef.current) * radius;

    camera.position.set(x, 5, z);
    camera.lookAt(0, 0, 0);
  });

  return null;
};

export default CameraController;
