import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import App from './App';
import { AuthProvider } from './contexts/AuthContext';
import { ThemeProvider } from './contexts/ThemeContext';
import { setupMockServer } from './api/mockServer';
import { registerServiceWorker } from './registerServiceWorker';
import './styles.css';

if (import.meta.env.DEV) {
  setupMockServer();
}

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <BrowserRouter>
      <ThemeProvider>
        <AuthProvider>
          <App />
        </AuthProvider>
      </ThemeProvider>
    </BrowserRouter>
  </React.StrictMode>
);

if (import.meta.env.PROD) {
  registerServiceWorker();
}
