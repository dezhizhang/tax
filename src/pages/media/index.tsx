import { ComponentClass, } from 'react'
import Taro, { Component, Config } from '@tarojs/taro'
import { View, Button,Input,Image,Text } from '@tarojs/components'
import { mediaInfo, } from '../../service/api'
import { baseURL } from '../../utils/tools'
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


class Index extends Component {
    config: Config = {
    navigationBarTitleText: '',
    navigationBarBackgroundColor:"#5C86FF"
    
  }
  state = {
    mediaArr:[],
  }

  componentWillReceiveProps (nextProps) {
    console.log(this.props, nextProps)
  }

  componentDidMount() {
    this.getMediaData();
  }

  getMediaData = async() => {
    let res = await mediaInfo({page:1});
    if(res.data.code == 200) {
      let mediaArr = res.data.data;
      this.setState({ mediaArr });
    }
  }

  componentWillUnmount () { }

  componentDidShow () { }

  componentDidHide () { }

  render () {
    return (
      <View className='media'>
          <View className="box">
            <View className="list">
              <View className="left"></View>
              <View className="right">
                <View className="title">我是标题</View>
                <Text className="content">内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容</Text>
              </View>
            </View>
            <View className="list">
              <View className="left"></View>
              <View className="right">
                <View className="title">我是标题</View>
                <Text className="content">内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容</Text>
              </View>
            </View>
            <View className="list">
              <View className="left"></View>
              <View className="right">
                <View className="title">我是标题</View>
                <Text className="content">内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容</Text>
              </View>
            </View>
          </View>
      </View>
    )
  }
}


export default Index as ComponentClass<PageOwnProps, PageState>
