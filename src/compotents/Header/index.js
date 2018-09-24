import React from 'react';
import { Row, Col,Modal} from 'antd';
import './index.less';
import Util from './../../utils/utils'
import Axios from './../../axios/index';
import {connect} from 'react-redux';
import { Redirect } from 'react-router-dom';

/*
    Header组件结构
 */
class Header extends React.Component{

    constructor(props) {
        super(props);
        this.state = {
            userName:'',
            showModal:false,
            redirect:false
        };
    }

    componentWillMount() {
        const {admin_name,dist_name}=this.props;
        if(admin_name){//管理员登陆
            this.setState({
                userName:admin_name
            })
        }else{
            this.setState({
                userName:dist_name
            })
        }
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

    handleClick=()=>{
        this.setState({
            showModal:true
        })
    }

    render(){
        if(this.state.redirect) {
            return (
                <Redirect to="/login"/>
            )
        }
        return(
            <div className="header">
                <Row className="header-top">
                    <Col span={24}>
                        <span>欢迎您，{this.state.userName}</span>
                        {/*<NavLink to='/login'>退出</NavLink>*/}
                        <a onClick={this.handleClick}>退出</a>
                    </Col>
                </Row>
                <Row className="breadcrumb">
                    <Col span={4}  className="breadcrumb-title">
                        {this.props.menuName}
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

                <Modal
                    title="确认框"
                    visible={this.state.showModal}
                    onCancel={()=>{
                        this.setState({
                            showModal:false
                        })
                    }}
                    onOk={()=>{
                        this.setState({
                            showModal:false,
                            redirect:true,
                        })
                    }}
                >
                    <p>确定要退出吗</p>
                </Modal>
            </div>
        );
    }
}

const maptateToProps=state=>{
    return{
        menuName:state.menuName,
        admin_name:state.admin_name,
        dist_name:state.dist_name,
    }
}

export default connect(maptateToProps)(Header);