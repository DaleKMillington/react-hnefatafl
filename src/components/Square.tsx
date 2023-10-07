// Base Imports

// Third Party Imports

// Application Imports
import Piece from './Piece.tsx';
import {restrictedSquares} from "../game-logic/board-state.ts";

// Types
import {PieceSelected} from "../types/PieceSelected.ts";

// Interfaces
import {BoardContainerProps} from "./BoardContainer.tsx";
interface SquareProps extends BoardContainerProps {
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
    pieceCanMove: string[][];
    setPieceSelected: (state: PieceSelected) => void;
}

const Square = ({
    rowIndex,
    columnIndex,
    piece,
    pieceSelected,
    legalMove,
    boardDimensions,
    gameState,
    setGameState,
    pieceCanMove,
    setPieceSelected
}: SquareProps) => {

    //// Setup classes for square ---------------------------------------------------------------------------------------

    let squareClasses = 'board-square';
    squareClasses = rowIndex === 0 ? squareClasses += ' board-square--top' : squareClasses;
    squareClasses = rowIndex === 10 ? squareClasses += ' board-square--bottom' : squareClasses;
    squareClasses = columnIndex === 0 ? squareClasses += ' board-square--left' : squareClasses;
    squareClasses = columnIndex === 10 ? squareClasses += ' board-square--right' : squareClasses;
    squareClasses = restrictedSquares[rowIndex][columnIndex] === 'Y' ? squareClasses += ' board-square--restricted' :
        squareClasses;
    squareClasses = pieceSelected.piece && legalMove === 'N' ? squareClasses += ' board-square--illegal-move' :
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
                gameState={gameState}
                setGameState={setGameState}
                pieceCanMove={pieceCanMove}
                setPieceSelected={setPieceSelected}
            />
        </div>
    )
}

export default Square;