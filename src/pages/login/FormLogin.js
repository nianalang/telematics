import React from 'react';
import {Card,Form,Input,Button,message,Icon,Checkbox} from 'antd';
import  './index.less';
const FormItem=Form.Item;

class FormLogin extends React.Component{

    handleSubmit=()=>{
        let userInfo=this.props.form.getFieldsValue();
        //校验字段
        this.props.form.validateFields((error,valus)=>{
            if(!error){//校验成功
                message.success(`${userInfo.userName}登陆成功，密码为${userInfo.password}`)
            }
        })
    }

    render(){
        const  {getFieldDecorator}=this.props.form;
        return(
            <div>
                <Card title="内联表单">
                    <Form layout="inline">
                        <FormItem>
                           <Input placeholder="请输入用户名"/>
                        </FormItem>
                        <FormItem>
                            <Input placeholder="请输入用密码"/>
                        </FormItem>
                    </Form>
                </Card>

                <Card title="水平表单" style={{marginTop:10}}>
                    <Form className="form-login">
                        <FormItem>
                            {
                                getFieldDecorator('userName',{
                                    initialValue:'念阿郎',
                                    rules:[
                                        {
                                            required:true,
                                            message:'用户名不能为空'
                                        },{
                                            min:4,
                                            max:10,
                                            message:'长度不在范围内'
                                        },{
                                            pattern:/^\w+$/g,
                                            message:'用户名必须为字母或数字'
                                        }
                                    ]
                                })(
                                    <Input prefix={<Icon type="user"/>} placeholder="请输入用户名"/>
                                )
                            }
                        </FormItem>
                        <FormItem>
                            {
                                getFieldDecorator('password',{
                                    initialValue:'123456',
                                    rules:[]
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
                                    <Checkbox>记住密码</Checkbox>
                                )
                            }

                            <a href="##" style={{float:'right'}}>忘记密码</a>
                        </FormItem>


                        <FormItem>
                           <Button onClick={this.handleSubmit}  type="primary" className="form-submit">登陆</Button>
                        </FormItem>
                    </Form>
                </Card>
            </div>
        );
    }
}
export default Form.create()(FormLogin)