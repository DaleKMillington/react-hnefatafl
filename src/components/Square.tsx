// Base Imports

// Third Party Imports

// Application Imports
import Piece from './Piece.tsx';
import {restrictedSquares} from "../game-logic/board-state.ts";

// Types
interface SquareProps {
    rowIndex: number;
    columnIndex: number;
    piece: string;
    pieceSelected: boolean;
    updateBoardState: (state: string[][]) => void;
    setPieceSelected: (state: boolean) => void;
}

const Square = ({
    rowIndex,
    columnIndex,
    piece,
    pieceSelected,
    updateBoardState,
    setPieceSelected
}: SquareProps) => {

    let squareClasses = 'board-square';
    squareClasses = rowIndex === 0 ? squareClasses += ' board-square--top' : squareClasses;
    squareClasses = rowIndex === 10 ? squareClasses += ' board-square--bottom' : squareClasses;
    squareClasses = columnIndex === 0 ? squareClasses += ' board-square--left' : squareClasses;
    squareClasses = columnIndex === 10 ? squareClasses += ' board-square--right' : squareClasses;

    squareClasses = restrictedSquares[rowIndex][columnIndex] === 'R' ? squareClasses += ' board-square--restricted' :
        squareClasses;


    return (
        <div className={squareClasses}>
            <Piece
                piece={piece}
                pieceSelected={pieceSelected}
                updateBoardState={updateBoardState}
                setPieceSelected={setPieceSelected}
            />
        </div>
    )
}

export default Square;