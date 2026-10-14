
import { useState, useEffect } from 'react';

interface ViewportInfo {
  width: number;
  height: number;
  deviceType: 'Phone' | 'Tablet' | 'Desktop';
  platform: 'iOS' | 'Android' | 'Desktop';
}

export const useViewportInfo = (): ViewportInfo => {
  const [viewportInfo, setViewportInfo] = useState<ViewportInfo>({
    width: 0,
    height: 0,
    deviceType: 'Desktop',
    platform: 'Desktop'
  });

  useEffect(() => {
    const updateViewportInfo = () => {
      const width = window.innerWidth;
      const height = window.innerHeight;
      
      // Determine device type based on width
      let deviceType: 'Phone' | 'Tablet' | 'Desktop' = 'Desktop';
      if (width < 768) {
        deviceType = 'Phone';
      } else if (width < 1024) {
        deviceType = 'Tablet';
      }

      // Determine platform
      let platform: 'iOS' | 'Android' | 'Desktop' = 'Desktop';
      const userAgent = navigator.userAgent.toLowerCase();
      
      if (/iphone|ipad|ipod/.test(userAgent)) {
        platform = 'iOS';
      } else if (/android/.test(userAgent)) {
        platform = 'Android';
      }

      setViewportInfo({
        width,
        height,
        deviceType,
        platform
      });
    };

    // Update on mount
    updateViewportInfo();

    // Update on resize
    window.addEventListener('resize', updateViewportInfo);
    
    return () => {
      window.removeEventListener('resize', updateViewportInfo);
    };
  }, []);

  return viewportInfo;
};

