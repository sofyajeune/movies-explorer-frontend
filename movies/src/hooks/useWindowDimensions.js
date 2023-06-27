import { useState, useEffect } from 'react';

function getWindowDimensions() {
  const { innerWidth: width, innerHeight: height } = window;
  return {
    width,
    height,
  };
}

export default function useWindowDimensions(callback) {
  const [windowDimensions, setWindowDimensions] = useState(getWindowDimensions());
  let timeout = 1000

  useEffect(() => {
    let timeoutId;

    function handleResize() {
      clearTimeout(timeoutId);
      timeoutId = setTimeout(() => {
        setWindowDimensions(getWindowDimensions());
      }, timeout);
    }

    window.addEventListener('resize', handleResize);

    return () => {
      clearTimeout(timeoutId);
      window.removeEventListener('resize', handleResize);
    };
  }, [timeout]);

  return windowDimensions;
}
