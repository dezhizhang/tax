import { ComponentClass } from 'react'
import Taro, { Component, Config } from '@tarojs/taro'
import { View, Button,Input,Image,Text,Picker } from '@tarojs/components'
import { connect } from '@tarojs/redux'
import { add, minus, asyncAdd } from '../../actions/counter'
import { uploadInfo } from '../../service/api'
import { showToast,showLoading,hideLoading } from '../../utils/tools'
import upload from '../../images/upload.png'
import server from '../../images/server.png'
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
        tempFilePaths:"",
        company_name:"",
        phone:"",
        address:"",
        contact:"",
        social_code:"",
        inform_time:"请选择接收时间"
    }

    componentWillReceiveProps (nextProps) {
        console.log(this.props, nextProps)
    }
    handleChooseImage = () => {
        let that = this;
        const params = {
        count:1,
        sizeType:['original', 'compressed'],
        sourceType: ['album', 'camera']
        }
        Taro.chooseImage(params).then(res => {
        const tempFilePaths = res.tempFilePaths[0]; 
        that.setState({ tempFilePaths });
        })
    }

    componentWillUnmount () { }

    componentDidShow () { }

    componentDidHide () { }
    handleCompanyName = (ev) => {
        let value = ev.target.value;
        this.setState({
            company_name:value
        })
    }
    handleSocialCode = (ev) => {
        let value = ev.target.value;
        this.setState({
            social_code:value
        })
    }
    handlePhone = (ev) => {
        let value = ev.target.value;
        const reg = /^1([358][0-9]|4[579]|66|7[0135678]|9[89])[0-9]{8}$/
        if(!reg.test(value)) {
            showToast({title:"手机号不合法",icon:"none"});
            return;
        }
        this.setState({
            phone:value
        })
    }
    handleAddress = (ev) => {
        let value = ev.target.value;
        this.setState({
            address:value
        })
    }
    hanldeContact = (ev) => {
        let value = ev.target.value;
        this.setState({
            contact:value
        })
    }
    onTimeChange = (ev) => {
        let value = ev.detail.value;
        this.setState({
            inform_time:value
        })
    }
    handleSubmit = async() => {
        
       
    }

    render () {
       
        return (
            <View className='addtax'>
                <View className="wrapper">
                    <View className="box">
                        <View className="list">
                            <View className="left"><Text className="strong">*</Text><Text>联系邮箱：</Text></View>
                            <View className="right"><Input className="input" onInput={this.handleCompanyName} type="text" placeholder="请输入联系邮箱"/></View>
                        </View>
                       
                        <View className="list">
                            <View className="left"><Text className="strong">*</Text><Text>注册地址：</Text></View>
                            <View className="right"><Input onInput={this.handleAddress} className="input" type="text" placeholder="请输入注册地址"/></View>
                        </View>
                     
                    
                        <View>
                            <Button onClick={this.handleSubmit} className="submit">确　定</Button>
                        </View>
                    </View>
                </View>
            </View>
        )
    }
}


export default Index as ComponentClass<PageOwnProps, PageState>
