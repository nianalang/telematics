import React from 'react';
import { Row, Col} from 'antd';
import NavLeft from './compotents/NavLeft/index';
import Footer from './compotents/Footer';
import Header from './compotents/Header';
import Home from './pages/home';

import './style/common.less';

/*
    主页面结构
 */
export default class Admin extends React.Component{

    render(){
        return(
                <Row className="container">
                    {/*左侧NavLeft部分*/}
                    <Col span={4} className="nav-left">
                        <NavLeft/>
                    </Col>

                    <Col span={20} className="main">
                       {/* 头部Header*/}
                       <Header/>
                        {/*中间内容区域*/}
                        <Row className="content">
                          <Home/>
                        </Row>
                        {/*底部Footer*/}
                        <Footer/>
                    </Col>
                </Row>
        );
    }
}