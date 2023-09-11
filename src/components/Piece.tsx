// Base Imports
import { useState, useEffect, useRef } from "react";

// Third Party Imports

// Application Imports
import ClonedPiece from "./ClonedPiece.tsx";

// Types
interface PieceProps {
    piece: string;
    pieceSelected: boolean;
    updateBoardState: (state: string[][]) => void;
    togglePieceSelected: (state: boolean) => void;
}

const Piece = ({piece, pieceSelected, updateBoardState, togglePieceSelected}: PieceProps) => {

    // Setup classes for piece prop
    let pieceClasses = '';
    switch(piece){
        case 'W': pieceClasses = 'piece piece--white'; break;
        case 'B': pieceClasses = 'piece piece--black'; break;
        case 'K': pieceClasses = 'piece piece--king';
    }
    pieceClasses = pieceSelected ? pieceClasses : pieceClasses += ' piece--selectable';

    const [thisPieceSelected, setThisPieceSelected] = useState(false);

    // Onclick handler for pieces
    const selectPiece = () => {
        console.log('Piece selected: ', piece);
        togglePieceSelected(pieceSelected);
        setThisPieceSelected(true);
    }

    const [pieceWidth, setPieceWidth] = useState(0);
    const [pieceHeight, setPieceHeight] = useState(0);

    const pieceRef = useRef<HTMLDivElement | null>(null);

    useEffect(() => {
        const updatePieceSize = () => {
            if (pieceRef.current) {
                const { width, height } = pieceRef.current.getBoundingClientRect();
                setPieceWidth(width);
                setPieceHeight(height);
            }
        };

        // Initial size calculation
        updatePieceSize();

        // Listen for window resize events to update size
        window.addEventListener('resize', updatePieceSize);

        // Clean up event listener
        return () => window.removeEventListener('resize', updatePieceSize);
    }, []);


    return (
        <div className={pieceClasses} onClick={selectPiece} ref={pieceRef}>

            {thisPieceSelected && <ClonedPiece piece={piece} width={pieceWidth} height={pieceHeight} />}

        </div>
    )
}

export default Piece;