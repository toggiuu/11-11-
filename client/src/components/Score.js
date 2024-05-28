// Score.js
import React from 'react';
import './Score.css';

const Score = ({ score }) => {
    return (
        <div className="score">
            <h2>Score: {score}</h2>
        </div>
    );
};

export default Score;
