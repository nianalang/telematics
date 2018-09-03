import React from 'react';
import {Menu} from 'antd';
import MenuConfig from './../../config/menuConfig';
import './index.less';

const SubMenu = Menu.SubMenu;
/*
    NavLeft组件结构，只展开当前父级菜单
 */
export default class NavLeft extends React.Component{

    state = {
        theme:'dark',
    }

   /* handleClick = (e) => {
        console.log('click ', e);
    }*/

    componentWillMount(){
        const menuTreeNode=this.renderMenu(MenuConfig);
        this.setState({
            menuTreeNode
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
             return <Menu.Item key={item.key} title={item.title}>{item.title}</Menu.Item>
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

                <Menu theme={this.state.theme} mode="inline">
                    {this.state.menuTreeNode}
                </Menu>
            </div>
        );
    }
}