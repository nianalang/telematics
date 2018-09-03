import React from 'react';
import App from './App';
import Login from "./pages/login";
import Admin from "./Admin";
import {HashRouter,Route,Switch} from 'react-router-dom';
import Home from "./pages/home";

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
                            </Admin>
                        }/>
                </App>
            </HashRouter>
        );
    }
}