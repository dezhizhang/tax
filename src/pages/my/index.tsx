import { ComponentClass } from 'react'
import Taro, { Component, Config } from '@tarojs/taro'
import { View,Image,} from '@tarojs/components'
import { connect } from '@tarojs/redux'
import { add, minus, asyncAdd } from '../../actions/counter'
import { userInfo } from '../../service/api'
import { showToast } from '../../utils/tools'
import myHeader from '../../images/my_header.png'
import avatar from '../../images/avatar.png'
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
      userData:{},
    }
    config: Config = {
    navigationBarTitleText: '荣屿财税',
    navigationBarBackgroundColor:"#5C86FF"
  }

  componentWillReceiveProps (nextProps) {
    console.log(this.props, nextProps)
  }

  componentWillUnmount () { }


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
  componentDidMount() {
    this.getUserInfo();
  }
  getUserInfo = async() => {
    let { data } = await Taro.getStorage({ key: 'id' });
    let res = await userInfo({id:data});
    if(res.data.code == 200) {
      let userData = res.data.data;
      this.setState({
        userData
      })
    } else {
      
      showToast({title:res.data.msg,icon:""});
    }
  }
  componentDidHide () { }

  render () {
    let { userData } = this.state;
    return (
    <View className="my">
      <View className="header">
          <View className="header_top">
            <View className="header_image">
              <Image className="image" src={myHeader}/>
            </View>
            <View className="header_avatar" onClick={this.handleToLogin}>
              <Image src={userData&&userData.avatarUrl ? userData.avatarUrl:avatar} className="avatar"/>
            </View>
            <View className="header_user">
              <View className="user_name"></View>
              <View className="user_address">呢称:{userData&&userData.userName}</View> 
            </View>
           
          </View>
          <View className="header_content">
          <View className="content_card">
            <View className="card_info">
              <View className="info_box">
                <View className="box_top">
                  <View className="top_item">
                    <View className="item_top">待报税</View>
                    <View className="item_bottom">3</View>
                  </View>
                  <View className="top_item">
                    <View className="item_top">报完成</View>
                    <View className="item_bottom">3</View>
                  </View>
                  <View className="top_item">
                    <View className="item_top">未完成</View>
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
             <View className="text-left">报税列表</View>
             <View className="text-right">
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
             <View className="text-left">添加报税</View>
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
              <View className="text-left">联系我们</View>
              <View className="text-right">
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


// 经过上面的声明后需要将导出的 Taro.Component 子类修改为子类本身的 props 属性
// 这样在使用这个子类时 Ts 才不会提示缺少 JSX 类型参数错误
//
// #endregion

export default Index as ComponentClass<PageOwnProps, PageState>
