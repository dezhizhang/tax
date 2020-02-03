import { ComponentClass } from 'react'
import Taro, { Component, Config } from '@tarojs/taro'
import { View, Button,Input,Image } from '@tarojs/components'
import { connect } from '@tarojs/redux'
import { add, minus, asyncAdd } from '../../actions/counter'
import { userLogin } from '../../service/api'
import { showToast } from '../../utils/tools'
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
    navigationBarTitleText: '登录',
    navigationBarBackgroundColor:"#5C86FF"
    
  }
  state = {
    phone:"",
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
      phone:value
    })
  }
  handlePassword = (ev) => {
    let value = ev.target.value;
    this.setState({
      password:value
    })
  }
  handleLogin = async() => {
    let { phone,password } = this.state;
    let params = {
      phone,
      password
    }
    if(phone && password) {
      let res = await userLogin(params);
      let data = res.data;
      if(data.code == 200 && res.data.isReg) {
        let id = data.data._id;
        Taro.setStorage({ key: 'id', data: id });
        Taro.switchTab({
          url:'../home/index'
        });
      } else if(data.code == 200 && !res.data.isReg) {
        showToast({
          title:data.msg,
          icon:"none"
        });
        Taro.navigateTo({
          url:"../register/index"
        });
      } else {
        showToast({
          title:data.msg,
          icon:"none"
        });
      }

    } else if(!phone) {
        showToast({
          title:"手机号不能为空",
          icon:"none"
        })
    } else if(!password) {
      showToast({
        title:"密码不能为空",
        icon:"none"
      })
    }
  
  }
  handleRegister = () => {
    Taro.navigateTo({
      url:"../register/index"
    });
  }
  handleBlurName = (ev) => {
    let value = ev.target.value;
    let reg = /^((13[0-9])|(17[0-1,6-8])|(15[^4,\\D])|(18[0-9]))\d{8}$/;
    if(!reg.test(value)) {
      showToast({
        title:"手机号不合法",
        icon:" ",
      });
      return
    }
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
                <Input className="input" onBlur={this.handleBlurName} onInput={this.handleUserName} type='text' placeholder='请输入手机号'/>
              </View>
              <View className="list bottom">
                <Input className="input" onInput={this.handlePassword}  type='password' placeholder='请输入密码'/>
              </View>
              <View className="btngroup bottom" onClick={this.handleLogin}><Button className="btn">登 录</Button></View>
              <View className="btngroup" onClick={this.handleRegister}><Button className="btn reg">注 册</Button></View>
            </View>
          </View>
      </View>
    )
  }
}


export default Index as ComponentClass<PageOwnProps, PageState>
