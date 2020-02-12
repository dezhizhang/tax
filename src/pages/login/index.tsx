import { ComponentClass } from 'react'
import Taro, { Component, Config } from '@tarojs/taro'
import { View, Button } from '@tarojs/components'
import { userLogin } from '../../service/api'
import { showModal } from '../../utils/tools'
import { connect } from '@tarojs/redux'
import { add, minus, asyncAdd } from '../../actions/counter'
import  './index.less'

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
    state = {
      isHide:false
    }
    config: Config = {
        navigationBarTitleText: '荣屿财税',
        navigationBarBackgroundColor:"#5C86FF"
  }

  componentWillReceiveProps (nextProps) {
    console.log(this.props, nextProps)
  }

  componentWillUnmount () { }

  componentDidShow() {

  }
  componentDidMount() {
    Taro.getSetting().then(res => {
      if(res.authSetting['scope.userInfo']) {
        Taro.getUserInfo().then(res => {
          if(res.userInfo) {
            Taro.login().then(res => {
              let params = {
                code:res.code,
                appid:'wxd9d0c9664d688f92',
              }
              userLogin(params).then(res => {
                  if(res.data.code == 200) {
                    let result = res.data.data;
                    let { openid } = result;
                    Taro.setStorageSync('openid', openid);
                  }
              })
            })
          } else {
            showModal({
              title:'警告',
              content:'您还没有授权，请重新授权!',
              showCancel:false,
              confirmText:'授权登录'
            })
          }
        })
      } 
    })
  }
  bindGetUserInfo = (ev) => {
    if(ev.detail.userInfo){
      let result  = ev.detail.userInfo;
      let userInfo = JSON.stringify(result);
      Taro.setStorageSync('userInfo', userInfo);
      Taro.switchTab({
        url:'../my/index'
      });
     
    } else {
      showModal({
        title:'警告',
        content:'您还没有授权，请重新授权!',
        showCancel:false,
        confirmText:'授权登录'
      })
    }
   
  }

  componentDidHide () { }

  render () {
    return (
    <View className="login">
      <View className="login-weapper">
        <Button openType="getUserInfo" className="btn" type="primary" onGetUserInfo={this.bindGetUserInfo}>微信一键登录</Button>
      </View>
    </View>
    )
  }
}


export default Index as ComponentClass<PageOwnProps, PageState>
