import React from 'react';

const Block = ({ type }) => {
  return (
    <div className={`block block-${type}`}>
      {/* 블록 렌더링 */}
    </div>
  );
};

export default Block;
