import React from 'react';
import clsx from 'clsx';

const PixelButton = ({children, onClick, className, variant = 'primary', disabled}) => {
  return (
    <button
      className={clsx("pixel-btn", `pixel-btn-${variant}`, className)}
      onClick={onClick}
      disabled={disabled}
    >
      {children}
    </button>
  );
};

export default PixelButton;
