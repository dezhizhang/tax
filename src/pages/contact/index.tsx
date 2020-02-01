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
    navigationBarTitleText: '荣屿财税',
    navigationBarBackgroundColor:"#5C86FF"
    
  }
  state = {
    
  }

  componentWillReceiveProps (nextProps) {
    console.log(this.props, nextProps)
  }

  componentWillUnmount () { }

  componentDidShow () { }

  componentDidHide () { }
  





  render () {
    return (
      <View className='contact'>
        <View className="wrapper">
            <View className="box">
                <View className="list">
                    <View className="item">微信：15083356190</View>
                    <View className="item">  Q  Q：1541609448</View>
                    <View className="item">邮箱：1541609448@qq.com</View>
                    <View className="item">电话：15083356190</View>
                </View>
                <View className="list">
                    <View className="item">微信：15083356190</View>
                    <View className="item">  Q  Q：1541609448</View>
                    <View className="item">邮箱：1541609448@qq.com</View>
                    <View className="item">电话：15083356190</View>
                </View>
            </View>
        </View>
      </View>
    )
  }
}


export default Index as ComponentClass<PageOwnProps, PageState>
