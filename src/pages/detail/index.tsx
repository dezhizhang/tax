import { ComponentClass, } from 'react'
import Taro, { Component, Config } from '@tarojs/taro'
import { View, Button,Input,Image,Text } from '@tarojs/components'
import { mediaDetailInfo, } from '../../service/api'
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
    detail:{},
  }

  componentWillReceiveProps (nextProps) {
    console.log(this.props, nextProps)
  }

  componentDidMount() {
  
  }

  componentWillMount () {
    let params = this.$router.params;
    this.detailData(params);
  }

  detailData = async(params) => {
    let res = await mediaDetailInfo(params);
    if(res.data.code == 200) {
        let detail = res.data.data;
        this.setState({ detail });
    }
  }

  componentWillUnmount () { }


  componentDidShow () { }

  componentDidHide () { }

  render () {
    const { detail } = this.state;
    console.log(detail);
    return (
      <View className='detail'>
          <View className="header">
              <Image src={`${baseURL}${detail.media_img}`} className="img"/>
          </View>
          <View className="content">
             <Text>{detail.description}</Text>
          </View>
      </View>
    )
  }
}


export default Index as ComponentClass<PageOwnProps, PageState>
