import { ComponentClass } from 'react'
import Taro, { Component, Config } from '@tarojs/taro'
import { View, Button,Input,Image,Text } from '@tarojs/components'
import { connect } from '@tarojs/redux'
import { add, minus, asyncAdd } from '../../actions/counter'
import { updateUser } from '../../service/api'
import { showToast,showLoading,hideLoading } from '../../utils/tools'
import upload from '../../images/upload.png'
import userImg from '../../images/userImg.png'
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
        user_name:"",
        password:"",
    
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
    handleUserName = (ev) => {
        let value = ev.target.value;
        this.setState({
            user_name:value
        })
    }
    handlePassword = (ev) => {
        let value = ev.target.value;
        this.setState({
            password:value
        })
    }

    handleSubmit = async() => {
        let { data } = await Taro.getStorage({ key: 'id' });
        const { tempFilePaths,user_name,password} = this.state;
        if(tempFilePaths&&user_name&&password) {
            const params = {
                user_name,
                password,
                tempFilePaths,
                name:'user_img',
                id:data
            }
            showLoading({title:'信息上传中'});
            updateUser(params).then(res => {
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
        } else if(!user_name) {
            showToast({
                title:"呢称不能为空",
                icon:"none"
            }) 
        } else if(!password) {
            showToast({
                title:"密码不能为空",
                icon:"none"
            })
        } else if(!tempFilePaths) {
            showToast({
                title:"头像不能为空",
                icon:"none"
            })
        }
    
    }

    render () {
        const { tempFilePaths } = this.state;
        return (
            <View className='addtax'>
                <View className="wrapper">
                    <View className="box">
                        <View className="list">
                            <View className="left"><Text className="strong">*</Text><Text>呢称：</Text></View>
                            <View className="right"><Input className="input" onInput={this.handleUserName} type="text" placeholder="请输入呢称"/></View>
                        </View>
                        <View className="list">
                            <View className="left"><Text className="strong">*</Text><Text>密码：</Text></View>
                            <View className="right"><Input className="input" onInput={this.handlePassword}  type="password" placeholder="请输入密码"/></View>
                        </View>
                       
                        <View className="list" style={{borderBottom:'none'}}>
                            <View className="left"><Text className="strong">*</Text><Text>头像：</Text></View>
                        </View>
                        <View className="image" style={{marginBottom:'60px'}}>
                            <View className="left" onClick={this.handleChooseImage}>
                            <Image src={tempFilePaths ? tempFilePaths:upload} className="upload"/>
                            </View>
                            <View className="right">
                                <Image src={userImg} className="upload"/>
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
