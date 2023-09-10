// Base Imports
import { useState, useEffect } from "react";

// Third Party Imports

// Application Imports
import initialState from '../game-logic/board-state.ts';
import Square from './Square.tsx';

const Board = () => {

    const [windowWidth, setWindowWidth] = useState(window.innerWidth);

    useEffect(() => {
        const handleResize = () => {
            setWindowWidth(window.innerWidth);
        };

        window.addEventListener('resize', handleResize);

        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, []);


    useEffect(() => {
        const boardContainer = document.getElementById('board-container');
        const mainRow = document.querySelector('.main-row');
        if (boardContainer && mainRow) {
            const mainRowHeight = (mainRow as HTMLElement).offsetHeight;
            boardContainer.style.maxWidth = `${mainRowHeight}px`;
        }
    }, [windowWidth]);

    const [boardState, setBoardState] = useState(initialState);

    const updateBoardState = (state: string[][]) => setBoardState(state);

    return (
        <div className="board-container" id="board-container">
            <div className="board-container__runeholder board-container__runeholder--top">
                <span>ᛟ</span>
                <span>ᚾ</span>
                <span>ᛟ</span>
                <span>ᚾ</span>
                <span>ᛟ</span>
                <span>ᚾ</span>
                <span>ᛟ</span>
            </div>
            <div className="board-container__runeholder board-container__runeholder--left">
                <span>ᛟ</span>
                <span>ᚾ</span>
                <span>ᛟ</span>
                <span>ᚾ</span>
                <span>ᛟ</span>
                <span>ᚾ</span>
                <span>ᛟ</span>
            </div>
            <div className="board-container__runeholder board-container__runeholder--bottom">
                <span>ᛟ</span>
                <span>ᚾ</span>
                <span>ᛟ</span>
                <span>ᚾ</span>
                <span>ᛟ</span>
                <span>ᚾ</span>
                <span>ᛟ</span>
            </div>
            <div className="board-container__runeholder board-container__runeholder--right">
                <span>ᛟ</span>
                <span>ᚾ</span>
                <span>ᛟ</span>
                <span>ᚾ</span>
                <span>ᛟ</span>
                <span>ᚾ</span>
                <span>ᛟ</span>
            </div>
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
                                        updateBoardState={updateBoardState}
                                    />
                                ))
                            }

                        </div>
                    ))
                }

            </div>
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