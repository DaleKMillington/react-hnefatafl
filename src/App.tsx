// Base Imports
import { useState, useEffect } from "react";

// Third Party Imports

// Application Imports
import './sass/index.scss';

const App = () => {

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
        <>
            <div className="content-wrapper">

                <div className="header-row">
                    <a href="#" className="header-link">HNEFATAFL</a>
                    <a href="#" className="header-link">MENU</a>
                </div>

                <div className="action-row">
                    <div>RULES</div>
                    <div>UNDO</div>
                    <div>RESTART</div>
                    <div>TURN 19</div>
                </div>

                <div className="main-row">
                    <div className="main-icon">
                        <div className="main-icon__icon main-icon__icon--left">ᛟ</div>
                    </div>
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
                        <div className="board"></div>
                    </div>

                    <div className="main-icon">
                        <div className="main-icon__icon main-icon__icon--right">ᚾ</div>
                    </div>
                </div>

                <div className="footer-row">
                    <div>ADVERT BANNER</div>
                </div>

            </div>
        </>
    )
}

export default App;
