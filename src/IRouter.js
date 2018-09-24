import React from 'react';
import App from './App';
import Login from "./pages/login/index";
import Register from './pages/register/index';
import Admin from "./Admin";
import {HashRouter,Route} from 'react-router-dom';
import Home from "./pages/home";
import AdminInfo from './pages/adminInfo/index'
import DistInfo from './pages/distInfo/index';
import Bar from './pages/echarts/bar/index';
import Line from './pages/echarts/line/index';
import Pie from './pages/echarts/pie/index';
import Permission from'./pages/permission/index';
import Type from './pages/type/index';

import './style/loading.less';
/**
 * 路由配置
 */
export default class IRouter extends React.Component{

    render(){
        return(
            <HashRouter>
                <App>
                        <Route path="/login" component={Login}/>
                        <Route path="/register" component={Register}/>
                        <Route path="/admin" render={() =>
                            <Admin>
                                <Route path="/admin/home" component={Home}/>
                                <Route path="/admin/adminInfo" component={AdminInfo}/>
                                <Route path="/admin/distInfo" component={DistInfo}/>   
                                <Route path="/admin/charts/bar" component={Bar}/>
                                <Route path="/admin/charts/line" component={Line}/>
                                <Route path="/admin/charts/pie" component={Pie}/>
                                <Route path="/admin/permission" component={Permission}/>
                                <Route path="/admin/type" component={Type}/>
                            </Admin>
                        }/>
                </App>
            </HashRouter>
        );
    }
}