import React, { Component  } from 'react'
import { Card,Button,Table,Space,message,Modal,Form ,Select,Input,Row, Col } from 'antd';
import { ArrowRightOutlined} from '@ant-design/icons';
import { reqCategorys ,reqUpdateCategory,reqAddCategory} from '../../api';
const Option =Select.Option
/**
 * 商品分类
 */
export default class Category extends Component {
    addformRef = React.createRef();
    updateformRef = React.createRef();
    state={
        category:{},
        loading:false, //是否正在获取数据
        parentId:'0',  //当前需要显示的分类列表的parentid
        parentName:'',//当前需要显示的分类列表的父分类名称
        showStatus:0,//标识添加/更新的确认框是否显示，0:都不显示，1:显示添加，2:显示更新
        columns:[
            {
              title: '分类名称',
              dataIndex: 'name',
            },
            {
              title: '操作',
              width:300,
              render:(category)=>(
                  <span>
                      <Space size="middle">
                      <Button type="default" onClick={()=>{this.showUpdate(category)}}>修改分类</Button>
                      {this.state.parentId==='0'?<Button type="primary" onClick={()=>{this.showSubCategorys(category)}}>查看子分类</Button>:null}
                  
                      </Space>
                      
                  </span>
                  )
            }
            
          ]
        ,
        categorys:[
           
        ]//一级分类列表,
        ,
        subCategorys:[

        ]

        }
        //显示添加的确认框
        showAdd=()=>{
            this.setState({
                showStatus:1
            },()=>{
                this.addformRef.current.setFieldsValue({
                    category:this.state.parentId
                })
            })
        }
        //显示更新分类的确认框
        showUpdate=(category)=>{
            this.category=category
            //把这一行的数据读取出来,并且存储
            
            this.setState({
                showStatus:2
            },()=>{this.updateformRef.current.setFieldsValue({
                name: this.category.name,
              })})
         
        }
        //关闭modal
        handleCancel=()=>{
            this.setState({showStatus:0})
        }
        //添加分类
        addCategory=async()=>{
            this.setState({
                showStatus:0
            })
            //收集数据，并提交添加分类的请求
            const name=this.addformRef.current.getFieldValue('name')
            const id=this.parentId
            const result =await reqAddCategory({name,id})
            console.log(result)
        }
        //更新分类
        updateCategory=async()=>{
            const id=this.category._id
            const name=this.updateformRef.current.getFieldValue('name')
            console.log(id,name)
            //隐藏确认框
            this.setState({showStatus:0})
            //发请求准备数据
            const result=await reqUpdateCategory({id,name})
            console.log(result)
            if(result.data.status===0){
                //重新显示列表
            this.getCategorys()
            }
          

        }
        showSubCategorys=(category)=>{
            this.setState({
                parentId:category._id,
                parentName:category.name
            },()=>{  //在状态更新且重新render后执行
                //获取二级分类
                this.getCategorys()
                
            })
            //setstate不能立即获取最新的状态：因为setstate是异步更新状态的，而setstate中的回调函数将会
            //在状态更新完成后进行
           
        }
        showFirstCategorys=()=>{
            //更新为显示一级列表的状态
            this.setState({
                parentId:'0',
                parentName:'',
                subCategorys:[]
            })
        }
    getCategorys=async()=>{
        this.setState({loading:true})
        const{parentId}=this.state
        //发ajax请求获取数据
        const {data}=await reqCategorys(parentId)
        this.setState({loading:false})
        
        if(data.status===0){
            const categorys=data.data
            if(parentId==='0'){this.setState({categorys:categorys})}
            else{
                this.setState({subCategorys:categorys})
            }
            
        }else{
            message.error('获取信息失败！')
        }

    }
    componentDidMount(){
        this.getCategorys()
    }
    render() {
        const {categorys,columns,parentId,parentName,subCategorys,showStatus}=this.state
        
        const title=parentId==='0'?'一级分类列表':(
            <span>
                <Button type="link" style={{fontSize:'16px'}} onClick={this.showFirstCategorys}>一级分类列表</Button>
                <ArrowRightOutlined />
                <span style={{marginLeft:'20px'}}>{parentName}</span>
            </span>
        )
        return (
            <Card title={title} extra={<Button type="primary" onClick={this.showAdd}>添加</Button>} >
                <Table dataSource={parentId==='0'?categorys:subCategorys} 
                columns={columns} bordered rowKey="_id"
                pagination={{defaultPageSize:7,showQuickJumper:true}}
                loading={this.state.loading}
                />


                <Modal title="添加分类" visible={showStatus===1} 
                onCancel={this.handleCancel}
                footer={[]}>
                <Form  onFinish={this.show} ref={this.addformRef}>
                    <Form.Item label='选择品类' name='category' ref={this.formRef}>
                    <Select>
                        {
                            categorys.map(c=><Option value={c._id}>{c.name}</Option>)
                        }
                    </Select>
                    </Form.Item>
                    <Form.Item label='名称：' name='name' rules={[{required:true}]}>
                        <Input placeholder='请输入分类名称' />
                    </Form.Item>
                    <Form.Item>
                    <Row>
                        <Col span={8}></Col>
                        <Col span={8}></Col>
                        <Col span={8}>
                            <Button htmlType='submit' type='primary' onClick={this.addCategory}>提交</Button>
                            &nbsp;
                            <Button onClick={this.handleCancel}>取消</Button>
                        </Col>
                    </Row>    
                    </Form.Item>
                
                </Form>
                </Modal>


                <Modal title="修改分类" visible={showStatus===2}
                  onCancel={this.handleCancel} footer={[]}>
                    <Form  onFinish={this.show} ref={this.updateformRef}>
                    <Form.Item label='名称：' name='name' rules={[{required:true}]} >
                                <Input placeholder='请输入分类名称' />
                    </Form.Item>
                    <Form.Item>
                    <Row>
                        <Col span={8}></Col>
                        <Col span={8}></Col>
                        <Col span={8}>
                            <Button htmlType='submit' type='primary' onClick={this.updateCategory}>提交</Button>
                            &nbsp;
                            <Button onClick={this.handleCancel}>取消</Button>
                        </Col>
                    </Row>    
                    </Form.Item>
                
                </Form>
                </Modal>
            </Card>
        )
    }
}
