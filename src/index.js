import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import './styles.css';
import { hijackEffects } from 'stop-runaway-react-effects';

if (process.env.NODE_ENV !== 'production') {
  hijackEffects();
}

const rootElement = document.getElementById('root');
ReactDOM.render(<App />, rootElement);
