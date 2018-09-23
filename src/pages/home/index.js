import React from 'react';
import './index.less';
import {Card} from 'antd';
/*
    Home组件结构
 */
export default class Home extends React.Component{
    componentDidMount(){
        //this.renderMap();
    }
    // 渲染地图
    /*renderMap = () => {
        new window.BMap.map("home-wrap", {enableMapClick: false});
    };*/
    render(){
        return(
            <div className="home-wrap">
                nnn
            </div>
        );
    }
}