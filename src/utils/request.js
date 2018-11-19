var Fly = require("flyio/dist/npm/wx") //npm引入方式
var fly = new Fly(); //创建fly实例
fly.interceptors.request.use((request) => {
  //给所有请求添加自定义header
  request.headers["X-Tag"] = "flyio";
  // request.headers["content-type"] = "application/x-www-form-urlencoded";
  //打印出请求体
  console.log(request.body)
  return request;
})
fly.config.baseURL="https://lemon-sea.com/cityRun/"
export default fly
