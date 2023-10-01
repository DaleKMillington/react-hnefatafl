// Base Imports
import {useEffect, useRef, useState} from "react";

// Third Party Imports

// Application Imports
import {initialState} from '../game-logic/board-state.ts';
import {restrictedSquares} from "../game-logic/board-state.ts";
import Square from './Square.tsx';

// Types
import {PieceSelected} from "../types/PieceSelected.ts";

const Board = () => {

    //// useState Hooks ------------------------------------------------------------------------------------------------

    // Board piece position
    const [boardState, setBoardState] = useState(initialState);
    const updateBoardState = (state: string[][]) => setBoardState(state);

    const [legalMoves, setLegalMoves] = useState(
        [
            ['N', 'N', 'N', 'N', 'N', 'N', 'N', 'N', 'N', 'N', 'N'],
            ['N', 'N', 'N', 'N', 'N', 'N', 'N', 'N', 'N', 'N', 'N'],
            ['N', 'N', 'N', 'N', 'N', 'N', 'N', 'N', 'N', 'N', 'N'],
            ['N', 'N', 'N', 'N', 'N', 'N', 'N', 'N', 'N', 'N', 'N'],
            ['N', 'N', 'N', 'N', 'N', 'N', 'N', 'N', 'N', 'N', 'N'],
            ['N', 'N', 'N', 'N', 'N', 'N', 'N', 'N', 'N', 'N', 'N'],
            ['N', 'N', 'N', 'N', 'N', 'N', 'N', 'N', 'N', 'N', 'N'],
            ['N', 'N', 'N', 'N', 'N', 'N', 'N', 'N', 'N', 'N', 'N'],
            ['N', 'N', 'N', 'N', 'N', 'N', 'N', 'N', 'N', 'N', 'N'],
            ['N', 'N', 'N', 'N', 'N', 'N', 'N', 'N', 'N', 'N', 'N'],
            ['N', 'N', 'N', 'N', 'N', 'N', 'N', 'N', 'N', 'N', 'N'],
        ]
    );

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
            setLegalMoves(determineLegalMoves(pieceSelected, boardState, restrictedSquares));
        }
    }, [pieceSelected, boardState]);

    //// ---------------------------------------------------------------------------------------------------------------

    return (

        <div className="board" ref={boardRef}>
            <div className="board__background-image"></div>

                {
                    boardState.map((row, rowIndex) => (
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
                                    updateBoardState={updateBoardState}
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

const determineLegalMoves = (
    pieceSelected: PieceSelected,
    boardState: string[][],
    restrictedSquares: string[][]
) => {
    const {piece, rowIndex, columnIndex} = pieceSelected;

    // First create blank state that we can update
    const legalMoves = [
        ['N', 'N', 'N', 'N', 'N', 'N', 'N', 'N', 'N', 'N', 'N'],
        ['N', 'N', 'N', 'N', 'N', 'N', 'N', 'N', 'N', 'N', 'N'],
        ['N', 'N', 'N', 'N', 'N', 'N', 'N', 'N', 'N', 'N', 'N'],
        ['N', 'N', 'N', 'N', 'N', 'N', 'N', 'N', 'N', 'N', 'N'],
        ['N', 'N', 'N', 'N', 'N', 'N', 'N', 'N', 'N', 'N', 'N'],
        ['N', 'N', 'N', 'N', 'N', 'N', 'N', 'N', 'N', 'N', 'N'],
        ['N', 'N', 'N', 'N', 'N', 'N', 'N', 'N', 'N', 'N', 'N'],
        ['N', 'N', 'N', 'N', 'N', 'N', 'N', 'N', 'N', 'N', 'N'],
        ['N', 'N', 'N', 'N', 'N', 'N', 'N', 'N', 'N', 'N', 'N'],
        ['N', 'N', 'N', 'N', 'N', 'N', 'N', 'N', 'N', 'N', 'N'],
        ['N', 'N', 'N', 'N', 'N', 'N', 'N', 'N', 'N', 'N', 'N'],
    ];

    // First check selected piece's current row downwards
    let rowPos = columnIndex;
    while(rowPos >= 0){
        if(rowPos !== columnIndex){
            const positionPiece = boardState[rowIndex][rowPos];
            if (positionPiece === 'E') {
                if (piece !== 'K') {
                    legalMoves[rowIndex][rowPos] = restrictedSquares[rowIndex][rowPos] !== 'R' ? 'Y' : 'N';
                } else {
                    legalMoves[rowIndex][rowPos] = 'Y';
                }
            } else {
                rowPos = -1;
            }
        }
        rowPos--;
    }

    // Next check selected piece's current row upwards
    rowPos = columnIndex;
    while(rowPos <= 10){
        if(rowPos !== columnIndex) {
            const positionPiece = boardState[rowIndex][rowPos];
            if (positionPiece === 'E') {
                if (piece !== 'K') {
                    legalMoves[rowIndex][rowPos] = restrictedSquares[rowIndex][rowPos] !== 'R' ? 'Y' : 'N';
                } else {
                    legalMoves[rowIndex][rowPos] = 'Y';
                }
            } else {
                rowPos = 11;
            }
        }
        rowPos++;
    }

    // Next check selected piece's current column downwards
    let colPos = rowIndex;
    while(colPos >= 0){
        if (colPos !== rowIndex) {
            const positionPiece = boardState[colPos][columnIndex];
            if (positionPiece === 'E') {
                if (piece !== 'K') {
                    legalMoves[colPos][columnIndex] = restrictedSquares[colPos][columnIndex] !== 'R' ? 'Y' : 'N';
                } else {
                    legalMoves[colPos][columnIndex] = 'Y';
                }
            } else {
                colPos = -1;
            }
        }
        colPos--;
    }

    // Next check selected piece's current column downwards
    colPos = rowIndex;
    while(colPos <= 10){
        if (colPos !== rowIndex) {
            const positionPiece = boardState[colPos][columnIndex];
            if (positionPiece === 'E') {
                if (piece !== 'K') {
                    legalMoves[colPos][columnIndex] = restrictedSquares[colPos][columnIndex] !== 'R' ? 'Y' : 'N';
                } else {
                    legalMoves[colPos][columnIndex] = 'Y';
                }
            } else {
                colPos = 11;
            }
        }
        colPos++;
    }

    return legalMoves;
}


export default Board;