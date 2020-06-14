import React from 'react';
import './Badge.css'

const Badge = ({ discount }) => (
    <span className="badge">
        -{discount}
    </span>
);

export default Badge;