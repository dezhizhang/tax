import '@tarojs/async-await'
import Taro, { Component, Config } from '@tarojs/taro'
import { Provider } from '@tarojs/redux'
import Index from './pages/index'
import configStore from './store';
import './app.less';
const store = configStore()

class App extends Component {
  config: Config = {
    pages: [
      "pages/home/index",
      "pages/cdetail/index",
      "pages/media/index",
      "pages/mdetail/index",
      "pages/contact/index",
      "pages/addtax/index",
      "pages/taxlist/index",
      "pages/feedback/index",
      "pages/my/index",
      "pages/login/index",
    ],
    window: {
      backgroundTextStyle: 'light',
      navigationBarBackgroundColor: '#fff',
      navigationBarTitleText: 'WeChat',
      navigationBarTextStyle: 'black'
    },
    tabBar: {
      list: [{
        pagePath: "pages/home/index",
        text: "首页",
        iconPath: "./images/tab/home.png",
        selectedIconPath: "./images/tab/home-active.png"
      },
      {
        pagePath: "pages/media/index",
        text:'媒体报道',
        iconPath:'./images/tab/cate.png',
        selectedIconPath:'./images/tab/cate-active.png'
      },
      {
        pagePath:"pages/my/index",
        text:"我的",
        iconPath:"./images/tab/user.png",
        selectedIconPath:"./images/tab/user-active.png"
      }
    ],
    }
  }

  componentDidMount () {}

  componentDidShow () {}

  componentDidHide () {}

  componentDidCatchError () {}
  
  render () {
    return (
      <Provider store={store}>
        <Index />
      </Provider>
    )
  }
}

Taro.render(<App />, document.getElementById('app'))
