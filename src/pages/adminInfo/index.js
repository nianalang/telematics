import React from 'react';
import {Button,Card,Form,Input,DatePicker,Table,Modal,message} from 'antd';
import Axios from './../../axios/index';
import './index.less'

const FormItem=Form.Item;

//管理员信息查询
class AdminInfo extends React.Component{
    //初始化数据
    constructor(props) {
        super(props);
        this.state = {
            dataSource:[]
        };
    }

    params = {

    }

    componentDidMount(){
        this.requestList();//请求数据
    }

    //去后台获取数据
    requestList=()=>{
        Axios.ajax({
            url:'/admin/findAllAdmin',
            data:{
                param:{
                    pageNum:1,
                    pageSize:2
                }
            }
        },'get',false).then((res)=> {
            res.map((item, index) => {
                item.key = index;
            })
            this.setState({
                dataSource:res
            })
        })
    }
    //创建、删除
    handleOperator=(type)=>{
        let item = this.state.selectedRows;//获取选中的那一行
        //let len=item.length;
        if(type =='create'){
            this.setState({
                title:'创建员工',
                isVisible:true,
                type
            })
        }else if(type=="edit" || type=='detail'){
            if(!item){
                Modal.info({
                    title: '信息',
                    content: '请选择一个用户'
                })
                return;
            }
            this.setState({
                title:type=='edit'?'编辑用户':'查看详情',
                isVisible:true,
                userInfo:item[0],
                type
            })
        }else if(type=="delete") {
            if (!item) {
                Modal.info({
                    title: '信息',
                    content: '请选择一个用户'
                })
                return;
            }
        }
    }

    //用户提交触发的函数
    handleSubmit=()=>{
        let type = this.state.type;//类型
        let data = this.userForm.props.form.getFieldsValue();//获取表单的值
        //发送请求
        if(type=='create'){
            Axios.ajax({
                url:'/admin/insertAdmin',
                data:{
                    params:data
                }
            },'post',false).then((res)=>{
                message.success(res);
                this.request();//重新刷新
            })
        }
    }

    render(){
        const columns=[
            {
                title:'管理员id',
                key:'admin_id',
                dataIndex:'admin_id'
            },
            {
                title:'电话',
                key:'admin_phone',
                dataIndex:'admin_phone'
            },
            {
                title:'密码',
                key:'admin_password',
                dataIndex:'admin_password'
            },
            {
                title:'邮件',
                key:'admin_email',
                dataIndex:'admin_email'
            }
        ]

        const  {getFieldDecorator}=this.props.form;
        const selectedRowKeys=this.state.selectedRowKeys;
        const rowCheckSelection={
            type:'checkbox',
            selectedRowKeys,
            onChange:(selectedRowKeys,selectedRows)=>{
                this.setState({
                    selectedRowKeys,
                    selectedRows
                })
            }
        }
        return(
            <div>
                {/*条件查询部分*/}
                <Card>
                    <Form layout="inline">
                        <FormItem label="用户名">
                            {
                                getFieldDecorator("admin_phone",{
                                    initialValue:'',
                                })(
                                    <Input  placeholder="请输入用户名"/>
                                )
                            }
                        </FormItem>

                        <FormItem label="时间">
                            {
                                getFieldDecorator('begin_time')(
                                    <DatePicker showTime={true} placeholder="选择开始时间" format="YYYY-MM-DD HH:mm:ss"/>
                                )
                            }
                        </FormItem>

                        <FormItem label="~" colon={false} >
                            {
                                getFieldDecorator('end_time')(
                                    <DatePicker showTime={true} placeholder="选择结束时间" format="YYYY-MM-DD HH:mm:ss" />
                                )
                            }
                        </FormItem>

                        <FormItem>
                            <Button type="primary" className="button">查询</Button>
                        </FormItem>
                    </Form>
                </Card>
                {/*内容主题部分*/}
                <Card style={{marginTop:10}}>
                    <Form layout="inline">
                        <FormItem>
                            <Button type="primary"  className="button" onClick={()=>this.handleOperator('create')}>创建管理员</Button>
                        </FormItem>
                        <FormItem>
                            <Button type="primary"  className="button" onClick={()=>this.handleOperator('edit')}>编辑管理员</Button>
                        </FormItem>
                        <FormItem>
                            <Button type="primary"  className="button" onClick={()=>this.handleOperator('detail')}>管理员详情</Button>
                        </FormItem>
                        <FormItem>
                            <Button type="danger"  className="button" onClick={()=>this.handleOperator('delete')}>删除管理员</Button>
                        </FormItem>
                    </Form>

                    <Table
                        style={{marginTop:10}}
                        columns={columns}//表头
                        dataSource={this.state.dataSource}//数据
                        rowSelection={rowCheckSelection}//多选按钮
                    />
                </Card>

                {/*显示模态框*/}
                <Modal
                    title={this.state.title}
                    visible={this.state.isVisible}
                    onOk={this.handleSubmit}
                    width={600}
                    onCancel={()=>{
                        this.userForm.props.form.resetFields();//重置表单的数据
                        this.setState({
                            isVisible:false,
                            userInfo:''
                        })
                    }}
                >
                    <UserForm userInfo={this.state.userInfo} type={this.state.type} wrappedComponentRef={(inst) => this.userForm = inst }/>
                </Modal>
            </div>
        );
    }
}
export default Form.create()(AdminInfo)

//弹框的内容
class UserForm extends React.Component{

    render(){

        const { getFieldDecorator } = this.props.form;
        const formItemLayout = {
            labelCol: {span: 5},
            wrapperCol: {span: 16}
        };
        const userInfo= this.props.userInfo || {};//获取用户信息
        const type = this.props.type;
        return (
            <Form layout="horizontal">
                <FormItem label="电话" {...formItemLayout}>
                    {
                        userInfo && type=='detail'?userInfo.admin_phone:
                            getFieldDecorator('admin_phone',{
                                initialValue:userInfo.admin_phone
                            })(
                                <Input type="text" placeholder="请输入电话"/>
                            )
                    }
                </FormItem>
                <FormItem label="密码" {...formItemLayout}>
                    {
                        userInfo && type=='detail'?userInfo.admin_password:
                            getFieldDecorator('admin_password',{
                                initialValue:userInfo.admin_password
                            })(
                                <Input type="text" placeholder="请输入密码"/>
                            )}
                </FormItem>
               <FormItem label="邮箱" {...formItemLayout}>
                    {
                        userInfo && type=='detail'?userInfo.admin_email:
                            getFieldDecorator('admin_email',{
                                initialValue:userInfo.admin_email
                            })(
                                <Input type="text" placeholder="请输入邮箱"/>
                            )}
                </FormItem>
            </Form>
        );
    }
}
UserForm = Form.create({})(UserForm);