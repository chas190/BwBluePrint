import { useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie';

const LAST_ROUTE_KEY = 'bucksup_last_route';
const ROUTE_HISTORY_KEY = 'bucksup_route_history';

export const useRouteTracking = () => {
  const location = useLocation();
  const navigate = useNavigate();

  // Track current route
  useEffect(() => {
    const currentPath = location.pathname;
    
    // Don't track auth routes or redirect loops
    if (currentPath !== '/auth' && currentPath !== '/') {
      Cookies.set(LAST_ROUTE_KEY, currentPath, { expires: 30 });
      
      // Also keep a route history in localStorage for quick access
      const history = JSON.parse(localStorage.getItem(ROUTE_HISTORY_KEY) || '[]');
      const updatedHistory = [currentPath, ...history.filter(path => path !== currentPath)].slice(0, 5);
      localStorage.setItem(ROUTE_HISTORY_KEY, JSON.stringify(updatedHistory));
    }
  }, [location.pathname]);

  const getLastRoute = () => {
    return Cookies.get(LAST_ROUTE_KEY) || '/main';
  };

  const navigateToLastRoute = () => {
    const lastRoute = getLastRoute();
    navigate(lastRoute);
  };

  const clearRouteHistory = () => {
    Cookies.remove(LAST_ROUTE_KEY);
    localStorage.removeItem(ROUTE_HISTORY_KEY);
  };

  return {
    getLastRoute,
    navigateToLastRoute,
    clearRouteHistory,
    currentRoute: location.pathname
  };
};

