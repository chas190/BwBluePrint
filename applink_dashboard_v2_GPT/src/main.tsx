import { createRoot } from 'react-dom/client';

import App from './App';
import { ErrorBoundary } from '@/components/error-boundary';

import './index.css';

if ('serviceWorker' in navigator) {
  window.addEventListener('load', async () => {
    try {
      if (import.meta.env.PROD) {
        await navigator.serviceWorker.register(`${import.meta.env.BASE_URL}sw.js`);
      } else {
        // A cached development module can hide edits and break Vite hot reload.
        const registrations = await navigator.serviceWorker.getRegistrations();
        await Promise.all(registrations.filter((registration) =>
          [registration.active, registration.waiting, registration.installing].some((worker) =>
            worker?.scriptURL === new URL(`${import.meta.env.BASE_URL}sw.js`, window.location.href).href,
          ),
        ).map((registration) => registration.unregister()));
        const keys = await caches.keys();
        await Promise.all(keys.filter((key) => key.startsWith('applink-shell-')).map((key) => caches.delete(key)));
      }
    } catch (error) {
      console.warn('AppLink offline caching is unavailable.', error);
    }
  });
}

createRoot(document.getElementById('root')!, {
  // Keeps caught errors off reportError(), which would raise the dev overlay.
  onCaughtError: (error, errorInfo) => {
    console.error(error, errorInfo.componentStack);
  },
}).render(
  <ErrorBoundary>
    <App />
  </ErrorBoundary>,
);
