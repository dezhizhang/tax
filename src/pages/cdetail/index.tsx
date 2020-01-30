import { ComponentClass, } from 'react'
import Taro, { Component, Config } from '@tarojs/taro'
import { View,Image,Text } from '@tarojs/components'
import { companyDetail, } from '../../service/api'
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
      navigationBarTitleText: '荣屿财税',
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
    let res = await companyDetail(params);
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
    return (
      <View className='cdetail'>
         <View className="header">
            <Image className="image" src={`${baseURL}${detail.company_url}`}/>
         </View>
         <View className="content">
           <View className="box">
             <View className="name">{detail.name}</View>
             <Text className="description">{detail.description}</Text>
           </View>
         </View>
      </View>
    )
  }
}


export default Index as ComponentClass<PageOwnProps, PageState>
