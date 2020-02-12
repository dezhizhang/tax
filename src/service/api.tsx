import { request,uploadFile } from '../utils/request';
import Config from '../common/config';
//轮播图
export async function focusInfo() {
  return request(`${Config.API_HOST}/api/v1/focus`);
}
//媒体
export async function mediaInfo(params) {
  return request(`${Config.API_HOST}/api/v1/media/list?page=${params.page}`)
}
//媒体详情
export async function mediaDetail(params) {
  return request(`${Config.API_HOST}/api/v1/media/detail?id=${params.id}`)
}
//广告图
export async function advertInfo() {
  return request(`${Config.API_HOST}/api/v1/advert/info`)
}
//获取验证码
export async function userCode(params) {
  return request(`${Config.API_HOST}/api/v1/user/code?phone=${params.phone}`)
}
//用户注册
export async function userRegister(params) {
  return request(`${Config.API_HOST}/api/v1/user/register`,{
    method:'POST',
    body:params
  })
}
//用户登录
export async function userLogin(params) {
  return request(`${Config.API_HOST}/api/v1/user/login`,{
    method:"POST",
    body:params
  })
}
//公司列表
export async function companyList(params) {
  return request(`${Config.API_HOST}/api/v1/company/list?page=${params.page}`)
}
//公司详情
export async function companyDetail(params) {
  return request(`${Config.API_HOST}/api/v1/company/detail?id=${params.id}`)
}
//用户列表
export async function userInfo(params) {
  return request(`${Config.API_HOST}/api/v1/company/user/info?id=${params.id}`)
}
//联系我们
export async function contactInfo() {
  return request(`${Config.API_HOST}/api/v1/contact/list`)
}
//报税列表
export async function taxList(params) {
  return request(`${Config.API_HOST}/api/v1/tax/list?tax_id=${params.tax_id}&status=${params.status}`)
}
//报税提交
export async function uploadInfo(params) {
  return request(`${Config.API_HOST}/api/v1/tax/add`,{
    method:'POST',
    body:params
  });
} 
//修改用户信息
export async function updateUser(params) {
  return uploadFile(`${Config.API_HOST}/api/v1/user/edit`,params)
}
//报税信息
export async function taxInfo(params) {
  return request(`${Config.API_HOST}/api/v1/tax/info?tax_id=${params.tax_id}`)
}
//增加反馈内容
export async function addFeedBack(params) {
  return request(`${Config.API_HOST}/api/v1/back/add`,{
    method:"POST",
    body:params
  })
}


