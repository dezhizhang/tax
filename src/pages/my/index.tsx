import { ComponentClass } from 'react'
import Taro, { Component, Config } from '@tarojs/taro'
import { View,Image,} from '@tarojs/components'
import { connect } from '@tarojs/redux'
import { add, minus, asyncAdd } from '../../actions/counter'
import myHeader from '../../images/my_header.png'
import avatar from '../../images/avatar.png'
import gift from '../../images/gift.png'
import allOrder from '../../images/all_order.png'
import msg from '../../images/icon/msg.png'
import arrow from '../../images/icon/arrow.png'
import  './index.less'

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
    state = {
      userInfo:{},
    }
    config: Config = {
    navigationBarTitleText: '我的'
  }

  componentWillReceiveProps (nextProps) {
    console.log(this.props, nextProps)
  }

  componentWillUnmount () { }

  componentDidShow() {
    let result = Taro.getStorageSync('userInfo');
    let userInfo =result?JSON.parse(result):''
    if(userInfo) {
      this.setState({userInfo});
    } else {
      Taro.showModal({
        title: '温馨提示',
        content: '您还没有登录!',
      }).then(res => {
        if(res.confirm) {
          Taro.navigateTo({
            url:'../login/index'
          })
        }
      })
    }
  }
  handleToLogin =() => {
    Taro.navigateTo({
      url:'../login/index'
    })
  }
  handleOrder = () => {
    Taro.navigateTo({
      url:'../maintain/index'
    })
  }
  componentDidHide () { }

  render () {
    let { userInfo } = this.state;
    return (
    <View className="my">
      <View className="header">
          <View className="header_top">
            <View className="header_image">
              <Image className="image" src={myHeader}/>
            </View>
            <View className="header_avatar" onClick={this.handleToLogin}>
              <Image src={userInfo&&userInfo.avatarUrl ? userInfo.avatarUrl:avatar} className="avatar"/>
            </View>
            <View className="header_user">
              <View className="user_name">{userInfo&&userInfo.nickName}</View>
              <View className="user_address">ID:{userInfo&&userInfo.userId}</View>
            </View>
            <View className="header_right">
               <View className="right">
                  <View className="icon">
                    <Image src={gift} className="image"/>
                  </View>
                  <View className="text">推荐送礼</View>
               </View>
            </View>
          </View>
          <View className="header_content">
          <View className="content_card">
            <View className="card_info">
              <View className="info_box">
                <View className="box_top">
                  <View className="top_item">
                    <View className="item_top">待付款</View>
                    <View className="item_bottom">3</View>
                  </View>
                  <View className="top_item">
                    <View className="item_top">待发货</View>
                    <View className="item_bottom">3</View>
                  </View>
                  <View className="top_item">
                    <View className="item_top">待收货</View>
                    <View className="item_bottom">6</View>
                  </View>
                  <View className="top_item">
                    <View className="item_top">待评价</View>
                    <View className="item_bottom">12</View>
                  </View>
                </View>
                <View className="box-bottom">
                    <View className="bottom-wrapper">
                      <View className="bottom-item">
                        <View className="item-top">
                           <Image src={allOrder} className="image"/>
                        </View>
                        <View className="item-bottom">所有订单</View>
                      </View>
                      <View className="bottom-item">
                        <View className="item-top">
                          <Image src={allOrder} className="image"/>
                        </View>
                        <View className="item-bottom">完成订单</View>
                      </View>
                    </View>
                </View>
              </View>
            </View>
          </View>
      </View>
      </View>
      <View className="content">
        <View className="content-item">
          <View className="item">
             <View className="icon-left">
               <Image className="image" src={msg}/>
             </View>
             <View className="text-left">我的消息</View>
             <View className="text-right">
               <View className="text-number">16</View>
             </View>
             <View className="icon-right">
               <Image src={arrow} className="image"/>
             </View>
          </View>
        </View>
        <View className="content-item">
          <View className="item">
             <View className="icon-left">
               <Image className="image" src={msg}/>
             </View>
             <View className="text-left">我的收藏</View>
             <View className="text-right">
               {/* <View className="text-number">16</View> */}
             </View>
             <View className="icon-right">
               <Image src={arrow} className="image"/>
             </View>
          </View>
        </View>
        <View className="content-item">
          <View className="item">
             <View className="icon-left">
               <Image className="image" src={msg}/>
             </View>
             <View className="text-left">我的卡券</View>
             <View className="text-right">
              你有3张优惠券待使用
               {/* <View className="text-number">16</View> */}
             </View>
             <View className="icon-right">
               <Image src={arrow} className="image"/>
             </View>
          </View>
        </View>
        <View className="content-item">
          <View className="item">
             <View className="icon-left">
               <Image className="image" src={msg}/>
             </View>
             <View className="text-left">我的金币</View>
             <View className="text-right">
               {/* <View className="text-number">16</View> */}
             </View>
             <View className="icon-right">
               <Image src={arrow} className="image"/>
             </View>
          </View>
        </View>
        <View className="content-item" onClick={this.handleOrder}>
          <View className="item">
             <View className="icon-left">
               <Image className="image" src={msg}/>
             </View>
             <View className="text-left">我的预约</View>
             <View className="text-right">
             </View>
             <View className="icon-right">
               <Image src={arrow} className="image"/>
             </View>
          </View>
        </View>
      </View>
      <View className="footer">
        <View className="content-item">
            <View className="item">
              <View className="icon-left">
                <Image className="image" src={msg}/>
              </View>
              <View className="text-left">我的设置</View>
              <View className="text-right">
                <View className="text-number">16</View>
              </View>
              <View className="icon-right">
                <Image src={arrow} className="image"/>
              </View>
            </View>
        </View>
        <View className="content-item">
            <View className="item">
              <View className="icon-left">
                <Image className="image" src={msg}/>
              </View>
              <View className="text-left">官方客服</View>
              <View className="text-right">
                <View className="text-number">16</View>
              </View>
              <View className="icon-right">
                <Image src={arrow} className="image"/>
              </View>
            </View>
           
        </View>
      </View>
    </View>
    )
  }
}

// #region 导出注意
//
// 经过上面的声明后需要将导出的 Taro.Component 子类修改为子类本身的 props 属性
// 这样在使用这个子类时 Ts 才不会提示缺少 JSX 类型参数错误
//
// #endregion

export default Index as ComponentClass<PageOwnProps, PageState>
