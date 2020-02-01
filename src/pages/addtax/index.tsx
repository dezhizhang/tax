import { ComponentClass } from 'react'
import Taro, { Component, Config } from '@tarojs/taro'
import { View, Button,Input,Image,Text } from '@tarojs/components'
import { connect } from '@tarojs/redux'
import { add, minus, asyncAdd } from '../../actions/counter'
import { userLogin } from '../../service/api'
import { showToast } from '../../utils/tools'
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
        <View className='addtax'>
            <View className="wrapper">
                <View className="box">
                    <View className="list bottom">
                        <View className="left"><Text className="strong">*</Text><Text>公司名称：</Text></View>
                        <View className="right"><Input className="input" type="text"/></View>
                    </View>
                    <View className="list">
                        <View className="left"><Text className="strong">*</Text><Text>信用代码：</Text></View>
                        <View className="right"><Input className="input" type="text"/></View>
                    </View>
                    <View className="list">
                        <View className="left"><Text className="strong">*</Text><Text>接收电话：</Text></View>
                        <View className="right"><Input className="input" type="text"/></View>
                    </View>
                    <View className="list">
                        <View className="left"><Text className="strong">*</Text><Text>注册地址：</Text></View>
                        <View className="right"><Input className="input" type="text"/></View>
                    </View>
                    <View className="list bottom">
                        <View className="left"><Text className="strong">*</Text><Text>联系人：</Text></View>
                        <View className="right"><Input className="input" type="text"/></View>
                    </View>
                    <View className="list">
                        <View className="left"><Text className="strong">*</Text><Text>公司图片</Text></View>
                    </View>
                    <View className="image">
                        <View className="left">
                            <View></View>
                        </View>
                        <View className="right"></View>
                    </View>
                </View>
            </View>
        </View>
    )
  }
}


export default Index as ComponentClass<PageOwnProps, PageState>
