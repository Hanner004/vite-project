import VersionDisplay from './components/VersionDisplay/VersionDisplay.jsx';
import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx';

//bootstrap and font-awesome
import 'bootstrap/dist/css/bootstrap.min.css';
import '@fortawesome/fontawesome-free/css/all.min.css';
import 'bootstrap/dist/js/bootstrap.bundle';

const webVersion = '1.0.0';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
    <VersionDisplay version={webVersion} />
  </React.StrictMode>,
);
