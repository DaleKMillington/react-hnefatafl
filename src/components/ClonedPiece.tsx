// Base Imports
import {MouseEventHandler, useEffect, useState} from "react";
import ReactDOM from 'react-dom';

// Third Party Imports

// Application Imports

// Types
interface ClonePieceProps {
    piece: string;
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
    width,
    height,
    left,
    top,
    boardDimensions,
    setPieceSelected,
    setThisPieceSelected
}: ClonePieceProps) => {

    //// Declarations --------------------------------------------------------------------------------------------------

    const {
        top: boardTop,
        left: boardLeft,
        width: boardWidth,
        height: boardHeight
    } = boardDimensions;

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

    // Onclick handler for when a piece is selected
    const handleClicks: MouseEventHandler<HTMLDivElement> = (event) => {
        if (event.button === 2) {
            event.preventDefault();
            setPieceSelected(false);
            setThisPieceSelected(false);
        }
    };

    //// ---------------------------------------------------------------------------------------------------------------

    //// useState Hooks ------------------------------------------------------------------------------------------------

    // State to track mouse movement and re-render the component so the clone follows the mouse.
    const [
        mousePosition,
        setMousePosition
    ] = useState({ top: top, left: left });

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

    //// ---------------------------------------------------------------------------------------------------------------

    // Use React Portal to render the component at the <body> level so not affected by parent styling.
    return ReactDOM.createPortal(
        <div
            className={pieceClasses}
            onContextMenu={handleClicks}
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