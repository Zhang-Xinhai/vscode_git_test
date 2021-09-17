import React, { Component } from 'react'
import './index.css'
import { Button } from 'antd';
import { PoweroffOutlined } from '@ant-design/icons';
import axios from 'axios'
import { Modal} from 'antd';
import memoryUtils from '../../utils/memoryUtils'
import storageUtils from '../../utils/storageUtils'
import { withRouter } from 'react-router-dom'
class Header extends Component {
    
    state={
        weather:[],
        today:{},
        tomorrow:{}
    }
    logout=()=>{
        const { confirm } = Modal;
        confirm({
            title: '确认退出吗？',
            onOk:()=> {
              //删除保存的user数据并跳转
              storageUtils.removeUser()
              memoryUtils.user={}
              this.props.history.replace('/login')
            }
          });
    }
    componentDidMount(){
        axios.get('https://restapi.amap.com/v3/weather/weatherInfo?key=6cf775708ebabe3c939ea7fb758f26b8&city=652301&extensions=all').then(res=>{
            this.setState({weather:res.data.forecasts[0],today:res.data.forecasts[0].casts[0],tomorrow:res.data.forecasts[0].casts[1]})  
       })
    }
    render() {
        
        
        return (
            <div className="header">
                <div className="head-top">
                    <span>欢迎，admin</span>
                    <Button
                    type="primary"
                    icon={<PoweroffOutlined />}
                    onClick={this.logout}
                    />
                </div>
                
                <div className="head-bottom">
                    <div className="head-bottom-left">
                    
                    </div>
                    <div className="head-bottom-right">
                        <span>{this.state.today.date}{this.state.weather.city}
                        今日天气：{this.state.today.dayweather}{this.state.today.daytemp}度
                        明日：{this.state.tomorrow.dayweather}{this.state.tomorrow.daytemp}度
                        </span>
                    </div>
                </div>
            </div>
        )
    }
}
export default withRouter(Header)