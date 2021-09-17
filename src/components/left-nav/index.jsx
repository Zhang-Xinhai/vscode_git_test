import React, { Component } from 'react'
// import logo from '../../assets/images/logo.png'
import './index.css'
import {Link} from 'react-router-dom'
import { Menu} from 'antd';
import {
  PieChartOutlined,
  CalendarOutlined,
  ShoppingOutlined,
  MailOutlined,
} from '@ant-design/icons';
const { SubMenu } = Menu;
/**
 * 左侧导航的组件
 */
export default class LeftNav extends Component {
    /**
     * 
     * @param menuList 
     * 根据menu的数据数组生成对应的标签数组
     */


    
      
    render() {
        return (
                
                <div  className="left-nav">
                <Link to='/' className="left-nav-header">

                {/* <img src={logo} alt="logo"></img> */}
                <h1>赢通后台</h1>
                </Link>
                
                    <Menu
                    // defaultSelectedKeys={['/']}
                    mode="inline"
                    theme="dark"
                    
                    >
                    <Menu.Item key="/" icon={<PieChartOutlined />} >
                        <Link to='/'>
                            首页
                        </Link>
                    </Menu.Item>
                    <SubMenu key="sub1" icon={<MailOutlined />} title="商品">
                        <Menu.Item key="/category" icon={<CalendarOutlined />}>
                            <Link to='/category'>
                                品类管理
                            </Link>
                        </Menu.Item>
                        <Menu.Item key="/product" icon={<ShoppingOutlined />}>
                        <Link to='/product'>
                                商品管理
                            </Link>
                        </Menu.Item>                      
                    </SubMenu>
                    <Menu.Item key="/user" icon={<PieChartOutlined />} >
                        <Link to='/user'>
                            用户管理
                        </Link>
                    </Menu.Item>
                    <Menu.Item key="/role" icon={<PieChartOutlined />} >
                        <Link to='/role'>
                            角色管理
                        </Link>
                    </Menu.Item>
                    
                    </Menu>
                    
                </div>
                
            
        )
    }
}
