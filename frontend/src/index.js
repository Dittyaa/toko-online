import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';

// ============================================================
// GOOGLE ANALYTICS SETUP
// Ganti GA_MEASUREMENT_ID di file .env dengan ID dari Google Analytics
// ============================================================
const GA_ID = process.env.REACT_APP_GA_MEASUREMENT_ID;

if (GA_ID) {
  // Inject Google Analytics script ke head
  const script1 = document.createElement('script');
  script1.async = true;
  script1.src = `https://www.googletagmanager.com/gtag/js?id=${GA_ID}`;
  document.head.appendChild(script1);

  const script2 = document.createElement('script');
  script2.innerHTML = `
    window.dataLayer = window.dataLayer || [];
    function gtag(){dataLayer.push(arguments);}
    gtag('js', new Date());
    gtag('config', '${GA_ID}', {
      page_path: window.location.pathname,
      send_page_view: true
    });
  `;
  document.head.appendChild(script2);
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
