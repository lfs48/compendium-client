import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import { Provider } from 'react-redux';
import { configureAppStore } from './store';
import { RecoilRoot } from 'recoil';

async function initializeApp() {

  const preloadedState = {};
  const store = configureAppStore(preloadedState);

  document.addEventListener("dragstart", function( event ) {
    var img = new Image();
    event.dataTransfer?.setDragImage(img, 0, 0);
  }, false);

  ReactDOM.render(
    <Provider store={store}>
      <React.StrictMode>
        <RecoilRoot>
          <App />
        </RecoilRoot>
      </React.StrictMode>
    </Provider>,
  document.getElementById('root')
  )
}

document.addEventListener("DOMContentLoaded", initializeApp);
