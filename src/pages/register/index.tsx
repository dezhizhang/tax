import { ComponentClass } from 'react'
import Taro, { Component, Config } from '@tarojs/taro'
import { View, Button,Input,Image } from '@tarojs/components'
import { connect } from '@tarojs/redux'
import { add, minus, asyncAdd } from '../../actions/counter'
import { showToast } from '../../utils/tools'
import { userCode,userRegister } from '../../service/api'
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
    phone:"",
    password:"",
    msg:"发送验证码",
    phone_code:"",
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
    let reg = /^((13[0-9])|(17[0-1,6-8])|(15[^4,\\D])|(18[0-9]))\d{8}$/;
    if(!reg.test(value)) {
      showToast({title:"手机号不合法",icon:"none"});
      return;
    } else {
      this.setState({
        phone:value
      })
    }
   
  }
  handlePassword = (ev) => {
    let value = ev.target.value;
    this.setState({
      password:value
    })
  }
  handleRegister = async() => {
    let { phone,password,phone_code } = this.state;
    let params = {
      phone,
      password,
      phone_code
    }
    let res = await userRegister(params);
    
    let data = res.data;
    console.log(data);
    if(data.code == 200) {
      showToast({
        title:res.data.msg,
        icon:"success"
      });
      Taro.reLaunch({
        url:'../index/index'
      })
      
    } else {
      showToast({
        title:data.msg,
        icon:""
      })
    }
  }
  handlePhoneCode = (ev) => {
    let value = ev.target.value;
    this.setState({
      phone_code:value
    })
  }
  //倒计时
  goGetCode = async() => {
      let { phone } = this.state;
      let that = this;
      let time = 60;
      if(phone) {
        let res = await userCode({phone});
        if(res.data.code == 200) {
          showToast({title:res.data.msg});
        } else {
          showToast({title:res.data.msg,icon:""});
        }
       
        that.setState({
          msg: '60秒后重发',
          disabled: true
        })
        let Interval = setInterval(function() {
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
        },1000);
        
      } else {
        showToast({title:"手机号不能为空",icon:'none'});
      }
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
                    <Input onChange={this.handlePhoneCode} className="input" maxLength="6" type="number" placeholder="请输入验证码"/>
                  </View>
                  <View className="list_right" >
                     <Button style={{background:disabled?"#ccc":""}}  onClick={this.goGetCode} disabled={disabled} className="btn">{msg}</Button> 
                  </View>
              </View>
              <View className="btngroup bottom" onClick={this.handleRegister}><Button className="btn">确  认</Button></View>
            </View>
          </View>
      </View>
    )
  }
}


export default Index as ComponentClass<PageOwnProps, PageState>
