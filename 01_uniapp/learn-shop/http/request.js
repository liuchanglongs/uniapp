import wxRequest from "wechat-request";

const Http = wxRequest.create({
  baseURL:'https://api-ugo-web.itheima.net/api/'
});

Http.interceptors.request.use((config)=>{
  // console.log('config------', config);
  wx.showLoading({
    title:'加载中......'
  });
  return config;
}, (err)=>{
  // console.log('err--------', err);
  return Promise.reject(err);
});

Http.interceptors.response.use((res)=>{
  // console.log(res);
  wx.hideLoading();
  return res;
}, (err)=>{
  // console.log(err);
  wx.hideLoading();
  return Promise.reject(err);
})

// Http.get('v1/home/swiperdatad').then(res =>{
//   // console.log('请求：：：：：：', res)
// })
export default Http