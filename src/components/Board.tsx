// Base Imports
import {useEffect, useRef, useState} from "react";

// Third Party Imports

// Application Imports
import Square from './Square.tsx';

// Types
import {PieceSelected} from "../types/PieceSelected.ts";
import {GameState} from "../App.tsx";

// Interfaces
import {BoardContainerProps} from "./BoardContainer.tsx";


const Board = ({gameState, setGameState}: BoardContainerProps) => {

    const pieceCanMove = determinePieceCanMove(gameState);

    //// useState Hooks ------------------------------------------------------------------------------------------------

    // Initialise state for legal moves to be passed down to squares.
    const [legalMoves, setLegalMoves] = useState(initLegalMoves());

    // Has a piece been selected
    const [pieceSelected, setPieceSelected] = useState({
        'piece': '',
        'rowIndex': -1,
        'columnIndex': -1,
    });

    // Board dimensions
    const [
        boardDimensions,
        setBoardDimensions
    ] = useState({
        top: 0,
        left: 0,
        width: 0,
        height: 0
    });

    //// ---------------------------------------------------------------------------------------------------------------

    //// useRef Hooks --------------------------------------------------------------------------------------------------

    const boardRef = useRef<HTMLDivElement | null>(null);

    //// ---------------------------------------------------------------------------------------------------------------
    useEffect(() => {
        const updateBoardDimensions = () => {
            if (boardRef.current) {
                const {
                    top,
                    left,
                    width,
                    height
                } = boardRef.current.getBoundingClientRect();
                setBoardDimensions({ top, left, width, height });
            }
        };
        updateBoardDimensions();
        window.addEventListener('resize', updateBoardDimensions);
        return () => window.removeEventListener('resize', updateBoardDimensions);
    }, []);

    useEffect(() => {
        if(pieceSelected.piece){
            setLegalMoves(determineLegalMoves(pieceSelected, gameState));
        }
    }, [pieceSelected, gameState]);

    //// ---------------------------------------------------------------------------------------------------------------

    return (

        <div className="board" ref={boardRef}>
            <div className="board__background-image"></div>

                {
                    gameState.boardState.map((row, rowIndex) => (
                        <div key={rowIndex} className="board-row">

                        {
                            row.map((piece, columnIndex) => (
                                <Square
                                    key={columnIndex}
                                    rowIndex={rowIndex}
                                    columnIndex={columnIndex}
                                    piece={piece}
                                    pieceSelected={pieceSelected}
                                    legalMove={legalMoves[rowIndex][columnIndex]}
                                    boardDimensions={boardDimensions}
                                    gameState={gameState}
                                    setGameState={setGameState}
                                    pieceCanMove={pieceCanMove}
                                    setPieceSelected={setPieceSelected}
                                />
                            ))
                        }

                    </div>
                ))
            }

        </div>
    )
}

const initLegalMoves = () => {
    return Array.from({ length: 11 }, () =>
        Array.from({ length: 11 }, () => 'N')
    );
}

const determineLegalMoves = (pieceSelected: PieceSelected, gameState: GameState) => {
    const { piece, rowIndex, columnIndex } = pieceSelected;
    const { boardState, restrictedSquares } = gameState;

    // Create a 2D array filled with 'N'
    const legalMoves = initLegalMoves();

    // Helper function to update legalMoves based on conditions
    const updateLegalMove = (rowIndex: number, columnIndex: number) => {
        const isEmpty = boardState[rowIndex][columnIndex] === 'E';
        const isKing = piece === 'K';
        const isRestricted = restrictedSquares[rowIndex][columnIndex] === 'Y';
        if (isEmpty){
            if (isRestricted){
                if (isKing) {
                    legalMoves[rowIndex][columnIndex] = 'Y';
                }
            } else {
                legalMoves[rowIndex][columnIndex] = 'Y';
            }
        }
    };

    // Check selected piece's current row (left and right)
    for (let rowPos = columnIndex - 1; rowPos >= 0; rowPos--) {
        if (boardState[rowIndex][rowPos] !== 'E') break;
        updateLegalMove(rowIndex, rowPos);
    }
    for (let rowPos = columnIndex + 1; rowPos < 11; rowPos++) {
        if (boardState[rowIndex][rowPos] !== 'E') break;
        updateLegalMove(rowIndex, rowPos);
    }

    // Check selected piece's current column (up and down)
    for (let colPos = rowIndex - 1; colPos >= 0; colPos--) {
        if (boardState[colPos][columnIndex] !== 'E') break;
        updateLegalMove(colPos, columnIndex);
    }
    for (let colPos = rowIndex + 1; colPos < 11; colPos++) {
        if (boardState[colPos][columnIndex] !== 'E') break;
        updateLegalMove(colPos, columnIndex);
    }

    return legalMoves;
};

const determinePieceCanMove = (gameState: GameState) => {
    const {boardState, restrictedSquares, player} = gameState;
    const checkPieces = player === 'W' ? ['W', 'K'] : ['B'];
    const legalMoves = initLegalMoves();

    const isKing = (row: number, column: number) => boardState[row][column] === 'K';
    const isEmpty = (row: number, column: number) => boardState[row][column] === 'E';
    const isRestricted = (row: number, column: number) => restrictedSquares[row][column] === 'Y';

    const canMove = (row: number, column: number, rowOffset: number, colOffset: number) => {
        const newRow = row + rowOffset;
        const newColumn = column + colOffset;
        if (newRow >= 0 && newRow <= 10 && newColumn >= 0 && newColumn <= 10) {
            if (isEmpty(newRow, newColumn)) {
                if (isKing(row, column) && isRestricted(newRow, newColumn)) {
                    legalMoves[newRow][newColumn] = 'Y';
                    return;
                }
                if (!isRestricted(newRow, newColumn)){
                    legalMoves[row][column] = 'Y';
                }
            }
        }
    };

    for (let row = 0; row < 11; row++) {
        for (let column = 0; column < 11; column++) {
            const boardStatePiece = boardState[row][column];
            if (checkPieces.includes(boardStatePiece)) {
                canMove(row, column, -1, 0);
                canMove(row, column, 1, 0);
                canMove(row, column, 0, -1);
                canMove(row, column, 0, 1);
            }
        }
    }

    return legalMoves;
};


export default Board;