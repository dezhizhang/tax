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
export async function mediaDetailInfo(params) {
  return request(`${Config.API_HOST}/api/v1/media/detail/info?id=${params.id}`)
}
//提交维修
export async function uploadInfo(params) {
  return uploadFile(`${Config.API_HOST}/api/maintain/upload`,params);
} 

//购物车
export async function userInfoCartSave(params) {
    return request(`${Config.API_HOST}/api/cart/save`,{
      method:'POST',
    body:params
  });
}

