import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { hijackEffects } from 'stop-runaway-react-effects';
import { ApiClientProvider } from './Api';
import UserFilterProvider from './UserFilterContext';

if (process.env.NODE_ENV !== 'production') {
  hijackEffects();
}

const rootElement = document.getElementById('root');
ReactDOM.render(
  <ApiClientProvider>
    <UserFilterProvider>
      <App />
    </UserFilterProvider>
  </ApiClientProvider>,
  rootElement
);
