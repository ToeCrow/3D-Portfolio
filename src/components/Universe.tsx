import { useEffect, useState } from 'react';
import Sun from './Sun';
import Planet from './Planet';

type Project = {
  id: number;
  name: string;
  color: string;
  orbital_period_days: number;
  radiuskm: number; 
};

const Universe = () => {
  const [projects, setProjects] = useState<Project[]>([]);

  useEffect(() => {
    fetch('/api/projects')
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
          name={project.name}
          color={project.color}
          index={idx}
          orbitalPeriodDays={project.orbital_period_days}
          radiuskm={project.radiuskm} 
        />
      ))}
    </>
  );
};

export default Universe;
