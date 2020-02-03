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
    onTimeChange = (ev) => {
        let value = ev.detail.value;
        this.setState({
            inform_time:value
        })
    }
    handleSubmit = async() => {
        let { data } = await Taro.getStorage({ key: 'id' });
        const { tempFilePaths,company_name,phone,address,contact,social_code,inform_time} = this.state;
        if(tempFilePaths&&company_name&&phone&&address&&contact&&social_code&&inform_time&&inform_time!="请选择接收时间") {
            const params = {
                phone,
                contact,
                address,
                social_code,
                inform_time,
                company_name,
                tempFilePaths,
                tax_id:data,
                name:'company_img'
            }
            showLoading({title:'信息上传中'});
            uploadInfo(params).then(res => {
                let data = JSON.parse(res.data);
                if(data.code == 200) {
                  hideLoading();
                  showToast({
                    title:'上传成功',
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
        } else if(!inform_time && inform_time!='请选择接收时间') {
            showToast({title:"接收时间不能为空",icon:"none"});
        }else if(!address) {
            showToast({title:"注册地址不能为空",icon:"none"});
        } else if(!contact) {
            showToast({title:"联系人不能为空",icon:"none"});
        }else if(!tempFilePaths) {
            showToast({title:"公司图片不能为空",icon:"none"})
        }
       
    }

    render () {
        const { tempFilePaths,inform_time } = this.state;
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
                            <View className="left"><Text className="strong">*</Text><Text>接收电话：</Text></View>
                            <View className="right"><Input onBlur={this.handleBlurPhone} onInput={this.handlePhone} className="input" type="text" placeholder="请输入接收电话"/></View>
                        </View>
                        <View className="list">
                            <View className="left"><Text className="strong">*</Text><Text>接收时间：</Text></View>
                            <View className="right"> 
                            <Picker mode='date' onChange={this.onTimeChange} placeholder="请选择接收时间">
                                <View className='picker' style={{color:inform_time=="请选择接收时间" ? '#999':""}}>
                                  {inform_time}
                                </View>
                            </Picker>
                            </View>
                        </View>
                        <View className="list">
                            <View className="left"><Text className="strong">*</Text><Text>注册地址：</Text></View>
                            <View className="right"><Input onInput={this.handleAddress} className="input" type="text" placeholder="请输入注册地址"/></View>
                        </View>
                        <View className="list">
                            <View className="left"><Text className="strong">*</Text><Text>联系人：</Text></View>
                            <View className="right"><Input onInput={this.hanldeContact} className="input" type="text" placeholder="请输入联系人"/></View>
                        </View>
                        <View className="list" style={{borderBottom:'none'}}>
                            <View className="left"><Text className="strong">*</Text><Text>公司图片</Text></View>
                        </View>
                        <View className="image" style={{marginBottom:'60px'}}>
                            <View className="left" onClick={this.handleChooseImage}>
                            <Image src={tempFilePaths ? tempFilePaths:upload} className="upload"/>
                            </View>
                            <View className="right">
                                <Image src={server} className="upload"/>
                            </View>
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
