import {
  forwardRef,
  useRef,
  useMemo,
  useImperativeHandle,
  useState,
  useEffect,
} from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

type PlanetProps = {
  name: string;
  color: string;
  index: number;
  orbitalPeriodDays: number;
  radiuskm: number;
  github_url?: string;
  mapUrl?: string;
  moons?: number;
  onHover?: (projectData: any) => void; // 👈 Ny prop
};

const Planet = forwardRef<THREE.Group, PlanetProps>(
  ({ name, color, index, orbitalPeriodDays, radiuskm, github_url, mapUrl, moons = 0, onHover }, ref) => {
    const groupRef = useRef<THREE.Group>(null);
    const meshRef = useRef<THREE.Mesh>(null);
    const moonRefs = useRef<THREE.Mesh[]>([]);

    useImperativeHandle(ref, () => groupRef.current!, []);

    const earthRadiusKm = 6371;
    const earthSize = 1.15;
    const maxSize = 1.6;
    const minSize = 0.3;
    let size = (radiuskm / earthRadiusKm) * earthSize;
    if (size > maxSize) size = maxSize;
    if (size < minSize) size = minSize;

    const radius = 6 + index * (maxSize * 2.5);
    const baseDays = 365;
    const baseDuration = 20;
    const speed = (2 * Math.PI) / baseDuration * (baseDays / orbitalPeriodDays);

    const [baseTexture, setBaseTexture] = useState<THREE.Texture | null>(null);

    useEffect(() => {
      if (!mapUrl) {
        setBaseTexture(null);
        return;
      }
      const loader = new THREE.TextureLoader();
      loader.load(
        mapUrl,
        (texture) => setBaseTexture(texture),
        undefined,
        (err) => {
          console.error('Failed to load texture:', err);
          setBaseTexture(null);
        }
      );
    }, [mapUrl]);

    const combinedTexture = useMemo(() => {
      const canvas = document.createElement('canvas');
      canvas.width = 512;
      canvas.height = 512;
      const ctx = canvas.getContext('2d')!;

      if (baseTexture?.image) {
        ctx.drawImage(baseTexture.image, 0, 0, canvas.width, canvas.height);
      } else {
        ctx.fillStyle = color;
        ctx.fillRect(0, 0, canvas.width, canvas.height);
      }

      ctx.shadowColor = 'rgba(0, 0, 0, 0.9)';
      ctx.shadowBlur = 8;
      ctx.shadowOffsetX = 2;
      ctx.shadowOffsetY = 2;

      ctx.fillStyle = 'white';
      ctx.font = 'bold 48px Arial';
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      ctx.fillText(name, canvas.width / 2, canvas.height / 2);

      const tex = new THREE.CanvasTexture(canvas);
      tex.wrapS = THREE.RepeatWrapping;
      tex.wrapT = THREE.RepeatWrapping;
      tex.repeat.set(2, 1);
      tex.anisotropy = 16;

      return tex;
    }, [baseTexture, color, name]);

    const baseMoonSize = size * 0.15;
    const moonSize = moons > 2 ? baseMoonSize * 0.1 : baseMoonSize;

    const moonTexture = useMemo(() => {
      if (moons <= 2) {
        return new THREE.TextureLoader().load('/models/moonmap4k.jpg');
      }
      return null;
    }, [moons]);

    const moonData = useMemo(() => {
      const bands = 3;
      const bandRadii = Array.from({ length: bands }, (_, b) => size + 0.8 + b * (moonSize * 1.5));

      return Array.from({ length: moons }).map((_, i) => ({
        speed: 0.3 + Math.random() * 0.2,
        height: (Math.random() - 0.5) * 0.8,
        radius: bandRadii[Math.floor(Math.random() * bands)],
        angleOffset: (i / moons) * Math.PI * 2,
      }));
    }, [moons, size, moonSize]);

    useFrame(({ clock }) => {
      const t = clock.getElapsedTime();
      const angle = -t * speed;

      const x = Math.cos(angle + index) * radius;
      const z = Math.sin(angle + index) * radius;

      if (groupRef.current) {
        groupRef.current.position.set(x, 0, z);
        groupRef.current.rotation.y = angle;
      }

      if (meshRef.current) {
        meshRef.current.rotation.y = t * -0.2;
      }

      moonData.forEach(({ speed, height, radius, angleOffset }, i) => {
        const moonAngle = angleOffset + t * speed;
        const mx = Math.cos(moonAngle) * radius;
        const mz = Math.sin(moonAngle) * radius;
        const moon = moonRefs.current[i];
        if (moon) moon.position.set(mx, height, mz);
      });
    });

    const handleClick = () => {
      if (github_url) window.open(github_url, '_blank');
    };

    return (
      <group
        ref={groupRef}
        onClick={handleClick}
        onPointerOver={() => {
          document.body.style.cursor = 'pointer';
          if (onHover) {
            onHover({ name, github_url, map_url: mapUrl });
          }
        }}
        onPointerOut={() => {
          document.body.style.cursor = 'auto';
        }}
      >
        <mesh ref={meshRef} castShadow receiveShadow>
          <sphereGeometry args={[size, 64, 64]} />
          <meshStandardMaterial map={combinedTexture} />
        </mesh>

        {moonData.map((_, i) => (
          <mesh
            key={i}
            ref={(el) => (moonRefs.current[i] = el!)}
            castShadow
            receiveShadow
          >
            <sphereGeometry args={[moonSize, 32, 32]} />
            <meshStandardMaterial
              color={moons <= 2 ? undefined : 'lightgray'}
              map={moons <= 2 ? moonTexture : undefined}
            />
          </mesh>
        ))}
      </group>
    );
  }
);

export default Planet;
