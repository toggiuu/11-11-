import React, { useState, useEffect } from 'react';
import Board from './components/Board';
import Block from './components/Block';
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

    const generateRandomBlocks = () => {
        const randomShapes = [];
        for (let i = 0; i < 3; i++) {
            const randomShape = shapes[Math.floor(Math.random() * shapes.length)];
            randomShapes.push(randomShape);
        }
        return randomShapes;
    };

    const [blocks, setBlocks] = useState(generateRandomBlocks());

    const handleBlockUsed = (index) => {
        const newBlocks = [...blocks];
        newBlocks[index] = null;
        setBlocks(newBlocks);
    };

    useEffect(() => {
        if (blocks.every(block => block === null)) {
            setBlocks(generateRandomBlocks());
        }
    }, [blocks]);

    return (
        <DndProvider backend={HTML5Backend}>
            <div className="app">
                <h1>11-11 Game</h1>
                <Board onUseBlock={handleBlockUsed} />
                <div className="block-container">
                    {blocks.map((shape, index) => shape && (
                        <Block key={index} shape={shape} index={index} />
                    ))}
                </div>
            </div>
        </DndProvider>
    );
};

export default App;
