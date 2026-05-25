export function registerServiceWorker() {
  if ('serviceWorker' in navigator) {
    navigator.serviceWorker
      .register('/service-worker.js')
      .then((registration) => {
        console.log('Service worker registered:', registration.scope);
      })
      .catch((error) => {
        console.warn('Service worker registration failed:', error);
      });
  }
}
