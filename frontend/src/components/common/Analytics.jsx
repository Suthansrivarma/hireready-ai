import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

export default function Analytics() {
  const location = useLocation();
  const gaId = import.meta.env.VITE_GA_MEASUREMENT_ID || '';

  useEffect(() => {
    if (gaId && window.gtag) {
      window.gtag('config', gaId, {
        page_path: location.pathname + location.search
      });
    }
  }, [location, gaId]);

  return null;
}
