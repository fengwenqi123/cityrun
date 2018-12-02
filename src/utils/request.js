var Fly = require("flyio/dist/npm/wx") //npm引入方式
var fly = new Fly(); //创建fly实例
fly.interceptors.request.use((request) => {
  //给所有请求添加自定义header
  var wxToken=''
  if(wx.getStorageSync('wxToken')){
    wxToken=wx.getStorageSync('wxToken')
  }
  request.headers["wxToken"] = wxToken;
  // request.headers["content-type"] = "application/x-www-form-urlencoded";
  //打印出请求体
  // console.log(request.body)
  return request;
})
fly.config.baseURL = "https://lemon-sea.com/cityRun/"
// fly.config.baseURL = "http://rc111x.imwork.net:45219/cityRun/"
export default fly
