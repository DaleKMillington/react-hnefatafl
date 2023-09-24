// Base Imports
import {useState, useEffect, useRef, MouseEventHandler} from "react";

// Third Party Imports

// Application Imports
import ClonedPiece from "./ClonedPiece.tsx";

// Types
import {PieceSelected} from "../types/PieceSelected.ts";

// Interfaces
interface PieceProps {
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
    updateBoardState: (state: string[][]) => void;
    setPieceSelected: (state: PieceSelected) => void;
}


const Piece = ({
    piece,
    pieceSelected,
    rowIndex,
    columnIndex,
    boardDimensions,
    updateBoardState,
    setPieceSelected
}: PieceProps) => {

    //// Setup classes for piece ---------------------------------------------------------------------------------------

    let pieceClasses = '';
    switch(piece){
        case 'W': pieceClasses = 'piece piece--white'; break;
        case 'B': pieceClasses = 'piece piece--black'; break;
        case 'K': pieceClasses = 'piece piece--king';
    }
    pieceClasses = pieceSelected.piece ? pieceClasses : pieceClasses += ' piece--selectable';

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

    // Width and height of the piece that was selected so that we can make clone the same size.
    const [pieceWidth, setPieceWidth] = useState(0);
    const [pieceHeight, setPieceHeight] = useState(0);

    //// ---------------------------------------------------------------------------------------------------------------

    //// useRef Hooks --------------------------------------------------------------------------------------------------

    // Reference to the piece so that we can obtain it's runtime rendered size.
    const pieceRef = useRef<HTMLDivElement | null>(null);

    //// ---------------------------------------------------------------------------------------------------------------

    //// useEffect Hooks -----------------------------------------------------------------------------------------------

    // On component reload, calculate the size of the previous renders selected piece.
    useEffect(() => {
        const updatePieceSize = () => {
            if (pieceRef.current) {
                const { width, height } = pieceRef.current.getBoundingClientRect();
                setPieceWidth(width);
                setPieceHeight(height);
            }
        };
        updatePieceSize();
        window.addEventListener('resize', updatePieceSize);
        return () => window.removeEventListener('resize', updatePieceSize);
    }, []);

    //// ---------------------------------------------------------------------------------------------------------------

    //// Callbacks -----------------------------------------------------------------------------------------------------

    // Onclick handler for when a piece is selected
    const selectPiece: MouseEventHandler<HTMLDivElement> = (event) => {
        const { clientX, clientY } = event;
        setPieceSelected({
            'piece': piece,
            'rowIndex': rowIndex,
            'columnIndex': columnIndex
        });
        setThisPieceSelected(true);
        setMousePosition({ x: clientX, y: clientY });
    };

    //// ---------------------------------------------------------------------------------------------------------------

    return (
        <div className={pieceClasses} onClick={selectPiece} ref={pieceRef}>

            {thisPieceSelected &&
                <ClonedPiece
                    piece={piece}
                    rowIndex={rowIndex}
                    columnIndex={columnIndex}
                    width={pieceWidth}
                    height={pieceHeight}
                    left={mousePosition.x}
                    top={mousePosition.y}
                    boardDimensions={boardDimensions}
                    setPieceSelected={setPieceSelected}
                    setThisPieceSelected={setThisPieceSelected}
                />
            }

        </div>
    )
}

export default Piece;