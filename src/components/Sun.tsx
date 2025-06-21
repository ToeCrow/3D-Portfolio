import { useRef } from 'react';
import { useFrame, useLoader, useThree } from '@react-three/fiber';
import * as THREE from 'three';

const vertexShader = `
  varying vec2 vUv;
  void main() {
    vUv = uv;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position,1.0);
  }
`;

const fragmentShader = `
  varying vec2 vUv;
  uniform float time;

  float noise(vec2 p){
    return sin(p.x * 10.0 + time * 5.0) * sin(p.y * 10.0 + time * 5.0);
  }

  void main() {
    float n = noise(vUv * 3.0);
    vec3 color = vec3(1.0, 0.5, 0.0);
    float alpha = 0.4 + 0.3 * n;

    float dist = distance(vUv, vec2(0.5));
    alpha *= smoothstep(0.5, 0.4, dist);

    if (alpha < 0.05) discard;

    gl_FragColor = vec4(color, alpha);
  }
`;

const Sun = () => {
  const imageRef = useRef<THREE.Mesh>(null);
  const ringRef = useRef<THREE.Mesh>(null);
  const lightRef = useRef<THREE.PointLight>(null);
  const { camera } = useThree();

  const texture = useLoader(THREE.TextureLoader, '/models/sun.jpg');
  const shaderMaterialRef = useRef<THREE.ShaderMaterial>(null);

  useFrame(({ clock }) => {
    const t = clock.getElapsedTime();

    if (lightRef.current) {
      lightRef.current.intensity = 5 + Math.sin(t * 2) * 0.5;
    }

    if (imageRef.current) {
      imageRef.current.lookAt(camera.position);
    }

    if (ringRef.current) {
      ringRef.current.lookAt(camera.position);
    }

    if (shaderMaterialRef.current) {
      shaderMaterialRef.current.uniforms.time.value = t;
    }
  });

  return (
    <group>
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

      <ambientLight intensity={0.2} />

      <mesh ref={imageRef}>
        <circleGeometry args={[3.7, 64]} />
        <meshBasicMaterial
          map={texture}
          transparent
          opacity={1}
        />
      </mesh>

      <mesh ref={ringRef}>
        <ringGeometry args={[3.7, 4.2, 64]} />
        <shaderMaterial
          ref={shaderMaterialRef}
          vertexShader={vertexShader}
          fragmentShader={fragmentShader}
          transparent={true}
          uniforms={{ time: { value: 0 } }}
          depthWrite={false}
          blending={THREE.AdditiveBlending}
          side={THREE.DoubleSide}
        />
      </mesh>
    </group>
  );
};

export default Sun;
