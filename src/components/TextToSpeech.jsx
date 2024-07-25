import React, { useEffect, useRef } from 'react';

const TextToSpeech = ({ message, stop }) => {
  const utteranceRef = useRef(null);

  useEffect(() => {
    if (stop) {
      
      if (utteranceRef.current) {
        speechSynthesis.cancel();
        utteranceRef.current = null;
      }
      return;
    }

    if (message) {
      
      speechSynthesis.cancel();

      
      const utterance = new SpeechSynthesisUtterance(message);
      utteranceRef.current = utterance;
      speechSynthesis.speak(utterance);

     
      utterance.onend = () => {
        if (utteranceRef.current === utterance) {
          utteranceRef.current = null;
        }
      };

 
      utterance.onerror = (e) => {
        console.error('Speech synthesis error:', e);
      };
    }

    
    return () => {
      if (utteranceRef.current) {
        speechSynthesis.cancel();
      }
    };
  }, [message, stop]);

  return null; 
};

export default TextToSpeech;






