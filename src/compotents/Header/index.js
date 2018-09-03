import React from 'react';
import { Row, Col} from 'antd';
import './index.less';
import Util from './../../utils/utils'

/*
    Header组件结构
 */
export default class Header extends React.Component{
    state={}
    componentWillMount(){
       this.setState=({
           userName:'念阿郎'
       })
       setInterval(()=>this.tick(),1000)
    }

    tick(){
        let sysTime = Util.formatDate(new Date().getTime());
        this.setState({
            sysTime
        });
    }
    render(){
        return(
            <div className="header">
                <Row className="header-top">
                    <Col span={24}>
                        <span>欢迎您，{this.state.userName}</span>
                        <a href="##" alt="">退出</a>
                    </Col>
                </Row>
                <Row className="breadcrumb">
                    <Col span={4}  className="breadcrumb-title">
                        首页
                    </Col>
                    <Col span={20} className="weather">
                        <span className="weather-title">{this.state.sysTime}</span>
                        <span>晴转多云</span>
                    </Col>
                </Row>
            </div>
        );
    }
}