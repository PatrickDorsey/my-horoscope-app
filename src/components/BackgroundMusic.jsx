import React, { useRef, useEffect } from 'react';

const BackgroundMusic = ({ play }) => {
  const audioRef = useRef(null);

  useEffect(() => {
    if (audioRef.current) {
      if (play) {
        audioRef.current.play();
      } else {
        audioRef.current.pause();
        audioRef.current.currentTime = 0; // Reset the audio to start
      }
    }
  }, [play]);

  return (
    <audio ref={audioRef} loop>
      <source src="/Music.mp3" type="audio/mpeg" />
      Your browser does not support the audio element.
    </audio>
  );
};

export default BackgroundMusic;


