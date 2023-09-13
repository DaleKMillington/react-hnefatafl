// Base Imports
import {useEffect, useRef, useState} from "react";

// Third Party Imports
// Application Imports
import {initialState} from '../game-logic/board-state.ts';
import Square from './Square.tsx';

const Board = () => {

    const [boardState, setBoardState] = useState(initialState);
    const updateBoardState = (state: string[][]) => setBoardState(state);

    const [pieceSelected, setPieceSelected] = useState(false);

    //// useState Hooks ------------------------------------------------------------------------------------------------

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

export default Board;