import React from 'react';
import App from './App';
import Login from "./pages/login/index";
import Admin from "./Admin";
import {HashRouter,Route,Switch} from 'react-router-dom';
import Home from "./pages/home";
import AdminInfo from './pages/adminInfo/index'
import DistInfo from './pages/distInfo/index';
import Bar from './pages/echarts/bar/index';
import './style/loading.less';
/**
 * 登录页面
 */
export default class IRouter extends React.Component{

    render(){
        return(
            <HashRouter>
                <App>
                        <Route path="/login" component={Login}/>
                        <Route path="/admin" render={() =>
                            <Admin>
                                <Route path="/admin/home" component={Home}/>
                                <Route path="/admin/adminInfo" component={AdminInfo}/>
                                <Route path="/admin/distInfo" component={DistInfo}/>   
                                <Route path="/admin/charts/bar" component={Bar}/>                                      
                            </Admin>
                        }/>
                </App>
            </HashRouter>
        );
    }
}