import fly from '@/utils/request'

export function ShopLists(obj) {
  return fly.request("xshop/getShopsList",obj,{
    method:"post",
    timeout:5000 //超时设置为5s
  })
}
