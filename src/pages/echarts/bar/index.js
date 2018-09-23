import React from 'react';
import {Card} from 'antd';

import ReactEcharts from 'echarts-for-react';
import echartTheme from '../echartTheme';
// 引入 ECharts 主模块
import echarts from 'echarts/lib/echarts';
// 引入饼图和折线图
import 'echarts/lib/chart/bar';
// 引入提示框和标题组件
import 'echarts/lib/component/tooltip';
import 'echarts/lib/component/title';
import 'echarts/lib/component/legend';
import 'echarts/lib/component/markPoint';

import Axios from './../../../axios/index';

export default class Bar extends React.Component{

    constructor(props) {
        super(props);
        this.state = {
            XData:[],
            BeiData:[],
            DongData:[],
            YiData:[],
        };
    }

    componentDidMount(){
        this.requestList();//请求数据
    }
    //去后台获取数据
    requestList=()=>{
        let _this = this;
        Axios.ajax({
            url:'/telematis/adminDataStatistic/allDataByCondition',
            data:{
                area:'大连',
                countTime:'month',
                store_code:'2000',
                stall_code:'3000'
            }
        },'post',false).then((res)=> {
            let YData=[];
            let BeiData=[];
            let DongData=[];
            let YiData=[];
            res.map((item, index) => {
                item.key = index;
                let data=item.data;
                let beijingHyundai=data.beijingHyundai;
                let dongfengNissan=data.dongfengNissan;
                let fAWVolkswagen=data.beijingHyundai;
                if(beijingHyundai){
                    BeiData.push(beijingHyundai);
                }
                if(dongfengNissan){
                    DongData.push(dongfengNissan);
                }
                if(fAWVolkswagen){
                    YiData.push(fAWVolkswagen);
                } 
                let result=item.result;
                YData.push(result);
            })
            this.setState({
                YData,
                BeiData,
                DongData,
                YiData
            })
            //_this.request();//重新刷新
        })
    }

    componentWillMount(){
        echarts.registerTheme('Telematics',echartTheme);
    }

    getOption(){
        let option = {
            title: {
                text: '销售柱形图'
            },
            tooltip : {
                trigger: 'axis'
            },
            legend:{
                data:[
                    '北京现代',
                    '东风日产',
                    '一汽大众',
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
                    name: '北京现代',
                    type: 'bar',
                    data:this.state.BeiData
                },
                {
                    name: '东风日产',
                    type: 'bar',
                    data:this.state.DongData
                },
                {
                    name: '一汽大众',
                    type: 'bar',
                    data:this.state.YiData
                },
            ]
        }
        return option;
    }
    render(){
        return(
            <div>
                <Card title="各分销商销售柱形图" style={{marginTop:10}}>
                    <ReactEcharts
                        option={this.getOption()}
                        theme="Telematics"
                        notMerge={true}
                        lazyUpdate={true}
                        style={{ height: 500 }}
                    />
                </Card>
            </div>
        );
    }
}
