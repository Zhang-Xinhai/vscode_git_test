import React, { Component } from 'react'
import {Card,Select,Input,Button,Table} from 'antd'
import { reqProducts } from '../../api'
const Option =Select.Option
/**
 * product的默认子路由组件
 */
export default class ProductHome extends Component {
    state={
        total:0,
        products:[],
    }
    initColumns=()=>{
        this.columns=[
            {
                title:'商品名称',
              dataIndex:'name',
             },
             {   
                title:'商品描述',
            dataIndex:'desc'
             },
             {
                title:'价格',
                dataIndex:'price',
                render:(price)=> '¥'+price

             },
             {
                 title:'状态',
                 dataIndex:'status',
                 render:(status)=>{
                     return(
                         <span>
                             <Button type='primary'>下架</Button>
                             <span>在售</span>
                         </span>
                     )
                 }
             },
             {
                 title:'操作',
                 render:(product)=>{
                     return(
                         <span>
                             <Button type='link'>详情</Button>
                             <Button type='link'>修改</Button>
                         </span>
                     )
                 }
             }
             
        ]
    }
    getProducts=async(pageNum)=>{
        const {data}=await reqProducts(pageNum,5)
        if(data.status===0){
            const{total,list}=data.data
            this.setState({
                total,
                products:list
            })
        }
    }
    UNSAFE_componentWillMount(){
        this.initColumns()
        this.getProducts(1)
    }
    render() {
        const {products}=this.state
          
      
          
        const title=(
            <span>
                <Select value='1' style={{width:130}}>
                    <Option value='1'>按名称搜索</Option>
                    <Option value='2'>按描述搜索</Option>
                </Select>
                
                <Input placeholder='输入关键字' style={{width:150,margin:'0 15px'}}/>
                <Button type='primary'>搜索</Button>
            </span>
        )
        const extra=(
            <Button type='primary'>
                添加商品
            </Button>
        )
        return (

            <Card title={title} extra={extra}>
                <Table dataSource={products} columns={this.columns} rowKey='_id' pagination={{
                    defaultPageSize:5,
                    showQuickJumper:true,
                    total:this.state.total  ,
                    onChange:this.getProducts
                }}/>
            </Card>
        )
    }
}
