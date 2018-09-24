import React from 'react';
import {Menu} from 'antd';
import MenuConfig from './../../config/menuConfig';
import './index.less';
import {NavLink} from 'react-router-dom';

import {connect} from 'react-redux';
import {switchMenu} from './../../redux/action/index';

const SubMenu = Menu.SubMenu;
/*
    NavLeft组件结构，只展开当前父级菜单
 */
class NavLeft extends React.Component{
    //初始化
    constructor(props) {
        super(props);
        this. state = {
            theme:'dark',
            //currentKey:'/admin/home'
        };
    }

    handleClick=({item})=>{
         // 事件派发，自动调用reducer，通过reducer保存到store对象中
         const { dispatch } = this.props;
         console.log(item.props);
         if(item.props.parentMenu.props.title){
             dispatch(switchMenu(`${item.props.parentMenu.props.title} / ${item.props.title}`));
         }else{
             dispatch(switchMenu(item.props.title));
         }
}

    //绑定生命周期钩子
    componentWillMount(){
        const menuTreeNode=this.renderMenu(MenuConfig);
        //let currentKey=window.location.hash.replace('/#|\?.*$/g','');
        this.setState({
            menuTreeNode,
            //currentKey
        })
    }

    //菜单渲染
    renderMenu=(data)=>{
        //遍历
        return data.map((item)=>{
             if(item.children){
                 return(
                     <SubMenu key={item.key} title={item.title}>
                         {this.renderMenu(item.children)}
                     </SubMenu>
                 )
             }
             return (
                 <Menu.Item key={item.key} title={item.title}>
                     <NavLink to={item.router}>{item.title}</NavLink>
                 </Menu.Item>
                 )
        })
    }

    render() {
        return (
            <div>
                {/*logo部分*/}
                <div className="logo">
                    <img src="/assets/logo-ant.svg" alt=""/>
                    <h1> 车联网后台系统</h1>
                </div>

                <Menu 
                theme={this.state.theme} 
                mode="inline"
                onClick={this.handleClick}
                //selectedKeys={this.state.currentKey}
                >
                    {this.state.menuTreeNode}
                </Menu>
            </div>
        );
    }
}

export default  connect()(NavLeft);