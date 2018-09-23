import React from 'react'
import {Card,Row,Col} from 'antd'
import ReactEcharts from 'echarts-for-react';
import echartTheme from '../echartTheme'
import themeLight from '../themeLight'
// import echarts from 'echarts'
import echarts from 'echarts/lib/echarts'
// 引入饼图和折线图
import 'echarts/lib/chart/pie'
// 引入提示框和标题组件
import 'echarts/lib/component/tooltip';
import 'echarts/lib/component/title';
import 'echarts/lib/component/legend';
import 'echarts/lib/component/markPoint';
import Axios from './../../../axios/index';
export default class Pie extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            XData:[],
            dates:[],
        };
    }


    componentDidMount(){
        this.requestList();//请求数据
    }
    //去后台获取数据
    requestList=()=>{
        let _this = this;
        Axios.ajax({
            url:'/telematis/adminDataStatistic/allDataBySector',
            data:{
                countTime:'month',
                store_code:'2000',
                stall_code:'3000'
            }
        },'post',false).then((res)=> {
            let XData=[];
            let dates=[];
            res.map((item,index)=>{
                let data=item.result;
                XData.push(data);
                dates.push(item.data);
            })
            this.setState({
                XData,
                dates
            })
            //_this.request();//重新刷新
        })
    }

    componentWillMount(){
        echarts.registerTheme('Telematics',themeLight);
    }

    getOption() {
        let data=[];
        let {XData,dates}=this.state;
        dates.map((item,index)=>{
            let object={
                name:XData[index],
                value:item,
            }
            data.push(object)
        })

        let option = {
            title: {
                text: '汽车销售占比一',
                // x : 'center'
            },
            legend : {
                orient: 'vertical',
                right: 10,
                top: 20,
                bottom: 20,
                data: XData,
            },
            tooltip: {
                trigger : 'item',
                formatter : "{a} <br/>{b} : {c} ({d}%)"
            },
            series: [
                {
                    name : '订单量',
                    type : 'pie',
                    radius : '55%',
                    center : [
                        '50%', '60%'
                    ],
                    data:data,
                    itemStyle : {
                        emphasis: {
                            shadowBlur: 10,
                            shadowOffsetX: 0,
                            shadowColor: 'rgba(0, 0, 0, 0.5)'
                        }
                    }
                }
            ]
        }
        return option;
    }

    getOption2() {
        let data=[];
        let {XData,dates}=this.state;
        dates.map((item,index)=>{
            let object={
                name:XData[index],
                value:item,
            }
            data.push(object)
        })

        let option = {
            title: {
                text: '汽车销售占比二',
                // x: 'center'
            },
            legend: {
                orient: 'vertical',
                right: 10,
                top: 20,
                bottom: 20,
                data:XData
            },
            tooltip: {
                trigger: 'item',
                formatter: "{a} <br/>{b} : {c} ({d}%)"
            },
            series: [
                {
                    name: '订单量',
                    type: 'pie',
                    radius: ['40%', '70%'],
                    center: [
                        '50%', '60%'
                    ],
                    data:data,
                    itemStyle: {
                        emphasis: {
                            shadowBlur: 10,
                            shadowOffsetX: 0,
                            shadowColor: 'rgba(0, 0, 0, 0.5)'
                        }
                    }
                }
            ]
        }
        return option;
    }

    getOption3() {
        let data=[];
        let {XData,dates}=this.state;
        dates.map((item,index)=>{
            let object={
                name:XData[index],
                value:item,
            }
            data.push(object)
        })

        let option = {
            title: {
                text: '汽车销售占比三',
                // x: 'center'
            },
            legend: {
                orient: 'vertical',
                right: 10,
                top: 20,
                bottom: 20,
                data: XData
            },
            tooltip: {
                trigger: 'item',
                formatter: "{a} <br/>{b} : {c} ({d}%)"
            },
            series: [
                {
                    name: '订单量',
                    type: 'pie',
                    radius: '55%',
                    center: [
                        '50%', '50%'
                    ],
                    data: data.sort(function (a, b) { return a.value - b.value; }),
                    roseType: 'radius',
                    animationType: 'scale',
                    animationEasing: 'elasticOut',
                    animationDelay: function (idx) {
                        return Math.random() * 200;
                    }
                }
            ]
        }
        return option;
    }

    render() {
        return (
            <div>
                <Row>
                    <Col span={12}>
                        <Card title="汽车销售类型占比" style={{marginTop:10}}>
                            <ReactEcharts
                                option={this.getOption()}
                                theme="Telematics"
                                notMerge={true}
                                lazyUpdate={true}
                                style={{ height: 450 }}/>
                        </Card>
                    </Col>
                    <Col span={12}>
                        <Card title="汽车销售类型占比" style={{marginTop:10}}>
                            <ReactEcharts
                                option={this.getOption2()}
                                theme="Telematics"
                                notMerge={true}
                                lazyUpdate={true}
                                style={{ height: 450 }}/>
                        </Card>
                    </Col>
                </Row>

                <Row>
                    <Card title="汽车销售类型占比" style={{marginTop:10}}>
                        <ReactEcharts
                            option={this.getOption3()}
                            theme="Telematics"
                            notMerge={true}
                            lazyUpdate={true}
                            style={{ height: 450 }}/>
                    </Card>
                </Row>
            </div>
        );
    }
}