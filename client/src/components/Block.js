import React from 'react';
import { useDrag } from 'react-dnd';

const Block = ({ shape, index, rotateShape }) => {
    const [{ isDragging }, drag] = useDrag({
        type: 'block',
        item: { shape, index },
        collect: (monitor) => ({
            isDragging: monitor.isDragging(),
        }),
    });

    const renderShape = () => {
        return shape.map((row, rowIndex) => (
            <div key={rowIndex} style={{ display: 'flex' }}>
                {row.map((cell, colIndex) => (
                    <div key={colIndex} style={{ width: '40px', height: '40px', backgroundColor: cell ? 'blue' : 'transparent', border: cell ? '1px solid black' : 'none' }}></div>
                ))}
            </div>
        ));
    };

    return (
        <div
            ref={drag}
            style={{
                opacity: isDragging ? 0.5 : 1,
                margin: '0 10px',
                cursor: 'move',
                display: 'inline-block',
                userSelect: 'none',
            }}
        >
            {renderShape()}
        </div>
    );
};

export default Block;
