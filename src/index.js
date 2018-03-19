import 'bootstrap/dist/css/bootstrap.css';
import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
// NOTE: Not using service worker during development because current versions
//       of Chrome and FireFox fail to load updated .js files
// import registerServiceWorker from './registerServiceWorker';
import { BrowserRouter } from 'react-router-dom';
import 'font-awesome/css/font-awesome.min.css';
import 'react-bootstrap-toggle/dist/bootstrap2-toggle.css';
import 'react-select/dist/react-select.css';

/**
 * Renders the whole app.
 * @returns {jsx} component html code
 */
ReactDOM.render((
  <BrowserRouter>
    <App />
  </BrowserRouter>
), document.getElementById('root'));

// NOTE: Not using service worker during development because current versions
//       of Chrome and FireFox fail to load updated .js files
// registerServiceWorker();
