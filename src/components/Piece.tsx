// Base Imports
import { useState } from "react";

// Third Party Imports

// Application Imports
import ClonePiece from "./ClonePiece.tsx";

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

    return (
        <div className={pieceClasses} onClick={selectPiece}>

            {thisPieceSelected && <ClonePiece piece={piece} />}

        </div>
    )
}

export default Piece;