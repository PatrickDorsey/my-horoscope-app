import React, { useEffect, useRef } from 'react';

const TextToSpeech = ({ message, stop }) => {
  const utteranceRef = useRef(null);

  useEffect(() => {
    // When the component mounts or message changes
    if (message) {
      if ('speechSynthesis' in window) {
        // Stop any ongoing speech
        speechSynthesis.cancel();

        // Create a new utterance
        const utterance = new SpeechSynthesisUtterance(message);
        utteranceRef.current = utterance;
        speechSynthesis.speak(utterance);
      }
    }

    return () => {
      // Clean up and stop speech when component unmounts or message changes
      speechSynthesis.cancel();
    };
  }, [message]);

  useEffect(() => {
    // If stop is true, cancel any ongoing speech
    if (stop) {
      speechSynthesis.cancel();
    }
  }, [stop]);

  return null; // This component doesn't render anything visually
};

export default TextToSpeech;
