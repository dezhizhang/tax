import { request,uploadFile } from '../utils/request';
import Config from '../common/config';
//轮播图
export async function focusInfo() {
  return request(`${Config.API_HOST}/api/v1/focus`);
}
//广告
export async function getAdvertInfo() {
  return request(`${Config.API_HOST}/api/advert/info`);
}
//热门产品
export async function getProductHot() {
  return request(`${Config.API_HOST}/api/product/hot`);
}
//主打产品
export async function getProductList(params) {
  return request(`${Config.API_HOST}/api/product/list?page=${params.page}`);
} 
//提交维修
export async function uploadInfo(params) {
  return uploadFile(`${Config.API_HOST}/api/maintain/upload`,params);
} 
//主打分类
export async function getMainList(params) {
  return request(`${Config.API_HOST}/api/product/main?main_id=${params.main_id}`)
}
//详情信息
export async function getDetailInfo(params) {
  return request(`${Config.API_HOST}/api/detail/info?detail_id=${params.detail_id}`)
}
//分类列表
export async function getCategoryList() {
  return request(`${Config.API_HOST}/api/category/list`)
}
//获取分类详情
export async function getCategoryDetail(params) {
  return request(`${Config.API_HOST}/api/categoryDetail/list?classify_id=${params.classify_id}`)
}
//用户登录
export async function userLogin(params) {
  return request(`${Config.API_HOST}/api/userInfo/login?code=${params.code}&appid=${params.appid}`);
}
//购物车
export async function userInfoCartSave(params) {
  return request(`${Config.API_HOST}/api/cart/save`,{
    method:'POST',
    body:params
  });
}
//获取购物车详情
export async function getCartList(params) {
  return request(`${Config.API_HOST}/api/userInfo/cartList?openid=${params.openid}`);
}
//更新购物车数量
export async function updateCartList(params) {
  return request(`${Config.API_HOST}/api/cart/update?id=${params.id}&number=${params.number}`);
}
//获取预支付信息
export async function getPayInfo(params) {
  return request(`${Config.API_HOST}/api/userInfo/pay`,{
    method:'POST',
    body:params
  })
}
//删除购物车
export async function deleteCart(params) {
  return request(`${Config.API_HOST}/api/cart/delete?id=${params.id}`)
}
//更新购物车状态
export async function updateCartStatus(params) {
  return request(`${Config.API_HOST}/api/cart/status?id=${params.id}&checked=${params.checked}`);
}



