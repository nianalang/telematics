import React from 'react';
import './index.less';
import {Icon} from 'antd';
/*
    Footer组件结构
 */
export default class Footer extends React.Component{

    render(){
        return(
            <div className="footer">
            Copyright <Icon type="copyright"/> 2018大连民族大学大创学生出品
            </div>
        );
    }
}