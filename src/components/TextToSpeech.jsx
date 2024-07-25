import React, { useEffect, useRef } from 'react';

const TextToSpeech = ({ message, stop }) => {
  const utteranceRef = useRef(null);
  const previousMessageRef = useRef('');

  useEffect(() => {
    if (message && message !== previousMessageRef.current) {
      if ('speechSynthesis' in window) {
        // Stop any ongoing speech
        speechSynthesis.cancel();

        // Create a new utterance
        const utterance = new SpeechSynthesisUtterance(message);
        utteranceRef.current = utterance;
        speechSynthesis.speak(utterance);

        // Update the previous message reference
        previousMessageRef.current = message;
      }
    }

    return () => {
      // Clean up and stop speech when component unmounts or message changes
      speechSynthesis.cancel();
    };
  }, [message]);

  useEffect(() => {
    if (stop) {
      speechSynthesis.cancel();
    }
  }, [stop]);

  return null; // This component doesn't render anything visually
};

export default TextToSpeech;
