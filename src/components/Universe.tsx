import { useEffect, useState, useRef, Suspense } from 'react';
import Sun from './Sun';
import Planet from './Planet';
import TeslaOrbit from './TeslaOrbit';
import * as THREE from 'three';

type Project = {
  id: number;
  name: string;
  color: string;
  orbital_period_days: number;
  radiuskm: number;
  github_url: string;
  map_url: string;
};

const Universe = () => {
  const [projects, setProjects] = useState<Project[]>([]);
  const thirdPlanetRef = useRef<THREE.Group>(null);

  useEffect(() => {
    fetch('http://localhost:4000/api/projects') // du har din API på port 4000
      .then(res => res.json())
      .then(data => setProjects(data))
      .catch(err => console.error('Failed to load projects', err));
  }, []);

  return (
    <>
      <Sun />
      {projects.map((project, idx) => (
        <Planet
          key={project.id}
          ref={idx === 2 ? thirdPlanetRef : null}
          name={project.name}
          color={project.color}
          index={idx}
          orbitalPeriodDays={project.orbital_period_days}
          radiuskm={project.radiuskm}
          github_url={project.github_url}
          mapUrl={project.map_url}
        />
      ))}

      {/* Tesla ska bara renderas efter att planeten är laddad */}
      <Suspense fallback={null}>
        {thirdPlanetRef.current && (
          <TeslaOrbit centerRef={thirdPlanetRef} />
        )}
      </Suspense>
    </>
  );
};

export default Universe;
