// Base Imports
import { useState } from "react";

// Third Party Imports

// Application Imports
import {initialState} from '../game-logic/board-state.ts';
import Square from './Square.tsx';

const Board = () => {

    const [boardState, setBoardState] = useState(initialState);
    const updateBoardState = (state: string[][]) => setBoardState(state);

    const [pieceSelected, setPieceSelected] = useState(false);
    const togglePieceSelected = () => setPieceSelected(!pieceSelected);

    return (

        <div className="board">
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
                                    updateBoardState={updateBoardState}
                                    togglePieceSelected={togglePieceSelected}
                                />
                            ))
                        }

                    </div>
                ))
            }

        </div>
    )
}

/*
{boardState.map((row, rowIndex) => (
    <key={rowIndex}>
        {row.map((piece, columnIndex) => (
            <Square
                key={columnIndex}
                rowIndex={rowIndex}
                columnIndex={columnIndex}
                piece={piece}
                setBoardState={setBoardState}
            />
        ))}
    </>
))}
 */

export default Board;