import fly from '@/utils/request'
import qs from 'qs'

export function Lists(obj) {
  const data = qs.stringify(obj)
  return fly.request("xshop/getGoodsList", data, {
    method: "post",
    timeout: 5000 //超时设置为5s
  })
}

export function commentList(obj) {
  const data = qs.stringify(obj)
  return fly.request("xshop/getShopsCommentList", data, {
    method: "post",
    timeout: 5000 //超时设置为5s
  })
}

export function GoodsTypeList(shopId) {
  const data = qs.stringify({shopId})
  return fly.request("xshop/getGoodsTypeList", data, {
    method: "post",
    timeout: 5000 //超时设置为5s
  })
}

export function getShop(id, wxUserId, latitude, longitude) {
  const data = qs.stringify({
    id, wxUserId, latitude, longitude
  })
  return fly.request("xshop/getShopById", data, {
    method: "post",
    timeout: 5000 //超时设置为5s
  })
}

export function createOrder(obj) {
  const data = qs.stringify(obj)
  return fly.request("xorder/createOrdersInfo", data, {
    method: "post",
    timeout: 5000 //超时设置为5s
  })
}
