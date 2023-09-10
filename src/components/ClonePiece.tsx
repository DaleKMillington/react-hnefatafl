// Base Imports
import {useEffect, useState} from "react";

// Third Party Imports

// Application Imports

// Types
interface ClonePieceProps {
    piece: string;
}

const Piece = ({piece}: ClonePieceProps) => {

    // Setup classes for piece prop
    let pieceClasses = '';
    switch(piece){
        case 'W': pieceClasses = 'piece piece--white piece--clone'; break;
        case 'B': pieceClasses = 'piece piece--black piece--clone'; break;
        case 'K': pieceClasses = 'piece piece--king piece--clone';
    }

    const [
        mousePosition,
        setMousePosition
    ] = useState({ top: 0, left: 0 });

    useEffect(() => {
        const handleMouseMove = (event) => {
            const mouseX = event.clientX;
            const mouseY = event.clientY;
            setMousePosition({top: mouseY, left: mouseX});
        };

        window.addEventListener('mousemove', handleMouseMove);

        return () => {
            window.removeEventListener('mousemove', handleMouseMove);
        };
    }, []);

        // Deconstruct mouse positions
    const { top, left } = mousePosition;

    return (
        <div className={pieceClasses} style={{ top: `${top}px`, left: `${left}px` }}></div>
    )
}

export default Piece;