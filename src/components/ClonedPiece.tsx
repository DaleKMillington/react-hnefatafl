// Base Imports
import {useEffect, useState} from "react";
import ReactDOM from 'react-dom';

// Third Party Imports

// Application Imports

// Types
import {PieceSelected} from "../types/PieceSelected.ts";
import {GameState, SetGameState} from "../App.tsx";

// Interfaces
import {BoardContainerProps} from "./BoardContainer.tsx";

// Interfaces
interface ClonePieceProps extends BoardContainerProps {
    piece: string;
    rowIndex: number;
    columnIndex: number;
    left: number;
    top: number;
    boardDimensions: {
        top: number,
        left: number,
        width: number,
        height: number
    };
    setPieceSelected: (piece: PieceSelected) => void;
    setThisPieceSelected: (state: boolean) => void;
}

const ClonedPiece = ({
    piece,
    rowIndex,
    columnIndex,
    left,
    top,
    boardDimensions,
    gameState,
    setGameState,
    setPieceSelected,
    setThisPieceSelected
}: ClonePieceProps) => {

    //// Declarations --------------------------------------------------------------------------------------------------

    // Get the height of any piece so that we can make the clone the same dimensions.
    const {
        width: pieceWidth,
        height: pieceHeight
    } = document.querySelectorAll('.piece')[0].getBoundingClientRect();

    // Board dimensions so we know if clone has left the board and hence deselect.
    const {
        top: boardTop,
        left: boardLeft,
        width: boardWidth,
        height: boardHeight
    } = boardDimensions;

    // All the squares to calculate hovering.
    const squares = document.querySelectorAll('.board-square');

    //// ---------------------------------------------------------------------------------------------------------------

    //// Setup classes for cloned piece --------------------------------------------------------------------------------

    let pieceClasses = '';
    switch (piece) {
        case 'W': pieceClasses = 'cloned-piece cloned-piece--white';
        break;
        case 'B': pieceClasses = 'cloned-piece cloned-piece--black';
        break;
        case 'K': pieceClasses = 'cloned-piece cloned-piece--king';
    }

    //// ---------------------------------------------------------------------------------------------------------------

    //// useState Hooks ------------------------------------------------------------------------------------------------

    // State to track mouse movement and re-render the component so the clone follows the mouse.
    const [
        clonePosition,
        setClonePosition
    ] = useState({ top: top, left: left });

    const [activeSquare, setActiveSquare] = useState<Element>();

    //// ---------------------------------------------------------------------------------------------------------------

    //// useEffect Hooks -----------------------------------------------------------------------------------------------

    // On each re-render, calculate the new mouse position. If the mouse has left the board then de-select piece.
    useEffect(() => {
        const handleMouseMove = (event: MouseEvent) => {
            const mouseX = event.clientX;
            const mouseY = event.clientY;
            if(
                (mouseX + pieceWidth / 2) < boardLeft ||
                (mouseX - pieceWidth / 2) > boardLeft + boardWidth ||
                (mouseY + pieceHeight / 2) < boardTop ||
                (mouseY - pieceHeight / 2) > boardTop + boardHeight
            ){
                setThisPieceSelected(false);
                setPieceSelected({
                    'piece': '',
                    'rowIndex': -1,
                    'columnIndex': -1
                });
            } else {
                for (let i = 0; i < squares.length; i++) {
                    const square = squares[i];
                    const { left, top, width, height } = square.getBoundingClientRect();
                    if (
                        mouseX > left &&
                        mouseX < left + width &&
                        mouseY > top &&
                        mouseY < top + height &&
                        square.getAttribute('data-legal-move') === 'Y'
                    ) {
                        setClonePosition({ top: top + height / 2, left: left + width / 2 });
                        break;
                    } else {
                        setClonePosition({ top: mouseY, left: mouseX });
                    }
                }
            }
        };
        window.addEventListener('mousemove', handleMouseMove);
        return () => window.removeEventListener('mousemove', handleMouseMove);
    }, [
        boardLeft,
        boardWidth,
        boardTop,
        boardHeight,
        pieceWidth,
        pieceHeight,
        setThisPieceSelected,
        setPieceSelected,
        squares
    ]);

    // Determines if mouse is hovering over a square.
    useEffect(() => {
        const handleMouseMoveSquares = (event: MouseEvent) => {
            const mouseX = event.clientX;
            const mouseY = event.clientY;
            squares.forEach(square => {
                const {left, top, width, height} = square.getBoundingClientRect();
                if (
                    mouseX > left &&
                    mouseX < (left + width) &&
                    mouseY > top &&
                    mouseY < (top + height)
                ){
                    switch(square.getAttribute('data-legal-move')){
                        case 'Y': setActiveSquare(square); square.classList.add('board-square--selectable'); break;
                        case 'N': setActiveSquare(undefined);
                    }
                } else {
                    square.classList.remove('board-square--selectable');
                }
            });
        };
        window.addEventListener('mousemove', handleMouseMoveSquares);
        return () => window.removeEventListener('mousemove', handleMouseMoveSquares);
    }, [squares, setActiveSquare]);

    // Set up a right click handler on the window to cancel the move.
    useEffect(() => {
        const cancelMove: EventListener = (event) => {
            event.preventDefault();
            setPieceSelected({
                'piece': '',
                'rowIndex': -1,
                'columnIndex': -1
            });
            setThisPieceSelected(false);
            squares.forEach(square => square.classList.remove('board-square--selectable'));
        }
        window.addEventListener('contextmenu', cancelMove);
        return () => window.removeEventListener('contextmenu', cancelMove);
    },[squares, setPieceSelected, setThisPieceSelected]);

    // Set up left click to handle piece being moved (if legal).
    useEffect(() => {
        const handleLeftClick: EventListener = () => {
            if (activeSquare) {
                const dataRowAttribute = activeSquare.getAttribute('data-row');
                const targetRowIndex = dataRowAttribute ? parseInt(dataRowAttribute, 10) : 0;
                const dataColumnAttribute = activeSquare.getAttribute('data-column');
                const targetColumnIndex = dataColumnAttribute ? parseInt(dataColumnAttribute, 10) : 0;
                handleMove({
                    'selectedRowIndex': rowIndex,
                    'selectedColumnIndex': columnIndex,
                    'targetRowIndex': targetRowIndex,
                    'targetColumnIndex': targetColumnIndex,
                    'gameState': gameState,
                    'setGameState': setGameState
                });
                setPieceSelected({
                    'piece': '',
                    'rowIndex': -1,
                    'columnIndex': -1
                });
                setThisPieceSelected(false);
                activeSquare.classList.remove('board-square--selectable');
            }
        }
        window.addEventListener('click', handleLeftClick);
        return () => window.removeEventListener('click', handleLeftClick);
    }, [activeSquare, rowIndex, columnIndex, gameState, setGameState, setPieceSelected, setThisPieceSelected]);

    //// ---------------------------------------------------------------------------------------------------------------

    // Use React Portal to render the component at the <body> level so not affected by parent styling.
    return ReactDOM.createPortal(
        <div
            className={pieceClasses}
            style={{
                top: `${clonePosition.top}px`,
                left: `${clonePosition.left}px`,
                width: `${pieceWidth}px`,
                height: `${pieceHeight}px`
            }}
        ></div>,
        document.body
    );
};

type HandleMoveParams = {
    'selectedRowIndex': number,
    'selectedColumnIndex': number,
    'targetRowIndex': number,
    'targetColumnIndex': number,
    'gameState': GameState,
    'setGameState': SetGameState
}

const handleMove = ({
    selectedRowIndex,
    selectedColumnIndex,
    targetRowIndex,
    targetColumnIndex,
    gameState,
    setGameState
}: HandleMoveParams) => {
    const {boardState, restrictedSquares, turn, player} = gameState;
    const newBoardState = JSON.parse(JSON.stringify(boardState));
    newBoardState[targetRowIndex][targetColumnIndex] = newBoardState[selectedRowIndex][selectedColumnIndex];
    newBoardState[selectedRowIndex][selectedColumnIndex] = 'E';
    setGameState({
        'boardState': newBoardState,
        'restrictedSquares': restrictedSquares,
        'turn': turn + 1,
        'player': player === 'W' ? 'B' : 'W'
    })
}



export default ClonedPiece;