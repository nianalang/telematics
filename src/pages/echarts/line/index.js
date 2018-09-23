import React from 'react'
import {Card} from 'antd'
import ReactEcharts from 'echarts-for-react';
import echartTheme from '../echartTheme'
// import echarts from 'echarts'
import echarts from 'echarts/lib/echarts'
// 引入饼图和折线图
import 'echarts/lib/chart/line'
// 引入提示框和标题组件
import 'echarts/lib/component/tooltip';
import 'echarts/lib/component/title';
import 'echarts/lib/component/legend';
import 'echarts/lib/component/markPoint';
import Axios from "../../../axios";
export default class Line extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            XData:[],
            BeiData:[],
            DongData:[],
            YiData:[],
            data:[],
        };
    }

    componentDidMount(){
        this.requestList();//请求数据
    }
    //去后台获取数据
    requestList=()=>{
        let _this = this;
        Axios.ajax({
            url:'/telematis/adminDataStatistic/allDataByArea',
            data:{
                countTime:'month',
                store_code:'2000',
                stall_code:'3000'
            }
        },'post',false).then((res)=> {
            let YData=[];
            let BeiData=[];
            let DongData=[];
            let YiData=[];
            let dates;
            res.map((item, index) => {
                item.key = index;
                let data=item.data;
                dates=data;
                let dongFengNumber=data.dongFengNumber;
                let beiJingNumber=data.beiJingNumber;
                let yiQiNumber=data.yiQiNumber;
                if(dongFengNumber){
                    DongData.push(beiJingNumber);
                }
                if(beiJingNumber){
                    BeiData.push(dongFengNumber);
                }
                if(yiQiNumber){
                    YiData.push(yiQiNumber);
                }
                let result=item.result;
                YData.push(result);
            })
            this.setState({
                YData,
                BeiData,
                DongData,
                YiData,
                dates,
            })
            //_this.request();//重新刷新
        })
    }

    componentWillMount(){
        echarts.registerTheme('Telematics',echartTheme);
    }

    getOption() {
        let option = {
            title: {
                text: '销售折线图'
            },
            tooltip: {
                trigger: 'axis'
            },
            legend:{
                data:[
                '北京现代销售量',
                '东风日产销售量',
                '一汽大众销售量',
            ]
            },
            xAxis: {
                data:this.state.YData
            },
            yAxis: {
                type: 'value'
            },
            series: [
                {
                    name: '北京现代销售量',
                    type: 'line',
                    stack: '总量',
                    data:this.state.BeiData
                },
                {
                    name: '东风日产销售量',
                    type: 'line',
                    stack: '总量',
                    data:this.state.DongData
                },
                {
                    name: '一汽大众销售量',
                    type: 'line',
                    stack: '总量',
                    data:this.state.YiData
                },
            ]
        }
        return option;
    }


    render() {
        return (
            <div>
                <Card title="分销商销售折线图" style={{marginTop:10}}>
                    <ReactEcharts
                        option={this.getOption()}
                        theme="Telematics"
                        notMerge={true}
                        lazyUpdate={true}
                        style={{
                            height: 500
                        }}/>
                </Card>
            </div>
        );
    }
}