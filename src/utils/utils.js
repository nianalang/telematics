import {Select} from 'antd';
import React from 'react';
const Option=Select.Option;
export default {
    //日期处理
    formatDate(time){
        if(!time) return '';
        let data=new Date(time);
        let year=data.getFullYear();
        let month=data.getMonth()+1;
        if(month<10){
             month='0'+month;
        }
        let day=data.getDate();
        if(day<10){
            day='0'+day;
        }
        let hour=data.getHours();
        if(hour<10){
            hour='0'+hour;
        }
        let minute=data.getMinutes();
        if(minute<10){
            minute='0'+minute;
        }
        let second=data.getSeconds();
        if(second<10){
            second='0'+second;
        }
        return year+"-"+month+"-"+day+" "+hour+":"+minute+":"+second;
    },
    //分页处理
    pagination(data,callback){
        let page={
            onChange:(current)=>{
                callback(current)
            },
            current:data.pageNum,
            pageSize:data.pageSize,
            total:data.total,
            showTotal:()=>{
                return `共${data.total}条`
            },
            //showQuickJumper:true
        }
        return page;
    },


    //option选择
    getOptionList(data){
        if(!data){
            return [];
        }
        let options=[];
        data.map((item,index)=>{
            options.push(<Option value={item.id} key={item.id}>{item.name}</Option>)
        })
    }
}