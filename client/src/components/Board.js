import React, { useState, useRef } from 'react';
import { useDrop } from 'react-dnd';
import './Board.css';

const Board = ({ onUseBlock, updateScore }) => {
    const [grid, setGrid] = useState(Array.from({ length: 11 }, () => Array(11).fill(null)));
    const boardRef = useRef(null);

    const [{ isOver }, drop] = useDrop({
        accept: 'block',
        drop: (item, monitor) => {
            const offset = monitor.getSourceClientOffset();
            const boardRect = boardRef.current.getBoundingClientRect();
            const boardX = boardRect.left + window.pageXOffset;
            const boardY = boardRect.top + window.pageYOffset;
            const cellSize = 40;

            const x = Math.floor((offset.x - boardX) / cellSize);
            const y = Math.floor((offset.y - boardY) / cellSize);

            console.log('Offset:', offset);
            console.log('BoardRect:', boardRect);
            console.log('Calculated Drop Position:', { x, y });

            if (x < 0 || y < 0 || x >= 11 || y >= 11) {
                console.log('Drop position is out of bounds.');
                return;
            }

            const newGrid = grid.map(row => row.slice());
            const shape = item.shape;
            let canPlace = true;

            shape.forEach((row, rowIndex) => {
                row.forEach((cell, colIndex) => {
                    if (cell && (y + rowIndex >= 11 || x + colIndex >= 11 || newGrid[y + rowIndex][x + colIndex] !== null)) {
                        canPlace = false;
                    }
                });
            });

            if (canPlace) {
                shape.forEach((row, rowIndex) => {
                    row.forEach((cell, colIndex) => {
                        if (cell) {
                            newGrid[y + rowIndex][x + colIndex] = 'block';
                        }
                    });
                });

                let linesCleared = 0;

                for (let i = 0; i < 11; i++) {
                    if (newGrid[i].every(cell => cell !== null)) {
                        newGrid[i] = Array(11).fill(null);
                        linesCleared++;
                    }
                }

                for (let i = 0; i < 11; i++) {
                    const column = newGrid.map(row => row[i]);
                    if (column.every(cell => cell !== null)) {
                        newGrid.forEach(row => row[i] = null);
                        linesCleared++;
                    }
                }

                setGrid(newGrid);
                onUseBlock(item.index);
                updateScore(linesCleared);
            }
        },
        collect: (monitor) => ({
            isOver: monitor.isOver(),
        }),
    });

    return (
        <div
            ref={(node) => {
                drop(node);
                boardRef.current = node;
            }}
            className="board"
        >
            {grid.map((row, rowIndex) =>
                row.map((cell, cellIndex) => (
                    <div
                        key={`${rowIndex}-${cellIndex}`}
                        className="grid-cell"
                        style={{ backgroundColor: cell ? 'gray' : 'white' }}
                    ></div>
                ))
            )}
        </div>
    );
};

export default Board;
