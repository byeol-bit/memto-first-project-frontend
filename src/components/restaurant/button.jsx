import React from 'react';

const Button = ({ children, onClick, type = "button", className = "" }) => {
  return (
    <button
      type={type}
      onClick={onClick}
      className={`bg-red-400 text-white font-bold py-2 px-6 rounded-full transition-colors ${className}`}
    >
      {children}
    </button>
  );
};

export default Button;