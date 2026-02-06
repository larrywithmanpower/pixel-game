import React from 'react';
import clsx from 'clsx';
import '../index.css';

/**
 * A container with a pixel-art border.
 * We can implement this using CSS `box-shadow` or border-image.
 * For simplicity and "NES.css" feel, we can use box-shadows.
 */
const PixelCard = ({children, className, title}) => {
  return (
    <div className={clsx("pixel-card", className)}>
      {title && <h2 className="pixel-card-title">{title}</h2>}
      <div className="pixel-card-content">
        {children}
      </div>
    </div>
  );
};

export default PixelCard;
