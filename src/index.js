import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import TimeAgo from 'javascript-time-ago'
import en from 'javascript-time-ago/locale/en'

import { store } from './redux/store';
import './index.css';
import App from './App/App';
import reportWebVitals from './reportWebVitals';

TimeAgo.addDefaultLocale(en)

ReactDOM.render(
  <Provider store={store}>
    <React.StrictMode>
      <App />
    </React.StrictMode>
  </ Provider>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
