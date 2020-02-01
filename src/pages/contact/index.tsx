import { ComponentClass } from 'react'
import Taro, { Component, Config } from '@tarojs/taro'
import { View } from '@tarojs/components'
import { connect } from '@tarojs/redux'
import { add, minus, asyncAdd } from '../../actions/counter'
import { contactInfo } from '../../service/api'
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
    list:[]
  }

  componentWillReceiveProps (nextProps) {
    console.log(this.props, nextProps)
  }

  componentDidMount() {
      this.getContactData()
  }

  getContactData = async() =>  {
      let res = await contactInfo();
      if(res.data.code == 200) {
        let list = res.data.data;
        this.setState({ list });
      }
  }

  componentWillUnmount () { }

  componentDidShow () { }

  componentDidHide () { }
  render () {
    let { list } = this.state;
    return (
      <View className='contact'>
        <View className="wrapper">
            <View className="box">
                {list&&list.map((item,index) => {
                    return <View key={index} className="list">
                    <View className="item">微信：{item.wechat}</View>
                    <View className="item">  Q  Q：{item.qq}</View>
                    <View className="item">邮箱：{item.email}</View>
                    <View className="item">电话：{item.mobile}</View>
                </View>
                })}
            </View>
        </View>
      </View>
    )
  }
}


export default Index as ComponentClass<PageOwnProps, PageState>
