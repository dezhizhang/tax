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

  handleRegister = () => {
   
  }

  render () {
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
              <View className="list bottom">
                <Input className="input" onChange={this.handlePassword}  type='password' placeholder='请输入密码'/>
              </View>
              <View className="btngroup bottom" onClick={this.handleLogin}><Button className="btn">确认注册</Button></View>
              {/* <View className="btngroup" onClick={this.handleRegister}><Button className="btn reg">注 册</Button></View> */}
            </View>
          </View>
      </View>
    )
  }
}


export default Index as ComponentClass<PageOwnProps, PageState>
