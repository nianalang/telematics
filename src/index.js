import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import registerServiceWorker from './registerServiceWorker';
import IRouter from "./IRouter";

ReactDOM.render(<IRouter />, document.getElementById('root'));
registerServiceWorker();
