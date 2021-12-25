import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import { Provider } from 'react-redux';
import { configureAppStore } from './store';

async function initializeApp() {

  const preloadedState = {};
  const store = configureAppStore(preloadedState);

  ReactDOM.render(
    <Provider store={store}>
      <React.StrictMode>
        <App />
      </React.StrictMode>
    </Provider>,
  document.getElementById('root')
  )
}

document.addEventListener("DOMContentLoaded", initializeApp);
