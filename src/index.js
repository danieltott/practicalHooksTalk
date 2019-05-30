import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { hijackEffects } from 'stop-runaway-react-effects';
import { ApiClientProvider } from './Api';

if (process.env.NODE_ENV !== 'production') {
  hijackEffects({ callCount: 30, timeLimit: 6000 });
}

const rootElement = document.getElementById('root');
ReactDOM.render(
  <ApiClientProvider>
    <App />
  </ApiClientProvider>,
  rootElement
);
