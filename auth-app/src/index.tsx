import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import "@arcgis/core/assets/esri/themes/light/main.css";
import reportWebVitals from './reportWebVitals';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);


const { search } = window.location;
const configParamRegex = /config=([\w-]+)/;
const configFile = search.match(configParamRegex)
  ? RegExp.$1 + ".json"
  : "./config.json";

fetch(configFile)
  .then((r) => r.json())
  .then((json) => {
    let config = json;
    root.render(
      //<React.StrictMode>
        <App config={config} />
      //</React.StrictMode>
    );
  });

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
//reportWebVitals();
