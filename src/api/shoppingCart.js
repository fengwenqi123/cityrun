import fly from '@/utils/request'

export function Lists(obj) {
  return fly.request("xshop/getGoodsList",obj,{
    method:"post",
    timeout:5000 //超时设置为5s
  })
}
