// Base Imports

// Third Party Imports

// Application Imports
import Piece from './Piece.tsx';
import {restrictedSquares} from "../game-logic/board-state.ts";

// Types
import {PieceSelected} from "../types/PieceSelected.ts";

// Interfaces
interface SquareProps {
    rowIndex: number;
    columnIndex: number;
    piece: string;
    pieceSelected: PieceSelected;
    legalMove: string;
    boardDimensions: {
        top: number,
        left: number,
        width: number,
        height: number
    };
    updateBoardState: (state: string[][]) => void;
    setPieceSelected: (state: PieceSelected) => void;
}

const Square = ({
    rowIndex,
    columnIndex,
    piece,
    pieceSelected,
    legalMove,
    boardDimensions,
    updateBoardState,
    setPieceSelected
}: SquareProps) => {

    //// Setup classes for square ---------------------------------------------------------------------------------------

    let squareClasses = 'board-square';
    squareClasses = rowIndex === 0 ? squareClasses += ' board-square--top' : squareClasses;
    squareClasses = rowIndex === 10 ? squareClasses += ' board-square--bottom' : squareClasses;
    squareClasses = columnIndex === 0 ? squareClasses += ' board-square--left' : squareClasses;
    squareClasses = columnIndex === 10 ? squareClasses += ' board-square--right' : squareClasses;

    squareClasses = pieceSelected.piece && legalMove === 'N' ? squareClasses += ' board-square--illegal-move' :
        squareClasses;

    squareClasses = restrictedSquares[rowIndex][columnIndex] === 'R' ? squareClasses += ' board-square--restricted' :
        squareClasses;

    //// ---------------------------------------------------------------------------------------------------------------

    return (
        <div className={squareClasses} data-row={rowIndex} data-column={columnIndex} data-legal-move={legalMove}>
            <Piece
                piece={piece}
                pieceSelected={pieceSelected}
                rowIndex={rowIndex}
                columnIndex={columnIndex}
                boardDimensions={boardDimensions}
                updateBoardState={updateBoardState}
                setPieceSelected={setPieceSelected}
            />
        </div>
    )
}

export default Square;