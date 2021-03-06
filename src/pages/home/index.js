import React from 'react';
import './index.less';

import echarts from 'echarts';

import '../../../node_modules/echarts/map/js/china';
import '../../../node_modules/echarts/map/js/province/anhui';
import '../../../node_modules/echarts/map/js/province/aomen';
import '../../../node_modules/echarts/map/js/province/beijing';

import {Card} from 'antd';

/*
    Home组件结构
 */
export default class Home extends React.Component{

    componentDidMount() {
        this.createMap();
    }

    //初始化地图
    createMap = () => {
        const myChart = echarts.init(document.getElementById('map'));
        const option = {
            title : {
                text: '车辆销售区域',
                left: 'center'
            },
            tooltip : {
                trigger: 'item'
            },
            legend: {
                orient: 'vertical',
                left: 'left',
                data:['北京现代','东风日产','一汽大众']
            },
            visualMap: {
                min: 0,
                max: 2500,
                left: 'left',
                top: 'bottom',
                text:['高','低'],           // 文本，默认为数值文本
                calculable : true
            },
            toolbox: {
                show: true,
                orient : 'vertical',
                left: 'right',
                top: 'center',
                feature : {
                    mark : {show: true},
                    dataView : {show: true, readOnly: false},
                    restore : {show: true},
                    saveAsImage : {show: true}
                }
            },
            series : [
                {
                    name: '北京现代',
                    type: 'map',
                    mapType: 'china',
                    roam: false,
                    label: {
                        normal: {
                            show: false
                        },
                        emphasis: {
                            show: true
                        }
                    },
                    data:[
                        {name: '辽宁',value: Math.round(Math.random()*1000)},
                        // {name: '天津',value: Math.round(Math.random()*1000)},
                        // {name: '上海',value: Math.round(Math.random()*1000)},
                        // {name: '重庆',value: Math.round(Math.random()*1000)},
                        // {name: '河北',value: Math.round(Math.random()*1000)},
                        // {name: '河南',value: Math.round(Math.random()*1000)},
                        // {name: '云南',value: Math.round(Math.random()*1000)},
                        // {name: '辽宁',value: Math.round(Math.random()*1000)},
                        // {name: '黑龙江',value: Math.round(Math.random()*1000)},
                        // {name: '湖南',value: Math.round(Math.random()*1000)},
                        // {name: '安徽',value: Math.round(Math.random()*1000)},
                        // {name: '山东',value: Math.round(Math.random()*1000)},
                        // {name: '新疆',value: Math.round(Math.random()*1000)},
                        // {name: '江苏',value: Math.round(Math.random()*1000)},
                        // {name: '浙江',value: Math.round(Math.random()*1000)},
                        // {name: '江西',value: Math.round(Math.random()*1000)},
                        // {name: '湖北',value: Math.round(Math.random()*1000)},
                        // {name: '广西',value: Math.round(Math.random()*1000)},
                        // {name: '甘肃',value: Math.round(Math.random()*1000)},
                        // {name: '山西',value: Math.round(Math.random()*1000)},
                        // {name: '内蒙古',value: Math.round(Math.random()*1000)},
                        // {name: '陕西',value: Math.round(Math.random()*1000)},
                        // {name: '吉林',value: Math.round(Math.random()*1000)},
                        // {name: '福建',value: Math.round(Math.random()*1000)},
                        // {name: '贵州',value: Math.round(Math.random()*1000)},
                        // {name: '广东',value: Math.round(Math.random()*1000)},
                        // {name: '青海',value: Math.round(Math.random()*1000)},
                        // {name: '西藏',value: Math.round(Math.random()*1000)},
                        // {name: '四川',value: Math.round(Math.random()*1000)},
                        // {name: '宁夏',value: Math.round(Math.random()*1000)},
                        // {name: '海南',value: Math.round(Math.random()*1000)},
                        // {name: '台湾',value: Math.round(Math.random()*1000)},
                        // {name: '香港',value: Math.round(Math.random()*1000)},
                        // {name: '澳门',value: Math.round(Math.random()*1000)}
                    ]
                },
                {
                    name: '东风日产',
                    type: 'map',
                    mapType: 'china',
                    label: {
                        normal: {
                            show: false
                        },
                        emphasis: {
                            show: true
                        }
                    },
                    data:[
                        {name: '辽宁',value: Math.round(Math.random()*1000)},
                        // {name: '天津',value: Math.round(Math.random()*1000)},
                        // {name: '上海',value: Math.round(Math.random()*1000)},
                        // {name: '重庆',value: Math.round(Math.random()*1000)},
                        // {name: '河北',value: Math.round(Math.random()*1000)},
                        // {name: '安徽',value: Math.round(Math.random()*1000)},
                        // {name: '新疆',value: Math.round(Math.random()*1000)},
                        // {name: '浙江',value: Math.round(Math.random()*1000)},
                        // {name: '江西',value: Math.round(Math.random()*1000)},
                        // {name: '山西',value: Math.round(Math.random()*1000)},
                        // {name: '内蒙古',value: Math.round(Math.random()*1000)},
                        // {name: '吉林',value: Math.round(Math.random()*1000)},
                        // {name: '福建',value: Math.round(Math.random()*1000)},
                        // {name: '广东',value: Math.round(Math.random()*1000)},
                        // {name: '西藏',value: Math.round(Math.random()*1000)},
                        // {name: '四川',value: Math.round(Math.random()*1000)},
                        // {name: '宁夏',value: Math.round(Math.random()*1000)},
                        // {name: '香港',value: Math.round(Math.random()*1000)},
                        // {name: '澳门',value: Math.round(Math.random()*1000)}
                    ]
                },
                {
                    name: '一汽大众',
                    type: 'map',
                    mapType: 'china',
                    label: {
                        normal: {
                            show: false
                        },
                        emphasis: {
                            show: true
                        }
                    },
                    data:[
                        {name: '辽宁',value: Math.round(Math.random()*1000)},
                        // {name: '天津',value: Math.round(Math.random()*1000)},
                        // {name: '上海',value: Math.round(Math.random()*1000)},
                        // {name: '广东',value: Math.round(Math.random()*1000)},
                        // {name: '台湾',value: Math.round(Math.random()*1000)},
                        // {name: '香港',value: Math.round(Math.random()*1000)},
                        // {name: '澳门',value: Math.round(Math.random()*1000)}
                    ]
                }
            ]
        };
        myChart.setOption(option, true);
    };

render(){
        return(
            <Card style={{marginTop:10}} title="全国地区车辆销售图">
                <div id="map"/>
            </Card>
        );
    }
}