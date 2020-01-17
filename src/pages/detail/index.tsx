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
      navigationBarTitleText: '晓智报税',
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
    const { mediaArr } = this.state;
    return (
      <View className='detail'>
          <View className="box">
            {
              mediaArr&&mediaArr.map((item,index) => {
                return <View className="list" key={index}>
                <View className="left"><Image className="img" src={`${baseURL}${item.media_img}`}/></View>
                <View className="right">
                  <View className="title">{item.title}</View>
                  <View className="content">{item.description}</View>
                </View>
              </View>
              })
            }
          </View>
      </View>
    )
  }
}


export default Index as ComponentClass<PageOwnProps, PageState>
