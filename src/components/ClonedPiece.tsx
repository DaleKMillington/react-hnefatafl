// Base Imports
import {MouseEventHandler, useEffect, useState} from "react";
import ReactDOM from 'react-dom';

// Third Party Imports

// Application Imports

// Types
interface ClonePieceProps {
    piece: string;
    rowIndex: number;
    columnIndex: number;
    width: number;
    height: number;
    left: number;
    top: number;
    boardDimensions: {
        top: number,
        left: number,
        width: number,
        height: number
    };
    setPieceSelected: (state: boolean) => void;
    setThisPieceSelected: (state: boolean) => void;
}

const ClonedPiece = ({
    piece,
    rowIndex,
    columnIndex,
    width,
    height,
    left,
    top,
    boardDimensions,
    setPieceSelected,
    setThisPieceSelected
}: ClonePieceProps) => {

    //// Declarations --------------------------------------------------------------------------------------------------

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

    //// Callbacks -----------------------------------------------------------------------------------------------------

    // Provisional left click handler to determine a square being selected.
    const handleLeftClick: MouseEventHandler<HTMLDivElement> = (event) => {
        console.log('Selected piece row index: ', rowIndex);
        console.log('Selected piece column index: ', columnIndex);
        if (activeSquare) {
            console.log('Target square row index: ', activeSquare.getAttribute('data-row'));
            console.log('Target square column index: ', activeSquare.getAttribute('data-column'));
        }
    }

    // Onclick handler for when a piece is selected.
    const handleOtherClicks: MouseEventHandler<HTMLDivElement> = (event) => {
        if (event.button === 2) {
            event.preventDefault();
            setPieceSelected(false);
            setThisPieceSelected(false);
            squares.forEach(square => square.classList.remove('board-square--selectable'));
        }
    };

    //// ---------------------------------------------------------------------------------------------------------------

    //// useState Hooks ------------------------------------------------------------------------------------------------

    // State to track mouse movement and re-render the component so the clone follows the mouse.
    const [
        mousePosition,
        setMousePosition
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
                (mouseX + width / 2) < boardLeft ||
                (mouseX - width / 2) > boardLeft + boardWidth ||
                (mouseY + height / 2) < boardTop ||
                (mouseY - height / 2) > boardTop + boardHeight
            ){
                setThisPieceSelected(false);
                setPieceSelected(false);
            } else {
                setMousePosition({ top: mouseY, left: mouseX });
            }
        };
        window.addEventListener('mousemove', handleMouseMove);
        return () => window.removeEventListener('mousemove', handleMouseMove);
    }, [boardLeft, boardWidth, boardTop, boardHeight, width, height, setThisPieceSelected, setPieceSelected]);

    // Determines if mouse is hovering over a square.
    useEffect(() => {
        const handleMouseMoveSquares = (event: MouseEvent) => {
            const mouseX = event.clientX;
            const mouseY = event.clientY;
            squares.forEach(square => {
                const {left, top, width, height} = square.getBoundingClientRect();
                if (mouseX > left && mouseX < (left + width) && mouseY > top && mouseY < (top + height)){
                    square.classList.add('board-square--selectable');
                    setActiveSquare(square);
                } else {
                    square.classList.remove('board-square--selectable');
                }
            });
        };
        window.addEventListener('mousemove', handleMouseMoveSquares);
        return () => window.removeEventListener('mousemove', handleMouseMoveSquares);
    }, [squares, setActiveSquare]);

    //// ---------------------------------------------------------------------------------------------------------------

    // Use React Portal to render the component at the <body> level so not affected by parent styling.
    return ReactDOM.createPortal(
        <div
            className={pieceClasses}
            onClick={handleLeftClick}
            onContextMenu={handleOtherClicks}
            style={{
                top: `${mousePosition.top}px`,
                left: `${mousePosition.left}px`,
                width: `${width}px`,
                height: `${height}px`
            }}
        ></div>,
        document.body
    );
};

export default ClonedPiece;