import React from 'react';
import {Card,Form,Input,InputNumber,Select,Checkbox,Radio,Switch,DatePicker,TimePicker,Upload,Icon} from 'antd';
import moment from 'moment';
const FormItem=Form.Item;
const RadioGroup=Radio.Group;
const Option = Select.Option;
const TextArea=Input.TextArea;


class FormRegister extends React.Component{
    state={}
    getBase64 = (img, callback)=>{
        const reader = new FileReader();
        reader.addEventListener('load', () => callback(reader.result));
        reader.readAsDataURL(img);
    }

    handleChange = (info) => {
        if (info.file.status === 'uploading') {
            this.setState({ loading: true });
            return;
        }
        if (info.file.status === 'done') {
            // Get this url from response in real world.
            this.getBase64(info.file.originFileObj, imageUrl => this.setState({
                userImg:imageUrl,
                loading: false,
            }));
        }
    }

    render(){
        const  {getFieldDecorator}=this.props.form;
        const formItemLayout={
            labelCol:{
                xs:24,
                sm:4
            },
            wrapperCol:{
                xs:24,
                sm:12
            }
        }


        const rowObject = {
            minRows: 4, maxRows: 6
        }
        return(
            <div>
                <Card title="注册表单">
                    <Form>
                        <FormItem   label="用户名" {...formItemLayout}>
                            {
                                getFieldDecorator('userName',{
                                    initialValue:'',
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
                                    <Input  placeholder="请输入用户名"/>
                                )
                            }
                        </FormItem >

                        <FormItem label="密码 "  {...formItemLayout}>
                            {
                                getFieldDecorator('password',{
                                    initialValue:'',
                                    rules:[
                                        {
                                            required:true,
                                            message:'密码不能为空'
                                        },{
                                            max:10,
                                            message:'长度不在范围内'
                                        }
                                    ]
                                })(
                                    <Input  placeholder="请输入密码"/>
                                )
                            }
                        </FormItem>

                        <FormItem label="性别"  {...formItemLayout}>
                            {
                                getFieldDecorator('radio',{
                                    initialValue:'1',
                                    rules:[]
                                })(
                                    <RadioGroup>
                                        <Radio value="1">男</Radio>
                                        <Radio  value="2">女</Radio>
                                    </RadioGroup>
                                )
                            }
                        </FormItem>

                        <FormItem label="年龄"  {...formItemLayout}>
                            {
                                getFieldDecorator('age',{
                                    initialValue:'18',
                                })(
                                   <InputNumber/>
                                )
                            }
                        </FormItem>

                        <FormItem label="当前状态"  {...formItemLayout}>
                            {
                                getFieldDecorator('status',{
                                    initialValue:'1',
                                })(
                                    <Select>
                                        <Option value="1">咸鱼一条</Option>
                                        <Option value="2">北京现代</Option>
                                        <Option value="3">百倍端到端</Option>
                                    </Select>
                                )
                            }
                        </FormItem>

                        <FormItem label="爱好"  {...formItemLayout}>
                            {
                                getFieldDecorator('hobby',{
                                    initialValue:'1',
                                })(
                                    <Select mode="multiple">
                                        <Option value="1">咸鱼一条</Option>
                                        <Option value="2">北京现代</Option>
                                        <Option value="3">百倍端到端</Option>
                                    </Select>
                                )
                            }
                        </FormItem>

                        <FormItem label="是否已婚"  {...formItemLayout}>
                            {
                                getFieldDecorator('isMarried',{
                                    valuePropName:'checked',
                                    initialValue:true,
                                })(
                                    <Switch/>
                                )
                            }
                        </FormItem>


                        <FormItem label="生日"  {...formItemLayout}>
                            {
                                getFieldDecorator('birthday',{
                                    initialValue:moment("2018-08-08")
                                })(
                                    <DatePicker
                                        showTime
                                        formate="YYYY-MM-DD HH:mm:ss"
                                    />
                                )
                            }
                        </FormItem>


                        <FormItem label="联系地址"  {...formItemLayout}>
                            {
                                getFieldDecorator('address',{
                                    initialValue:''
                                })(
                                    <TextArea
                                       autoSize={
                                           rowObject
                                       }
                                    />
                                )
                            }
                        </FormItem>



                        <FormItem label="早起时间"  {...formItemLayout}>
                            {
                                getFieldDecorator('time',{
                                    initialValue:''
                                })(
                                   <TimePicker/>
                                )
                            }
                        </FormItem>


                        <FormItem label="头像"  {...formItemLayout}>
                            {
                                getFieldDecorator('upload',{
                                    initialValue:''
                                })(
                                   <Upload
                                            listType="picture-card"
                                            showUploadList={false}
                                            action="//jsonplaceholder.typicode.com/posts/"
                                            onChange={this.handleChange}>

                                       {this.state.userImg?<img src={this.state.userImg}/>:<Icon type="plus"/>}
                                   </Upload>
                                )
                            }
                        </FormItem>
                    </Form>
                </Card>
            </div>
        );
    }
}
export default Form.create()(FormRegister)