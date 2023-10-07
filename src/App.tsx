// Base Imports
import {useState} from "react";

// Third Party Imports

// Application Imports
import './sass/index.scss';
import {initialState, restrictedSquares} from "./game-logic/board-state.ts";
import BoardContainer from './components/BoardContainer.tsx';

// Types
export type GameState = {
    'boardState': string[][];
    'restrictedSquares': string[][];
    'turn': number;
    'player': string;
}
export type SetGameState = (gameState: GameState) => void;

const App = () => {

    //// useState Hooks ------------------------------------------------------------------------------------------------

    // Board piece position
    const [gameState, setGameState] = useState({
        'boardState': initialState,
        'restrictedSquares': restrictedSquares,
        'turn': 1,
        'player': 'W'
    });

    //// ---------------------------------------------------------------------------------------------------------------

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
                    <div>PLAYER {gameState.player}</div>
                    <div>TURN {gameState.turn}</div>
                </div>

                <div className="main-row">
                    <div className="main-icon">
                        <div className="main-icon__icon main-icon__icon--left">ᛟ</div>
                    </div>

                    <BoardContainer
                        gameState={gameState}
                        setGameState={setGameState}
                    />

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
