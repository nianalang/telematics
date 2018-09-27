import React from 'react'
import {Card,Form,Button,Input,Checkbox,Radio,Select,Switch,DatePicker,TimePicker,Upload,Icon,message, InputNumber} from 'antd'
import Footer from './../../compotents/Footer/index';
import './index.less';

import Axios from './../../axios/index'

import { Redirect } from 'react-router-dom';

import {connect} from 'react-redux';
const FormItem = Form.Item;
const RadioGroup = Radio.Group;
const Option = Select.Option;
const TextArea = Input.TextArea;

class Register extends React.Component{

    state={
        registed:false
    }

    handleSubmit = ()=>{
        let userInfo=this.props.form.getFieldsValue();
        //校验字段
        this.props.form.validateFields((error,valus)=>{
            if(!error){//校验成功
                Axios.ajax(
                    {
                        url:'/telematis/admin/insertAdmin',
                        data:userInfo
                    },
                    'post',false).then((res)=>{
                    let stateInfo=res.stateInfo;
                    if(stateInfo=="添加成功"){
                        this.setState({registed: true});
                    }        
                })
            }
        }) 
    }

    render(){
        const { getFieldDecorator } = this.props.form;

        if(this.state.registed) {
            return (
                <Redirect to="/login"/>
            )
        }
        const formItemLayout = {
            labelCol:{
                xs:50,
                sm:6
            },
            wrapperCol:{
                xs:20,
                sm:16
            }
        }
        return (
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
                            <div className="form-title">用户注册</div>
                            <FormItem label="用户名"  {...formItemLayout}>
                                {
                                    getFieldDecorator('admin_name',{
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
                                        <Input placeholder="请输入用户名"/>
                                    )
                                }
                            </FormItem>
                            <FormItem label="密    码"  {...formItemLayout}>
                                {
                                    getFieldDecorator('admin_password',{
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
                                        <Input  placeholder="请输入密码"/>
                                    )
                                }
                            </FormItem>

                            <FormItem label="店    铺"  {...formItemLayout}>
                                {
                                    getFieldDecorator('store_code', {
                                        initialValue: '2000',
                                        // rules:[
                                        //     {
                                        //         required:true,
                                        //         message:'邮箱不能为空'
                                        //     }]
                                    })(
                                        <Select>
                                            <Option value="2000">辽宁大连汽车制造厂总部</Option>
                                            <Option value="2001">辽宁沈阳汽车制造厂总部</Option>
                                        </Select>
                                    )
                                }
                            </FormItem>

                            <FormItem label="角    色"  {...formItemLayout}>
                                {
                                    getFieldDecorator('role_id', {
                                        initialValue: '10',
                                        // rules:[
                                        // {
                                        //     required:true,
                                        //     message:'邮箱不能为空'
                                        // }]
                                    })(
                                        <Select>
                                            <Option value="10">管理员</Option>
                                            <Option value="11">分销商</Option>
                                        </Select>
                                    )
                                }
                            </FormItem>

                            <FormItem label="邮   箱"  {...formItemLayout}>
                                {
                                    getFieldDecorator('admin_email',{
                                        initialValue:'',
                                        rules:[
                                            {
                                                required:true,
                                                message:'邮箱不能为空'
                                            }, 
                                            {
                                                pattern:/^[A-Za-z\d]+([-_.][A-Za-z\d]+)*@([A-Za-z\d]+[-.])+[A-Za-z\d]{2,4}$/ ,
                                                message:'邮箱格式不正确'
                                            }
                                        ]
                                    })(
                                        <Input  placeholder="请输入邮箱"/>
                                    )
                                }
                            </FormItem>

                            <FormItem>
                                <Button onClick={this.handleSubmit}  type="primary" className="form-submit">注册</Button>
                            </FormItem>
                        </Form>
                    </div>
                </div>
                <Footer/>
            </div>
        );
    }
}
export default Form.create()(Register);