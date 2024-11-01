import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './components/app/App.tsx';
import './index.css';
import eruda from 'eruda';

eruda.init();

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>
);
