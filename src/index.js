import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import registerServiceWorker from './registerServiceWorker';
import IRouter from "./IRouter";
import {Provider} from 'react-redux'//提供数据源
import configStore from './redux/store/index';

const store=configStore();//调用store

ReactDOM.render(
    <Provider store={store}><IRouter /></Provider>, 
    document.getElementById('root'));
registerServiceWorker();
