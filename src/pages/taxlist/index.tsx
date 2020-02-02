import { ComponentClass, } from 'react'
import Taro, { Component, Config } from '@tarojs/taro'
import { View,Image } from '@tarojs/components'
import { taxList, } from '../../service/api'
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
    taxArr:[],
  }

  componentWillReceiveProps (nextProps) {
    console.log(this.props, nextProps)
  }

  componentWillMount () {
    let params = this.$router.params;
    this.getTaxData(params);
  }

  getTaxData = async(params) => {
    let { data } = await Taro.getStorage({ key: 'id' });
    let res = await taxList({'tax_id':data,'status':params.status});
    if(res.data.code == 200) {
      let taxArr = res.data.data;
      this.setState({ taxArr });
    }
  }

  componentWillUnmount () { }

  componentDidShow () { }

  componentDidHide () { }

  handleDetail = (item) => {
    Taro.navigateTo({
      url: `../mdetail/index?id=${item._id}`
    })
  }

  render () {
    const { taxArr } = this.state;
    
    return (
      <View className='media'>
          <View className="box">
            {
              taxArr&&taxArr.map((item,index) => {
                return <View className="list" key={index}>
                <View className="left"><Image className="img" src={`${baseURL}${item.company_img}`}/></View>
                <View className="right">
                  <View className="title">企业名称：{item.company_name}</View>
                  <View className="title">信用代码：{item.social_code}</View>
                  <View className="title">注册地址：{item.address}</View>
                  <View className="title">提醒时间：{item.inform_time}</View>
                  <View className="title">状态：{item.status==1 ? "完成":"未完成"}</View>
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
