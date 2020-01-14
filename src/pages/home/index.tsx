import { ComponentClass } from 'react'
import Taro, { Component, Config } from '@tarojs/taro'
import { View, Button,Input,Image } from '@tarojs/components'
import { connect } from '@tarojs/redux'
import { add, minus, asyncAdd } from '../../actions/counter'
import header from '../../static/header.png';

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
    navigationBarTitleText: '',
    navigationBarBackgroundColor:"#5C86FF"
    
  }

  componentWillReceiveProps (nextProps) {
    console.log(this.props, nextProps)
  }

  componentWillUnmount () { }

  componentDidShow () { }

  componentDidHide () { }

  render () {
    return (
        <View className='home'>
            <View className="box">
                <View className="header">
                        11111
                </View>
                <View className="category">
                    <View className="item">
                        <View className="wrapper-image">

                        </View>
                        <View>记帐</View>
                    </View>
                    <View className="item"></View>
                    <View className="item"></View>
                    <View className="item"></View>
                </View>
                <View className="bottom"></View>
            </View>
        </View>
    )
  }
}


export default Index as ComponentClass<PageOwnProps, PageState>
