// Base Imports

// Third Party Imports

// Application Imports

// Types
interface PieceProps {
    piece: string;
    updateBoardState: (state: string[][]) => void;
}

const Piece = ({piece, updateBoardState}: PieceProps) => {

    console.log('piece', piece);

    let pieceClasses = '';
    switch(piece){
        case 'W': pieceClasses = 'piece piece--white'; break;
        case 'B': pieceClasses = 'piece piece--black'; break;
        case 'K': pieceClasses = 'piece piece--king';
    }

    return (
        <div className={pieceClasses}></div>
    )
}

export default Piece;