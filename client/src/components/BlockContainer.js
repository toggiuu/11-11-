import React from 'react';
import Block from './Block';
import './BlockContainer.css';

const BlockContainer = ({ blocks }) => {
    return (
        <div className="block-container">
            {blocks.map((block, index) => (
                <Block key={index} shape={block} />
            ))}
        </div>
    );
};

export default BlockContainer;
