const config = {
    development: {
      API_HOST: 'http://192.168.101.7:7001',
      HOST_TITLE: '(开发环境)',
      QINIU_KEY: '',
      BAIDU_MAP_AK: '',
      AMAP_KEY: '',
      PUSHY_APP_KEY: {
        ios: '',
        android: ''
      },
      WECHAT_APP_ID: ''
    },
    staging: {
      API_HOST: 'https://www.eureka.net.cn',
      HOST_TITLE: '(测试环境)',
      QINIU_KEY: '',
      BAIDU_MAP_AK: '',
      AMAP_KEY: '',
      PUSHY_APP_KEY: {
        ios: '',
        android: ''
      },
      WECHAT_APP_ID: ''
    },
    production: {
      API_HOST: 'https://www.eureka.net.cn',
      HOST_TITLE: '(生产环境)',
      QINIU_KEY: '',
      BAIDU_MAP_AK: '',
      AMAP_KEY: '',
      PUSHY_APP_KEY: {
        ios: '',
        android: ''
      },
      WECHAT_APP_ID: ''
    },
    common: {
      VERSION_NAME: {
        ios: '1.0.0',
        android: '1.0.0'
      },
    
    }
  };
  
  export default {
    ...config.production,
    ...config.development,
    ...config.common
  };