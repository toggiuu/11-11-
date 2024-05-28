import React, { useState, useEffect } from 'react';
import Board from './components/Board';
import Block from './components/Block';
import Score from './components/Score';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import './styles/styles.css';

const App = () => {
    const shapes = [
        [[1], [1], [1], [1]],
        [[1, 1, 1, 1]],
        [[1, 1], [1, 1]],
        [[1, 1, 0], [0, 1, 1]],
        [[0, 1, 1], [1, 1, 0]],
        [[1, 0], [1, 0], [1, 1]],
        [[0, 1], [0, 1], [1, 1]]
    ];

    const rotateShape = (shape) => {
        const rows = shape.length;
        const cols = shape[0].length;
        const rotated = Array.from({ length: cols }, () => Array(rows).fill(0));
        for (let i = 0; i < rows; i++) {
            for (let j = 0; j < cols; j++) {
                rotated[j][rows - 1 - i] = shape[i][j];
            }
        }
        return rotated;
    };

    const generateRandomBlocks = () => {
        const randomShapes = [];
        for (let i = 0; i < 3; i++) {
            const randomShape = shapes[Math.floor(Math.random() * shapes.length)];
            randomShapes.push(randomShape);
        }
        return randomShapes;
    };

    const [blocks, setBlocks] = useState(generateRandomBlocks());
    const [score, setScore] = useState(0);

    const handleBlockUsed = (index) => {
        const newBlocks = [...blocks];
        newBlocks[index] = null;
        setBlocks(newBlocks);
    };

    const updateScore = (linesCleared) => {
        setScore(score + linesCleared * 10);
    };

    useEffect(() => {
        if (blocks.every(block => block === null)) {
            setBlocks(generateRandomBlocks());
        }
    }, [blocks]);

    const rotateBlock = (index) => {
        const newBlocks = [...blocks];
        if (newBlocks[index]) {
            newBlocks[index] = rotateShape(newBlocks[index]);
            setBlocks(newBlocks);
        }
    };

    useEffect(() => {
        const handleKeyDown = (event) => {
            if (event.key === '1') {
                rotateBlock(0);
            } else if (event.key === '2') {
                rotateBlock(1);
            } else if (event.key === '3') {
                rotateBlock(2);
            }
        };

        window.addEventListener('keydown', handleKeyDown);
        return () => {
            window.removeEventListener('keydown', handleKeyDown);
        };
    }, [blocks]);

    return (
        <DndProvider backend={HTML5Backend}>
            <div className="app">
                <h1>11-11 Game</h1>
                <Score score={score} />
                <Board onUseBlock={handleBlockUsed} updateScore={updateScore} />
                <div className="block-container">
                    {blocks.map((shape, index) => shape && (
                        <Block
                            key={index}
                            shape={shape}
                            index={index}
                            rotateShape={() => rotateBlock(index)}
                        />
                    ))}
                </div>
            </div>
        </DndProvider>
    );
};

export default App;
