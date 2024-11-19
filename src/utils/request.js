import axios from "axios";


// 创建axios实例
const service = axios.create({
  baseURL: "https://5akxnaj5l4.execute-api.ap-northeast-1.amazonaws.com/",
  timeout: 5000,
});

// request拦截器
service.interceptors.request.use(
  (config) => {

    return config;
  },
  (error) => {
    // Do something with request error
    console.log(error); // for debug
    Promise.reject(error);
  }
);

service.interceptors.response.use(
  (response) => {
    const res = response.data;
      return res;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default service;
