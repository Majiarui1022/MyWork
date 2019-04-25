import axios from 'axios'
// import store from '@/store'
import qs from 'qs'

// 创建axios实例
const service = axios.create({
  baseURL: process.env.BASE_URL,
  timeout: 15000 // 请求超时时间
})



service.interceptors.request.use(config => {
  // if(store.getters.token){   //如果有token让每一个请求都带上token
  //   // config.headers['CToken'] = getToken() // 让每个请求携带自定义token 请根据实际情况自行修改
  // }
  // config.method === 'post'
  //   ? config.data = qs.stringify({ ...config.data })
  //   : config.params = { ...config.params };
  return config;
}, error => {  //请求错误处理   
  console.log(error) //打印错误
}
);



export default service