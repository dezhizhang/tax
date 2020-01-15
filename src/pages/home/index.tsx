import { ComponentClass } from 'react'
import Taro, { Component, Config } from '@tarojs/taro'
import { View,Image,Swiper,SwiperItem, } from '@tarojs/components'
import { focusInfo, } from '../../service/api'
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
    focusArr:[],
  }

  componentWillReceiveProps (nextProps) {
    console.log(this.props, nextProps)
  }
  componentDidMount() {
    this.getFocusData();
  }
  getFocusData = async() => {
      let res = await focusInfo();
      if(res.data.code == 200) {
        let focusArr = res.data.data;
        this.setState({ focusArr });
      }
  }

  componentWillUnmount () { }

  componentDidShow () { }

  componentDidHide () { }

  render () {
    const { focusArr } = this.state;
    return (
        <View className='home'>
            <View className="box">
                <View className="header">
                <Swiper
                  className='test-h'
                  indicatorColor='#999'
                  indicatorActiveColor='#333'
                  circular
                  indicatorDots
                  autoplay>
                 
                  {focusArr.map((item,index) => {
                    return <SwiperItem key={index} >
                      <View className="focus">
                        <Image className="focus-image" src={`${baseURL}${item.focus_img}`}/>
                      </View>
                    </SwiperItem>
                  })}
                </Swiper> 
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
