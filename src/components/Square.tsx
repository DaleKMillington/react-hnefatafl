// Base Imports

// Third Party Imports

// Application Imports
import Piece from './Piece.tsx';

// Types
interface SquareProps {
    rowIndex: number;
    columnIndex: number;
    piece: string;
    updateBoardState: (state: string[][]) => void;
}

const Square = ({rowIndex, columnIndex, piece, updateBoardState}: SquareProps) => {

    let squareClasses = 'board-square';
    squareClasses = rowIndex === 0 ? squareClasses += ' board-square--top' : squareClasses;
    squareClasses = rowIndex === 10 ? squareClasses += ' board-square--bottom' : squareClasses;
    squareClasses = columnIndex === 0 ? squareClasses += ' board-square--left' : squareClasses;
    squareClasses = columnIndex === 10 ? squareClasses += ' board-square--right' : squareClasses;


    return (
        <div className={squareClasses}>
            <Piece piece={piece} updateBoardState={updateBoardState} />
        </div>
    )
}

export default Square;