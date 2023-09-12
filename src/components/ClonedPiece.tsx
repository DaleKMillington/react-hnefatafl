// Base Imports
import {useEffect, useState} from "react";
import ReactDOM from 'react-dom';

// Third Party Imports

// Application Imports

// Types
interface ClonePieceProps {
    piece: string;
    width: number;
    height: number;
    left: number;
    top: number;
}

const ClonedPiece = ({ piece, width, height, left, top }: ClonePieceProps) => {
  const [mousePosition, setMousePosition] = useState({ top: top, left: left });

  useEffect(() => {
    const handleMouseMove = (event: MouseEvent) => {
      const mouseX = event.clientX;
      const mouseY = event.clientY;
      setMousePosition({ top: mouseY, left: mouseX });
    };

    window.addEventListener('mousemove', handleMouseMove);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  // Setup classes for piece prop
  let pieceClasses = '';
  switch (piece) {
    case 'W':
      pieceClasses = 'cloned-piece cloned-piece--white';
      break;
    case 'B':
      pieceClasses = 'cloned-piece cloned-piece--black';
      break;
    case 'K':
      pieceClasses = 'cloned-piece cloned-piece--king';
      break;
  }

  // Render the component using React Portal
  return ReactDOM.createPortal(
    <div
      className={pieceClasses}
      style={{
        top: `${mousePosition.top}px`,
        left: `${mousePosition.left}px`,
        width: `${width}px`,
        height: `${height}px`
    }}
    ></div>,
    document.body
  );
};

export default ClonedPiece;