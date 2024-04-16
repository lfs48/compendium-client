import React from 'react';
import { createRoot } from 'react-dom/client';
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

  const container = document.getElementById('root') as HTMLElement;
  const root = createRoot(container);
  root.render(
    <Provider store={store}>
      <React.StrictMode>
        <RecoilRoot>
          <App />
        </RecoilRoot>
      </React.StrictMode>
    </Provider>
  )
}

document.addEventListener("DOMContentLoaded", initializeApp);
