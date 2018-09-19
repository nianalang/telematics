import React from 'react';
import { Row, Col} from 'antd';
import './index.less';
import Util from './../../utils/utils'
import Axios from './../../axios/index';
/*
    Header组件结构
 */
export default class Header extends React.Component{

    constructor(props) {
        super(props);
        this.state = {};
    }

    componentWillMount() {
        this.setState({
            userName: '念阿郎'
        })

        setInterval(() => {
            let sysTime = Util.formatDate(new Date().getTime());
            this.setState({
                sysTime
            })
        }, 1000)

        this.getWeatherAPIDate();
    }

    getWeatherAPIDate(){
        let city="大连";
        Axios.jsonp({
            url:'http://api.map.baidu.com/telematics/v3/weather?location='+encodeURIComponent(city)+'&output=json&ak=3p49MVra6urFRGOT9s8UBWr2'
        }).then((res)=>{
            if(res.status=='success'){
                let data=res.results[0].weather_data[0];
                console.log(data.weather);
                this.setState({
                    dayPictureUrl:data.dayPictureUrl,
                    weather:data.weather
                })
            }
        })
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
                        <span className="weather-img">
                            <img src={ this.state.dayPictureUrl }/>
                        </span>
                        <span className="weather-detial">
                            { this.state.weather }
                        </span>
                    </Col>
                </Row>
            </div>
        );
    }
}