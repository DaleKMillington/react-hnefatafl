// Base Imports
import { useState, useEffect } from "react";

// Third Party Imports

// Application Imports
import Board from './Board.tsx';

const BoardContainer = () => {

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
            <Board />
        </div>
    )
}

export default BoardContainer;