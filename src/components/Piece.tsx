// Base Imports
import {useState, useRef, MouseEventHandler} from "react";

// Third Party Imports

// Application Imports
import ClonedPiece from "./ClonedPiece.tsx";

// Types
import {PieceSelected} from "../types/PieceSelected.ts";

// Interfaces
import {BoardContainerProps} from "./BoardContainer.tsx";
interface PieceProps extends BoardContainerProps {
    piece: string;
    pieceSelected: PieceSelected;
    rowIndex: number;
    columnIndex: number;
    boardDimensions: {
        top: number,
        left: number,
        width: number,
        height: number
    };
    pieceCanMove: string[][];
    setPieceSelected: (state: PieceSelected) => void;
}


const Piece = ({
    piece,
    pieceSelected,
    rowIndex,
    columnIndex,
    boardDimensions,
    gameState,
    setGameState,
    pieceCanMove,
    setPieceSelected
}: PieceProps) => {

    //// Setup classes for piece ---------------------------------------------------------------------------------------

    let pieceClasses = '';
    switch(piece){
        case 'W': pieceClasses = 'piece piece--white'; break;
        case 'B': pieceClasses = 'piece piece--black'; break;
        case 'K': pieceClasses = 'piece piece--king';
    }
    pieceClasses = pieceSelected.piece ? pieceClasses :
        pieceCanMove[rowIndex][columnIndex] === 'N' ? pieceClasses :
        pieceClasses += ' piece--selectable';

    //// ---------------------------------------------------------------------------------------------------------------

    //// useState Hooks ------------------------------------------------------------------------------------------------

    // Has a piece been selected.
    const [
        thisPieceSelected,
        setThisPieceSelected
    ] = useState(false);

    // Mouse position so we can grab the coords when a piece is selected to render clone at this point.
    const [
        mousePosition,
        setMousePosition
    ] = useState({ x: 0, y: 0 });

    //// ---------------------------------------------------------------------------------------------------------------

    //// useRef Hooks --------------------------------------------------------------------------------------------------

    // Reference to the piece so that we can obtain it's runtime rendered size.
    const pieceRef = useRef<HTMLDivElement | null>(null);

    //// ---------------------------------------------------------------------------------------------------------------

    //// Callbacks -----------------------------------------------------------------------------------------------------

    // Onclick handler for when a piece is selected
    const selectPiece: MouseEventHandler<HTMLDivElement> = (event) => {
        const isWhitePieceAndPlayer = ['W', 'K'].includes(piece) && gameState.player === 'W';
        const isBlackPieceAndPlayer = piece === 'B' && gameState.player === 'B';
        if ((isWhitePieceAndPlayer || isBlackPieceAndPlayer) && pieceCanMove[rowIndex][columnIndex] === 'Y'){
            const { clientX, clientY } = event;
            setPieceSelected({
                'piece': piece,
                'rowIndex': rowIndex,
                'columnIndex': columnIndex
            });
            setThisPieceSelected(true);
            setMousePosition({ x: clientX, y: clientY });
        }
    };

    //// ---------------------------------------------------------------------------------------------------------------

    return (
        <div className={pieceClasses} onClick={selectPiece} ref={pieceRef}>

            {thisPieceSelected &&
                <ClonedPiece
                    piece={piece}
                    rowIndex={rowIndex}
                    columnIndex={columnIndex}
                    left={mousePosition.x}
                    top={mousePosition.y}
                    boardDimensions={boardDimensions}
                    gameState={gameState}
                    setGameState={setGameState}
                    setPieceSelected={setPieceSelected}
                    setThisPieceSelected={setThisPieceSelected}
                />
            }

        </div>
    )
}

export default Piece;