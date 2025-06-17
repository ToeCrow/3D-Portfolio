// src\components\Planet.tsx
type PlanetProps = {
  color?: string;
  position?: [number, number, number];
};

const Planet = ({ color = 'skyblue', position = [5, 0, 0] }: PlanetProps) => {
  return (
    <mesh position={position}>
      <sphereGeometry args={[0.5, 32, 32]} />
      <meshStandardMaterial color={color} />
    </mesh>
  );
};

export default Planet;
