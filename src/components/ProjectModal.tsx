import { useEffect, useState } from 'react';
import './ProjectModal.css';

type Props = {
  project: {
    id: number;
    name: string;
    github_url?: string;
    images?: string[];  // bilder hämtade i parent via fetch
  };
  visible: boolean;
  onClose: () => void;
};

const ProjectModal = ({ project, visible, onClose }: Props) => {
  const [hovering, setHovering] = useState(false);
  const [fadeOut, setFadeOut] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);

  // När modal öppnas, starta från första bilden och återställ fadeOut
  useEffect(() => {
    if (visible) {
      setCurrentIndex(0);
      setFadeOut(false);
    }
  }, [visible]);

  // Auto-stäng modal efter 2s om inte hover
  useEffect(() => {
    if (!visible) return;

    const timer = setTimeout(() => {
      if (!hovering) {
        setFadeOut(true);
        setTimeout(onClose, 400);
      }
    }, 2000);

    return () => clearTimeout(timer);
  }, [visible, hovering, onClose]);

  if (!visible && !fadeOut) return null;

  const images = project.images || [];

  const prevImage = () => {
    setCurrentIndex((i) => (i === 0 ? images.length - 1 : i - 1));
  };

  const nextImage = () => {
    setCurrentIndex((i) => (i === images.length - 1 ? 0 : i + 1));
  };

  return (
    <div
      className={`project-modal ${fadeOut ? 'fade-out' : 'fade-in'}`}
      onMouseEnter={() => setHovering(true)}
      onMouseLeave={() => setHovering(false)}
    >
      <h2>{project.name}</h2>

      {images.length > 0 ? (
        <div className="image-viewer">
          <button className="nav-button prev" onClick={prevImage} aria-label="Previous image">
            ‹
          </button>

          <div className="image-container">
            <img
              src={images[currentIndex]}
              alt={`${project.name} image ${currentIndex + 1}`}
              className="project-image"
            />
          </div>

          <button className="nav-button next" onClick={nextImage} aria-label="Next image">
            ›
          </button>
          <div className="image-counter">
            {currentIndex + 1} / {images.length}
          </div>
        </div>
      ) : (
        <p>Inga bilder tillgängliga</p>
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
