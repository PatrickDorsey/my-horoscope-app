import React, { useEffect } from 'react';

const TextToSpeech = ({ message }) => {
  useEffect(() => {
    if (message) {
      const speak = (text) => {
        if ('speechSynthesis' in window) {
          const utterance = new SpeechSynthesisUtterance(text);
          speechSynthesis.speak(utterance);
        }
      };

      speak(message);
    }
  }, [message]);

  return null; // This component doesn't render anything visually
};

export default TextToSpeech;

