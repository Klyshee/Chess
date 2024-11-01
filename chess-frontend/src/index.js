import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);


reportWebVitals(console.log);


function saveToLocalStorage(metric) {
  const metrics = JSON.parse(localStorage.getItem('webVitals')) || [];
  metrics.push(metric);
  localStorage.setItem('webVitals', JSON.stringify(metrics));
}



