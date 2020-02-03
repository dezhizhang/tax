import { ComponentClass } from 'react'
import Taro, { Component, Config } from '@tarojs/taro'
import { View, Button,Input,Text,Textarea } from '@tarojs/components'
import { connect } from '@tarojs/redux'
import { add, minus, asyncAdd } from '../../actions/counter'
import { addFeedBack } from '../../service/api'
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
        email:"",
        description:""
    }

    componentWillReceiveProps (nextProps) {
        console.log(this.props, nextProps)
    }

    componentWillUnmount () { }

    componentDidShow () { }

    componentDidHide () { }


    handleEmail = (ev) => {
        let value = ev.target.value;
       
        this.setState({
            email:value
        })
    }


    handleSubmit = async() => {
        let { email,description} = this.state;
        if(!email) {
            showToast({
                title:"邮箱不能为空",
                icon:"none"
            })
            return
        } else {
            let params = {
                email,
                description
            }
            let res = await addFeedBack(params);
            showLoading({title:"提交中..."})
            if(res.data.code == 200) {
                hideLoading();
                showToast({
                    title:res.data.msg,
                    icon:"success"
                })
                Taro.switchTab({
                    url:"../my/index"
                })
            } else {
                showToast({
                    title:res.data.msg,
                    icon:"none"
                })
            }
        }
       
    }
    handleDescription = (ev) => {
        let value = ev.target.value;
        this.setState({
            description:value
        })
    }
    handleBlurEmail = (ev) => {
        let value = ev.target.value;
        let reg = /^([a-zA-Z]|[0-9])(\w|\-)+@[a-zA-Z0-9]+\.([a-zA-Z]{2,4})$/g
        if(!reg.test(value)) {
            showToast({
                title:"输入邮箱不合法",
                icon:"none"
            })
            return
        }
    }


    render () {
       
        return (
            <View className='addtax'>
                <View className="wrapper">
                    <View className="box">
                        <View className="list" style={{marginBottom:20}}>
                            <View className="left"><Text className="strong">*</Text><Text className="text">联系邮箱：</Text></View>
                            <View className="right"><Input className="input" onBlur={this.handleBlurEmail} onInput={this.handleEmail} type="text" placeholder="请输入联系邮箱"/></View>
                        </View>

                        <View className="text" style={{marginBottom: 60}}>
                            <Textarea onInput={this.handleDescription}  className="textarea" placeholder="请输入反馈内容"/>
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
