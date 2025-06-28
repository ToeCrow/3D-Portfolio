// src/components/ProjectModal.tsx
import { useEffect, useState } from 'react';
import './ProjectModal.css';

type Props = {
  project: {
    name: string;
    github_url?: string;
    map_url?: string;
  };
  visible: boolean;
  onClose: () => void;
};

const ProjectModal = ({ project, visible, onClose }: Props) => {
  const [hovering, setHovering] = useState(false);
  const [fadeOut, setFadeOut] = useState(false);

  useEffect(() => {
    if (!visible) return;

    const timer = setTimeout(() => {
      if (!hovering) {
        setFadeOut(true);
        setTimeout(onClose, 400); // match animation duration
      }
    }, 15000);

    return () => clearTimeout(timer);
  }, [visible, hovering, onClose]);

  if (!visible && !fadeOut) return null;

  return (
    <div
      className={`project-modal ${fadeOut ? 'fade-out' : 'fade-in'}`}
      onMouseEnter={() => setHovering(true)}
      onMouseLeave={() => setHovering(false)}
    >
      <h2>{project.name}</h2>
      {project.map_url && (
        <img src={project.map_url} alt={project.name} />
      )}
      {project.github_url && (
        <a href={project.github_url} target="_blank" rel="noopener noreferrer">
          View on GitHub
        </a>
      )}
    </div>
  );
};

export default ProjectModal;
