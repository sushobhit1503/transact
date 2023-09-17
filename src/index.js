import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { BrowserRouter } from 'react-router-dom';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </React.StrictMode>
);

export const baseUrlDev = `http://localhost:8000`
export const baseUrlProd = `https://transact-backend-node.onrender.com`

export const baseUrl = process.env.NODE_ENV === 'development' ? baseUrlDev : baseUrlProd