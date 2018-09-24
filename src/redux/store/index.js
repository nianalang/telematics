/**
 * 引入createStore 固定方法
 * store引入reducer,action触发reducer
 */
import {createStore} from 'redux';
import reducer from './../reducer';

export default ()=>createStore(reducer);