import Taro from '@tarojs/taro'
export const  request = (url, options) => {
  let newOptions = { ...options };
  if (newOptions.method === 'POST' || newOptions.method === 'PUT') {
    newOptions.header = {
      Accept: 'application/json',
      'Content-Type': 'application/json; charset=utf-8',
      ...newOptions.header
    };
    newOptions.data = JSON.stringify(newOptions.body);
  } else {
    newOptions.header = {
      'Content-Type': 'json',  // 这里是特殊处理
      ...newOptions.header
    }
  }
  return Taro.request({url, ...newOptions})
}

//上传
export const uploadFile  = (url,options) => {
   const params = {
     url:url,
     filePath:options.tempFilePaths || '',
     name:options.name,
     header:{
      'Content-Type':'multipart/form-data'
     },
     formData:{
       ...options
     }
   }
   return Taro.uploadFile(params);

}






