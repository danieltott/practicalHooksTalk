import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { hijackEffects } from 'stop-runaway-react-effects';

if (process.env.NODE_ENV !== 'production') {
  hijackEffects({ callCount: 30, timeLimit: 4000 });
}

const rootElement = document.getElementById('root');
ReactDOM.render(<App />, rootElement);
