import React from 'react';
import {Card,Table,Modal,message,Button} from 'antd';
import Axios from './../../axios/index';
import utils from './../../utils/utils'

export default class BasicTable extends React.Component{
    state={
        dataSource2:[]
    }
    param={
        page:1
    }


    componentDidMount(){
        const data = [
            {
                id:'0',
                userName:'Jack',
                sex:'1',
                state:'1',
                interest:'1',
                birthday:'2000-01-01',
                address:'北京市海淀区奥林匹克公园',
                time:'09:00'
            },
            {
                id: '1',
                userName: 'Tom',
                sex: '1',
                state: '1',
                interest: '1',
                birthday: '2000-01-01',
                address: '北京市海淀区奥林匹克公园',
                time: '09:00'
            },
            {
                id: '2',
                userName: 'Lily',
                sex: '1',
                state: '1',
                interest: '1',
                birthday: '2000-01-01',
                address: '北京市海淀区奥林匹克公园',
                time: '09:00'
            },
        ]
        data.map((item,index)=>{
            item.key = index;
        })
        this.setState({
            dataSource: data
        })

        this.request();
    }


    request=()=>{
        /*let baserUrl="https://www.easy-mock.com/mock/5b8fc15706b4621da8247b75/api"
        Axios.get(baserUrl+'/table/list').then((res)=>{
            if(res.data.code==0){
                const  dataSource2=res.data.result;
                this.setState({
                    dataSource2
                })
            }
        })*/

        let _this=this;
        Axios.ajax({
            url:'/table/list',
            data:{
                params:{
                    page:this.param.page
                }
            }
        },false).then((res)=>{//返回数据
            let data=res.list;
            this.setState({
                dataSource2:data,
                pagination:utils.pagination(res,(current)=>{
                    _this.param.page=current;
                    this.request();//重新刷新
                })
            })
        })
    }

    onRowClick=(recode,index)=>{
        let selectKey=[index];
        Modal.info({
            title:'信息',
            content:`用户名${recode.userName},爱好${recode.interest}`
        })
        this.setState({
            selectedRowKeys:selectKey,
            selectedItem:recode
        })
    }

    handleDelete=(()=>{
        let rows=this.state.selectedRows;
        let ids=[];
        rows.map((item)=>{
            ids.push(item.id)
        })
        Modal.info({
            title:'删除提示',
            content:`您确定要删除吗?${ids}`,
            onOk:()=>{
                message.success("删除成功")
                this.request();//更新
            }
        })



    })
    render(){
        const selectedRowKeys=this.state.selectedRowKeys;
        const rowSelection={
            type:'checkbox',
            selectedRowKeys,
            //做记录
            onChange:(selectedRowKeys,selectedRows)=>{
                this.setState({
                    selectedRowKeys,
                    selectedRows
                })
             }
        }
        const columns= [
            {
                title:'id',//表头名
                key:'id',
                dataIndex:'id' //和表里的内容相对应
            },
            {
                title: '用户名',
                key: 'userName',
                dataIndex: 'userName'
            },
            {
                title: '性别',
                key: 'sex',
                dataIndex: 'sex',
                render(sex){
                    return sex ==1 ?'男':'女'
                }
            },
            {
                title: '状态',
                key: 'state',
                dataIndex: 'state',
                render(state){
                    let config  = {
                        '1':'咸鱼一条',
                        '2':'风华浪子',
                        '3':'北大才子',
                        '4':'百度FE',
                        '5':'创业者'
                    }
                    return config[state];
                }
            },
            {
                title: '爱好',
                key: 'interest',
                dataIndex: 'interest',
                render(abc) {
                    let config = {
                        '1': '游泳',
                        '2': '打篮球',
                        '3': '踢足球',
                        '4': '跑步',
                        '5': '爬山',
                        '6': '骑行',
                        '7': '桌球',
                        '8': '麦霸'
                    }
                    return config[abc];
                }
            },
            {
                title: '生日',
                key: 'birthday',
                dataIndex: 'birthday'
            },
            {
                title: '地址',
                key: 'address',
                dataIndex: 'address'
            },
            {
                title: '早起时间',
                key: 'time',
                dataIndex: 'time'
            }
        ]
        return(
            <div>
                <Card title="基础表格">
                    <Table
                        columns={columns}
                        dataSource={this.state.dataSource}
                    />
                </Card>

                {/*使用多选按钮*/}
                <Card title="基础表格">
                    <Table columns={columns} dataSource={this.state.dataSource2}/>
                </Card>

                {/*使用mock数据*/}
                <Card title="基础表格">
                    <div>
                        <Button type="primary" onClick={this.handleDelete}>删除</Button>
                    </div>
                    <Table
                        columns={columns}
                        dataSource={this.state.dataSource2}
                        rowSelection={rowSelection}
                    />
                </Card>


                <Card title="基础表格">
                    <div>
                        <Button type="primary" onClick={this.handleDelete}>删除</Button>
                    </div>
                    <Table
                        columns={columns}
                        dataSource={this.state.dataSource2}
                        rowSelection={rowSelection}
                        pagination={this.state.pagination}
                    />
                </Card>
            </div>
        );
    }
}