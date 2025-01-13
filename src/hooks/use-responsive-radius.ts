import { useEffect, useState } from 'react';

interface RadiusConfig {
  base: number;
  md: number;
  lg: number;
}

export const useResponsiveRadius = (config: RadiusConfig) => {
  const [radius, setRadius] = useState(config.base);

  useEffect(() => {
    const updateRadius = () => {
      const width = window.innerWidth;
      if (width >= 1024) {
        setRadius(config.lg);
      } else if (width >= 768) {
        setRadius(config.md);
      } else {
        setRadius(config.base);
      }
    };

    updateRadius();
    window.addEventListener('resize', updateRadius);
    return () => window.removeEventListener('resize', updateRadius);
  }, [config]);

  return radius;
};
