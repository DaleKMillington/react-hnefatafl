// Base Imports

// Third Party Imports

// Application Imports
import './sass/index.scss';
import Board from './components/Board.tsx';


const App = () => {

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

                    <Board />

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
