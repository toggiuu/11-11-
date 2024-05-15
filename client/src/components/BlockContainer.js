import React, { useState, useEffect } from 'react';
import Block from './Block';
import './BlockContainer.css';

const BlockContainer = ({ onBlockSelect }) => {
  const [blocks, setBlocks] = useState([]);

  const shapes = [
    [[1, 1], [1, 1]], // 2x2 블록
    [[1], [1], [1], [1]], // 4x1 블록
    [[1, 1, 1]], // 1x3 블록
    // 더 많은 모양 추가 가능
  ];

  const createBlocks = () => {
    let newBlocks = [];
    for (let i = 0; i < 5; i++) {
      const shape = shapes[Math.floor(Math.random() * shapes.length)];
      newBlocks.push({
        id: i,
        shape,
      });
    }
    setBlocks(newBlocks);
  };

  useEffect(() => {
    createBlocks();
  }, []);

  return (
    <div className="block-container">
      {blocks.map(block => (
        <div key={block.id} onClick={() => onBlockSelect(block)}>
          <Block block={block} />
        </div>
      ))}
    </div>
  );
};

export default BlockContainer;
