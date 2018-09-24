import JsonP from 'jsonp';
import axios from 'axios';
import  {Modal} from 'antd';

export default class Axios{
    //跨域axios请求
    static jsonp(options){
        return new Promise((resolve,reject)=>{
            JsonP(options.url,{
                param:'callback'
            },function (err,response) {
                if(response.status=='success'){
                    resolve(response);
                }else {
                    reject(response.message);
                }
            })
        })
    }

    //封装axios
    static ajax(options,method,iMock){
        let loading;//loadIng处理
         if(options.data&&options.data.isShowLoading!==false){
            loading=document.getElementById("ajaxLoading");
            loading.style.display='block';
        }
        let baserUrl='';
        if(iMock){
            baserUrl="https://www.easy-mock.com/mock/5b8fc15706b4621da8247b75/api"
        }

        if(method=='get'){
            //es6语法  resolve解析成功
            return new Promise((resolve,reject)=>{
                axios({
                    url:options.url,
                    method:'get',
                    timeout:5000,
                    params:(options.data&&options.data.param)||''  //参数
                }).then((response)=>{
                    if(options.data&&options.data.isShowLoading!==false){
                        loading=document.getElementById("ajaxLoading");
                        loading.style.display='none';
                    }
                    if(response.data.state){//返回两种类型的数据
                        if(response.status='200'&&response.data.state==1){
                            let res=response.data;
                            resolve(res)//返回数据
                        }else{//数据拦截
                            Modal.info({
                                title:'提示',
                                content:response.data.msg
                            })
                        }
                    }else{
                        if(response.status='200'&&response.data.success==true){
                            let res=response.data;
                            resolve(res.data.rows)//返回数据
                        }else{//数据拦截
                            Modal.info({
                                title:'提示',
                                content:response.data.msg
                            })
                        }
                    }
                })
            })
        }else if(method=='post'){
            let data=options.data;
            //es6语法  resolve解析成功
            return new Promise((resolve,reject)=>{
                axios({
                    url:options.url,
                    method:method,
                    data:{
                        ...data
                    }
                }).then((response)=>{
                    console.log(response);
                    if(options.data&&options.data.isShowLoading!==false){
                        loading=document.getElementById("ajaxLoading");
                        loading.style.display='none';
                    }

                    if(response.data.success){
                        if(response.status==200){
                            let res=response.data.data;
                            console.log(res);
                            resolve(res)//返回数据
                        }else{
                            Modal.info({
                                title:'提示',
                                content:response.data.error
                            })
                        }
                    }else{
                        console.log(res);
                        let res=response.data
                        resolve(res)//返回数据
                    }
                    
                    // if(response.data.state){//返回两种类型的数据
                    //     if(response.status='200'&&response.data.success==1){
                    //         let res=response.data;
                    //         resolve(res)//返回数据
                    //     }else{//数据拦截
                    //         Modal.info({
                    //             title:'提示',
                    //             content:response.data.msg
                    //         })
                    //     }
                    // }else{
                    //     if(response.status='200'&&response.data.success==true){
                    //         let res=response.data;
                    //         resolve(res.data.rows)//返回数据
                    //     }else{//数据拦截
                    //         Modal.info({
                    //             title:'提示',
                    //             content:response.data.msg
                    //         })
                    //     }
                    // }
                })
            })
        }
    }
}