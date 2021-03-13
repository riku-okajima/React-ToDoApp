import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';

//index.htmlのroot要素にAppコンポーネントをエントリポイントに設定
ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);
