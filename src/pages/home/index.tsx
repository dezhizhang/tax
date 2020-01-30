import { ComponentClass } from 'react'
import { connect } from '@tarojs/redux'
import Taro, { Component, Config } from '@tarojs/taro'
import { View, Swiper, SwiperItem,ScrollView,Image  } from '@tarojs/components'
import { add, minus, asyncAdd } from '../../actions/counter'
import { focusInfo,advertInfo,companyList } from '../../service/api'
import { baseURL,showLoading,hideLoading } from '../../utils/tools'
import category from '../../images/category.png'
import facility from '../../images/facility.png'
import stationery from '../../images/stationery.png'
import evenmore from '../../images/evenmore.png'
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
      focusData:[],
      advertData:[],
      hotData:[],
      listData:[],
      listArr:[],
      page:1,
      classifyArr:[
        {
          name:'记帐',
          main_id:'1',
          src:category
        },
        {
          name:'报税',
          main_id:'2',
          src:facility
        },
        {
          name:'开发票',
          main_id:'3',
          src:stationery
        },
        {
          name:'更多',
          main_id:'4',
          src:evenmore
        }
      ]
    }

  config: Config = {
    navigationBarTitleText: '荣屿财税',
    navigationBarBackgroundColor:"#5C86FF"
  }

  componentWillReceiveProps (nextProps) {
    console.log(this.props, nextProps)
  }
  componentDidMount() {
    this.getFocusData();
    this.getadvertData();
    this.getCompanyListData();
  }
  getFocusData = async () =>  {
     const result = await focusInfo();
     const data = result.data;
     if(data.code == 200) {
       let focusData = data.data
       this.setState({focusData})
     }
  }
  getadvertData = async () =>  {
     const result = await advertInfo();
     const data = result.data;
     if(data.code == 200) {
       let advertData = data.data;
       this.setState({advertData})
     }
  }
  //公司列表
  getCompanyListData = async () =>  {
    const { page } = this.state;
    const result = await companyList({page:page});
    const data = result.data;
    if(data.code == 200) {
      let listData = data.list;
      this.setState({listData})
    }
  }
  handleAdvert = () => {
    Taro.navigateTo({
      url: '../maintain/index'
    });
  }
  onReachBottom = async() => {
    let { page,listData } = this.state;
    page++;
    const result = await companyList({page:page});
    const data = result.data;
    showLoading({title:'加载中'})
    if(data.code == 200) {
      hideLoading();
      let listArr = listData.concat(data.list);
      this.setState({listData:listArr,page});
    }
  }
  //公司详情
  handleToDetail = (item) => {
    Taro.navigateTo({
      url: `../cdetail/index?id=${item._id}`
    })
  }
  //分类详情
  handleToCateDetail = (item) => {
    Taro.navigateTo({
      url: `../classify/index?main_id=${item.main_id}`
    })
  }

  componentWillUnmount () { }

  componentDidShow () { }

  componentDidHide () { }

  render () {
    const { focusData,advertData,listData,classifyArr } = this.state;
   
    return (
      <ScrollView className='index'
        scrollY={true}
        scrollWithAnimation={true}
        enableBackToTop
      >
        <View className='wrapper'>
          <View className="list">
            <Swiper
              className='swiper'
              indicatorColor='#537afb'
              indicatorActiveColor='#735ff7'
              circular
              indicatorDots
              autoplay>
              {focusData.length && focusData.map((item,index) => {
                return (
                  <SwiperItem key={index}>
                    <View className="bannner"><Image className="banner_image" mode='aspectFill' src={`${baseURL}${item.focus_img}`}/></View>
                  </SwiperItem>)
                })}
            </Swiper>
            <View className="category">
               {classifyArr.map((item,index) => {
                return (
                  <View key={index} className="item" onClick={() => this.handleToCateDetail(item)}>
                    <View className="top">
                      <View className="image_wrapper">
                          <Image className="image" mode='aspectFill'  src={item.src}/>
                      </View>
                    </View>
                    <View className="bottom">{item.name}</View>
                  </View>
                )})}
            </View>
            <View className="advert" onClick={this.handleAdvert}>
              {advertData.length&&advertData.map((item,index) => {
                return (<Image className="advert_image" key={index} mode='aspectFill' src={`${baseURL}${item.advert_img}`}></Image>)
              })}
            </View>
          </View>
          <View className="product">
             推荐企业
          </View>
          <View className='product_item'>
          <View className="product_wrapper">
            {listData.map((item,index) => {
              return  <View className="item" key={index} onClick={() =>this.handleToDetail(item)}>
              <View className="item-top">
                <Image className="image" mode='aspectFill'  src={`${baseURL}${item.company_url}`}/>
              </View>
              <View className="item-bottom">
                <View className="bottom-desc">{item.name}</View>
                <View className="bottom-text">
                    <View className="text-left">{item.description}</View>
                </View>
              </View>
            </View>
            })}
          </View>
          </View>
        </View>
      </ScrollView>
    )
  }
}

export default Index as ComponentClass<PageOwnProps, PageState>
