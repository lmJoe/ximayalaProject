import axios from 'axios';
import Config from 'react-native-config';
/**设置默认地址 */
axios.defaults.baseURL = Config.API_URL;
/**请求拦截器设置 use()可接收一个请求成功的函数*/
axios.interceptors.request.use(function(config){
    //请求头部添加icode值
    config.headers = {
        icode:'EB55BA7A6492A03A',
    }
    console.log('请求config',config);
    return config;
},function(error){
    return Promise.reject(error);
});
//响应拦截器设置
axios.interceptors.response.use(function(response){
    console.log('响应数据',response);
    return response.data;
},function(error){
    return Promise.reject(error);
})