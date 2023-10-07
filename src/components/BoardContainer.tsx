// Base Imports
import { useState, useEffect } from "react";

// Third Party Imports

// Application Imports
import Board from './Board.tsx';

// Types
import {GameState, SetGameState} from "../App.tsx";

// Interfaces
export interface BoardContainerProps {
    gameState: GameState;
    setGameState: SetGameState;
}


const BoardContainer = ({gameState, setGameState}: BoardContainerProps) => {

    //// useState Hooks ------------------------------------------------------------------------------------------------

    // Window width for resize events.
    const [windowWidth, setWindowWidth] = useState(window.innerWidth);

    //// ---------------------------------------------------------------------------------------------------------------

    //// useEffect Hooks -----------------------------------------------------------------------------------------------

    // Handle window resize events.
    useEffect(() => {
        const handleResize = () => setWindowWidth(window.innerWidth);
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    // Set the board max width to be equal to it's max height on window resize events.
    useEffect(() => {
        const boardContainer = document.getElementById('board-container');
        const mainRow = document.querySelector('.main-row');
        if (boardContainer && mainRow) {
            const mainRowHeight = (mainRow as HTMLElement).offsetHeight;
            boardContainer.style.maxWidth = `${mainRowHeight}px`;
        }
    }, [windowWidth]);

    //// ---------------------------------------------------------------------------------------------------------------

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
            <Board
                gameState={gameState}
                setGameState={setGameState}
            />
        </div>
    )
}

export default BoardContainer;
