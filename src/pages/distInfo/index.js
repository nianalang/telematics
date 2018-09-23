import React from 'react';
import {Button,Card,Form,Input,DatePicker,Table,Modal,message} from 'antd';
import Axios from './../../axios/index';
import './index.less';
import Utils from './../../utils/utils';

const FormItem=Form.Item;

export default class DistInfo extends React.Component{
     //初始化数据
     constructor(props) {
        super(props);
        this.state = {
            dataSource:[]
        };
    }

    params = {
        page: 1
    }

    componentDidMount(){
        this.requestList();//请求数据
    }

    //去后台获取数据
    requestList=()=>{
        let _this = this;
        Axios.ajax({
            url:'/telematis/admin/distributor/findAllDistributor',
            data:{
                pageNum:this.params.page,
                pageSize:10,
                store_code:'2000',
                stall_code:'3000'
            }
        },'post',false).then((res)=> {
            let data=res.rows
            data.map((item, index) => {
                item.key = index;
            })
            this.setState({
                dataSource:data,
                pagination: Utils.pagination(res, (current) => {
                    _this.params.page = current;
                    _this.requestList();
                })
            })
            //_this.request();//重新刷新
        })
    }

    render(){
        const columns=[
            {
                title:'店铺号',
                key:'store_code',
                dataIndex:'store_code'
            },
            {
                title:'店铺名字',
                key:'store_name',
                dataIndex:'store_name'
            },
            {
                title:'所属货摊号',
                key:'stall_code',
                dataIndex:'stall_code'
            },
            {
                title:'所属货摊号名字',
                key:'stall_name',
                dataIndex:'stall_name'
            },
            {
                title:'分销商用户名',
                key:'dist_name',
                dataIndex:'dist_name'
            },
            {
                title:'分销商密码',
                key:'dist_password',
                dataIndex:'dist_password'
            },
            {
                title:'角色id',
                key:'role_id',
                dataIndex:'role_id'
            },
            {
                title:'角色名字',
                key:'role_name',
                dataIndex:'role_name'
            },
            {
                title:'分销商所处地区',
                key:'dist_address',
                dataIndex:'dist_address'
            },
            {
                title:'创建时间',
                key:'create_time',
                dataIndex:'create_time'
            }
        ]
        
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

                    <div className="content-wrap">
                        <Table
                            style={{marginTop:10,padding:0}}
                            columns={columns}//表头
                            dataSource={this.state.dataSource}//数据
                            rowSelection={rowCheckSelection}//多选按钮
                            pagination={this.state.pagination}//分页
                        />
                    </div>
                </Card>
            </div>
        )
    }
}