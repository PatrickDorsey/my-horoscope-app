import React, { useRef } from 'react';
import './ZodiacSign.css'; // Ensure this CSS file includes your styles

const ZodiacSign = ({ sign, onClick, style }) => {
  const nameRef = useRef(null);

  const handleMouseEnter = () => {
    if (nameRef.current) {
      nameRef.current.style.opacity = '1';
    }
  };

  const handleMouseLeave = () => {
    if (nameRef.current) {
      nameRef.current.style.opacity = '0';
    }
  };

  return (
    <div
      className="zodiac-sign"
      onClick={() => onClick(sign)}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      style={style}
    >
      <img
        src={sign.image}
        alt={sign.name}
        className="zodiac-image"
      />
      <div
        className="zodiac-name"
        ref={nameRef}
      >
        {sign.name}
      </div>
    </div>
  );
};

export default ZodiacSign;

  