import { ComponentClass } from 'react'
import Taro, { Component, Config } from '@tarojs/taro'
import { View, Button,Input,Image } from '@tarojs/components'
import { connect } from '@tarojs/redux'
import { add, minus, asyncAdd } from '../../actions/counter'
import header from '../../static/header.png'
import './index.less'

type PageStateProps = {
  counter: {
    num: number
  }
}

type PageDispatchProps = {
  add: () => void
  dec: () => void
  asyncAdd: () => any
}

type PageOwnProps = {}

type PageState = {}

type IProps = PageStateProps & PageDispatchProps & PageOwnProps

interface Index {
  props: IProps;
}

@connect(({ counter }) => ({
  counter
}), (dispatch) => ({
  add () {
    dispatch(add())
  },
  dec () {
    dispatch(minus())
  },
  asyncAdd () {
    dispatch(asyncAdd())
  }
}))
class Index extends Component {
    config: Config = {
    navigationBarTitleText: '注册',
    navigationBarBackgroundColor:"#5C86FF"
    
  }
  state = {
    username:"",
    password:"",
    msg:"发送验证码",
    disabled:false
  }

  componentWillReceiveProps (nextProps) {
    console.log(this.props, nextProps)
  }

  componentWillUnmount () { }

  componentDidShow () { }

  componentDidHide () { }
  handleUserName = (ev) => {
    let value = ev.target.value;
    this.setState({
      username:value
    })
  }
  handlePassword = (ev) => {
    let value = ev.target.value;
    this.setState({
      password:value
    })
  }
  handleLogin = () => {
    let { username,password } = this.state;
    let params = {
      username,
      password
    }
  }
  
  goGetCode =() => {
      let that = this;
      let time = 60;
      that.setState({
        msg: '60秒后重发',
        disabled: true
      })
      var Interval = setInterval(function() {
        time--;
        if (time>0){
          that.setState({
            msg: time + '秒后重发'
          })
        }else{
          clearInterval(Interval);
          that.setState({
            msg: '获取验证码',
            disabled: false
          })
        }
      },1000)
  }

  render () {
    const { msg,disabled } = this.state;
    return (
      <View className='index'>
          <View className="header">
            <Image className="image" src={header}/>
          </View>
          <View className="content">
            <View className="box">
              <View className="list">
                <Input className="input" onChange={this.handleUserName} type='text' placeholder='请输入手机号'/>
              </View>
              <View className="list">
                <Input className="input" onChange={this.handlePassword}  type='password' placeholder='请输入密码'/>
              </View>
              <View className="code bottom">
                  <View className="list_left">
                    <Input className="input" maxLength="6" type="number" placeholder="请输入验证码"/>
                  </View>
                  <View className="list_right" >
                     <Button style={{background:disabled?"#ccc":""}}  onClick={this.goGetCode} disabled={disabled} className="btn">{msg}</Button> 
                  </View>
              </View>
              <View className="btngroup bottom" onClick={this.handleLogin}><Button className="btn">确  认</Button></View>
            </View>
          </View>
      </View>
    )
  }
}


export default Index as ComponentClass<PageOwnProps, PageState>
