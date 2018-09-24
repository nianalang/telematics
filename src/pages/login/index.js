import React from 'react';
import {Form,Input,Button,message,Icon,Checkbox} from 'antd';
import  './index.less';
import Footer from './../../compotents/Footer/index';
import Axios from './../../axios/index'

import { Redirect } from 'react-router-dom';

import {connect} from 'react-redux';
import {login} from './../../redux/action';

const FormItem=Form.Item;

/**
 * 登录页面
 */
class Login extends React.Component{

    state={
        logined:false
    }

    handleSubmit=()=>{
        let _this=this;
        let userInfo=this.props.form.getFieldsValue();
        //校验字段
        this.props.form.validateFields((error,valus)=>{
            if(!error){//校验成功
                let admin_name=userInfo.userName;
                let admin_password=userInfo.password;
                //message.success(`${userInfo.userName}登陆成功，密码为${userInfo.password}`)
                Axios.ajax(
                    {
                        url:'/telematis/admin/findAdmin',
                        data:{
                            admin_name,
                            admin_password
                        }
                    },
                    'post',false).then((res)=>{
                    let stateInfo=res.stateInfo;

                    const { dispatch } = _this.props;
                    let admin=res.admin;
                    //页面跳转
                    let distributor=res.distributor;
                    if(admin){
                        dispatch(login(admin));
                    }else{
                        dispatch(login(distributor));
                    }
                    message.success(stateInfo);

                    this.setState({logined: true});
                })
            }
        })
    }

    render(){
        const  {getFieldDecorator}=this.props.form;
        if(this.state.logined) {
            return (
                <Redirect to="/admin/home"/>
            )
        }

        return(
            <div className="login-page">
                <div className="login-header">
                    <div className="login-logo">
                        <img src="/assets/logo-ant.svg" alt="慕课后台管理系统"/>
                        React全家桶+AntD  车联网后台管理系统
                    </div>
                </div>

                <div  className="login-box">
                    <div className="login-content">
                        <Form className="form-login">
                            <div className="form-title">用户登录</div>
                            <FormItem>
                                {
                                    getFieldDecorator('userName',{
                                        initialValue:'',
                                        rules:[
                                            {
                                                required:true,
                                                message:'用户名不能为空'
                                            },{
                                                min:3,
                                                max:18,
                                                message:'长度不在范围内'
                                            },
                                            // {
                                            //     pattern:/^\w+$/g,
                                            //     message:'用户名必须为字母或数字'
                                            // }
                                        ]
                                    })(
                                        <Input prefix={<Icon type="user"/>} placeholder="请输入用户名"/>
                                    )
                                }
                            </FormItem>
                            <FormItem>
                                {
                                    getFieldDecorator('password',{
                                        initialValue:'',
                                        rules:[
                                            {
                                                required:true,
                                                message:'密码不能为空'
                                            },{
                                                min:2,
                                                max:18,
                                                message:'长度不在范围内'
                                            }
                                        ]
                                    })(
                                        <Input  placeholder="请输入用密码" prefix={<Icon type="lock"/>}/>
                                    )
                                }
                            </FormItem>

                            <FormItem>
                                {
                                    getFieldDecorator('remember',{
                                        valuePropName:'checked',
                                        initialValue:true
                                    })(
                                        <Checkbox  style={{float:'left'}}>记住密码</Checkbox>
                                    )
                                }

                                <a href="##" style={{float:'right'}}>忘记密码?</a>
                            </FormItem>

                            <FormItem>
                                <Button onClick={this.handleSubmit}  type="primary" className="form-submit">登陆</Button>
                            </FormItem>
                        </Form>
                    </div>
                </div>
                <Footer/>
            </div>
        );
    }
}
Login=  Form.create()(Login);

export default connect() (Login);

