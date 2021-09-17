import React, { Component } from 'react'
import {Form ,Select,Input,Button} from 'antd'
/**
 * 添加表单的form组件
 */

const Option =Select.Option
export default class AddForm extends Component {
    formRef = React.createRef()
    show=()=>{
        console.log(this.formRef)
    }
    render() {
        
        return (
            <Form  onFinish={this.show}>
                <Form.Item label='选择品类' name='category' ref={this.formRef}>
                <Select>
                    <Option value='0'>一级分类</Option>
                    <Option value='1'>电脑</Option>
                    <Option value='2'>图书</Option>
                </Select>
                </Form.Item>
                <Form.Item label='名称：' name='note' rules={[{required:true}]}>
                    <Input placeholder='请输入分类名称' />
                </Form.Item>
                <Form.Item>
                    <Button htmlType='submit'>done</Button>
                </Form.Item>
               
            </Form>
        )
    }
}
