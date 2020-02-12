import { ComponentClass } from 'react'
import Taro, { Component, Config } from '@tarojs/taro'
import { View, Button,Input,Text } from '@tarojs/components'
import { connect } from '@tarojs/redux'
import { add, minus, asyncAdd } from '../../actions/counter'
import { uploadInfo } from '../../service/api'
import { showToast,showLoading,hideLoading } from '../../utils/tools'
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
        company_name:"",
        phone:"",
        address:"",
        contact:"",
        social_code:"",
    }

    componentWillReceiveProps (nextProps) {
        console.log(this.props, nextProps)
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
        this.setState({
            phone:value
        })
    }
    handleBlurPhone = (ev) => {
        let value = ev.target.value;
        const reg = /^1([358][0-9]|4[579]|66|7[0135678]|9[89])[0-9]{8}$/
        if(!reg.test(value)) {
            showToast({title:"手机号不合法",icon:"none"});
            return;
        }
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
    handleSubmit = async() => {
        let  openid  = await Taro.getStorageSync("openid");
        const { company_name,phone,address,contact,social_code} = this.state;
        if(company_name&&phone&&address&&contact&&social_code) {
            const params = {
                phone,
                contact,
                address,
                social_code,
                company_name,
                tax_id:openid,
            }
            showLoading({title:'信息提交中'});
            uploadInfo(params).then(res => {
                if(res.data.code == 200) {
                  hideLoading();
                  showToast({
                    title:"信息上传成功",
                    icon:'success'
                  });
                  Taro.switchTab({
                    url: '../my/index'
                  });
                }
            })
        }
        else if(!company_name) {
            showToast({title:"公司名称不能为空",icon:"none"})
        }   else if(!social_code) {
            showToast({title:"信用代码不能为空",icon:"none"});
        } else if(!phone) {
            showToast({title:"接收电话不能为空",icon:"none"});
        }else if(!address) {
            showToast({title:"注册地址不能为空",icon:"none"});
        } else if(!contact) {
            showToast({title:"联系人不能为空",icon:"none"});
        }
    }
    render () {
       
        return (
            <View className='addtax'>
                <View className="wrapper">
                    <View className="box">
                        <View className="list">
                            <View className="left"><Text className="strong">*</Text><Text>公司名称：</Text></View>
                            <View className="right"><Input className="input" onInput={this.handleCompanyName} type="text" placeholder="请输入公司名称"/></View>
                        </View>
                        <View className="list">
                            <View className="left"><Text className="strong">*</Text><Text>信用代码：</Text></View>
                            <View className="right"><Input className="input" onInput={this.handleSocialCode}  type="text" placeholder="请输入信用代码"/></View>
                        </View>
                        <View className="list">
                            <View className="left"><Text className="strong">*</Text><Text>注册地址：</Text></View>
                            <View className="right"><Input onInput={this.handleAddress} className="input" type="text" placeholder="请输入注册地址"/></View>
                        </View>
                        <View className="list">
                            <View className="left"><Text className="strong">*</Text><Text>接收电话：</Text></View>
                            <View className="right"><Input onBlur={this.handleBlurPhone} onInput={this.handlePhone} className="input" type="text" placeholder="请输入接收电话"/></View>
                        </View>
                        <View className="list bottom">
                            <View className="left"><Text className="strong">*</Text><Text>联系人：</Text></View>
                            <View className="right"><Input onInput={this.hanldeContact} className="input" type="text" placeholder="请输入联系人"/></View>
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
