import { useEffect, useState } from 'react';

const useWindowWidth = () => {
  const [width, setWidth] = useState(window.innerWidth);

  // for testing
  const updateWidth = () => {
    setWidth(window.innerWidth);
  };

  useEffect(() => {
    window.addEventListener('resize', updateWidth);
    return () => window.removeEventListener('resize', updateWidth);
  }, []);

  return width;
};

export default useWindowWidth;
