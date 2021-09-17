import React, { Component } from 'react'
import memoryUtils from '../../utils/memoryUtils'
import {Redirect,Route, Switch} from 'react-router-dom'
import LeftNav from '../../components/left-nav'
import Header from '../../components/header'
import { Layout } from 'antd';
import Home from '../home/home'
import Category from '../category/category'
import Role from '../role/role'
import User from '../user/user'
import Product from '../product/product'
import './admin.css'



const {   Sider, Content } = Layout;

export default class Admin extends Component {
    
    render() {
        const user=memoryUtils.user
        
        if(!user){
            return <Redirect to='/login'/>
        }
        return (
            <Layout style={{height:'100%'}}>
                <Sider className="leftbar">
                    <LeftNav />
                </Sider>
                <Layout>
                    <Header/>

                    <Content style={{margin:'20px 20px 20px 220px',backgroundColor:'#fff'}}>
                    <Switch>
                        <Route path='/home' component={Home}/>
                        <Route path='/category' component={Category}/>
                        <Route path='/product' component={Product}/>
                        <Route path='/role' component={Role}/>
                        <Route path='/user' component={User}/>
                        <Redirect to='/home'/>
                    </Switch>
                    </Content>
                
                </Layout>
            </Layout>
        )
    }
}
