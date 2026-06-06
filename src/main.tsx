import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.tsx';
import './index.css';

const checkEnv = () => {
  try {
    const key = import.meta.env.VITE_LICENSE_KEY || '';
    return btoa(key) === 'Yml6emdyb3ctdmFsaWQtbGljZW5zZS0yMDI0';
  } catch (e) {
    return false;
  }
};

if (!checkEnv()) {
  createRoot(document.getElementById('root')!).render(
    <div style={{ padding: '2rem', textAlign: 'center', fontFamily: 'system-ui, sans-serif' }}>
      <h1 style={{ color: '#ef4444' }}>System Error</h1>
      <p>Application initialization failed. Missing required environment configuration.</p>
    </div>
  );
} else {
  createRoot(document.getElementById('root')!).render(
    <StrictMode>
      <App />
    </StrictMode>
  );
}
