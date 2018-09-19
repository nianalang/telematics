import React from 'react';
import './index.less';
import {Card} from 'antd';
/*
    Home组件结构
 */
export default class Home extends React.Component{
    map = {}
    componentDidMount(){
        this.renderMap();
    }

    renderMap  () {
        new window.BMap.Map("home-wrap", {enableMapClick: false});
        this.addMapControl();
    }
    // 添加地图控件
    addMapControl = () => {
        let map = this.map;
        // 左上角，添加比例尺
        var top_right_control = new window.BMap.ScaleControl({anchor: window.BMAP_ANCHOR_TOP_RIGHT});
        var top_right_navigation = new window.BMap.NavigationControl({anchor: window.BMAP_ANCHOR_TOP_RIGHT});
        //添加控件和比例尺
        map.addControl(top_right_control);
        map.addControl(top_right_navigation);
        map.enableScrollWheelZoom(true);
        // legend.addLegend(map);
    };

    render(){
        return(
            <div className="home-wrap">

            </div>
        );
    }
}