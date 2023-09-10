// Base Imports

// Third Party Imports

// Application Imports

// Types
interface PieceProps {
    piece: string;
    pieceSelected: boolean;
    updateBoardState: (state: string[][]) => void;
    togglePieceSelected: (state: boolean) => void;
}

const Piece = ({piece, pieceSelected, updateBoardState, togglePieceSelected}: PieceProps) => {

    let pieceClasses = '';
    switch(piece){
        case 'W': pieceClasses = 'piece piece--white'; break;
        case 'B': pieceClasses = 'piece piece--black'; break;
        case 'K': pieceClasses = 'piece piece--king';
    }

    pieceClasses = pieceSelected ? pieceClasses : pieceClasses += ' piece--selectable';

    return (
        <div className={pieceClasses}></div>
    )
}

export default Piece;