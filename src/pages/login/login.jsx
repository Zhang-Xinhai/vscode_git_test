import React, { Component } from 'react'
import { Form, Input, Button,message} from 'antd';
import { UserOutlined, LockOutlined } from '@ant-design/icons';
import './login.css'
import {reqLogin} from '../../api'
import  memoryUtils from'../../utils/memoryUtils'
import  storageUtils from'../../utils/storageUtils'
import { Redirect } from 'react-router-dom';
export default class Login extends Component {
    
    render() {

        const user=memoryUtils.user
        if(user._id){
            return <Redirect to='/'/>
        }


        const onFinish = async(values) => {
          const {data}=await reqLogin(values.username,values.password)
          if(data.status!==0){
            message.error('登陆失败！')
          }else{
            memoryUtils.user=data.data.role
            storageUtils.saveUser(data.data.role)
           
            message.success('登陆成功！')
            this.props.history.replace('/')
          }
          };
        return (
            <div className="login"> 
                <header className="login-header">
                    <h1>赢通物流管理系统</h1>
                </header>
                <section className="login-content">
                    <h2>用户登陆</h2>
                <Form
                    name="normal_login"
                    className="login-form"
                    initialValues={{
                        remember: true,
                    }}
                    onFinish={onFinish}
                    >
                    <Form.Item
                        name="username"
                        rules={[
                        {
                            required: true,
                            message: '请输入用户名！!',
                        },
                        ]}
                        initialValue="admin"
                    >
                        <Input prefix={<UserOutlined className="site-form-item-icon" />} placeholder="请输入用户名" />
                    </Form.Item>
                    <Form.Item
                        name="password"
                        rules={[
                        {
                            required: true,
                            message: '请输入密码！！',
                        },
                        ]}
                        initialValue="123456"
                    >
                        <Input
                        prefix={<LockOutlined className="site-form-item-icon" />}
                        type="password"
                        placeholder="请输入密码"
                        />
                    </Form.Item>
                    

                    <Form.Item>
                        <Button type="primary" htmlType="submit" className="login-form-button">
                        登陆
                        </Button>
                    
                    </Form.Item>
                    </Form>
                </section>
            </div>
        )
    }
}
