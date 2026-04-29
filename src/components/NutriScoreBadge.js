import React from 'react';
import { getNutriScoreColor } from '../utils/api';

/**
 * NutriScore Badge Component
 * Displays the nutritional grade with appropriate color
 */
const NutriScoreBadge = ({ grade }) => {
    if (!grade) return null;

    const color = getNutriScoreColor(grade);
    const gradeUpper = grade.toUpperCase();

    return (
        <div
            className="inline-flex items-center justify-center px-3 py-1 rounded-lg font-bold text-white text-sm shadow-md"
            style={{ backgroundColor: color }}
        >
            <span className="mr-1">Nutri-Score</span>
            <span className="text-lg">{gradeUpper}</span>
        </div>
    );
};

export default NutriScoreBadge;
