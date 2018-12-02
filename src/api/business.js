import fly from '@/utils/request'
import qs from 'qs'

export function getTime(type) {
  const data = qs.stringify({
    type
  })
  return fly.post("xshop/getTimePSet", data)
}

export function addShopInfo(obj) {
  const data = qs.stringify(obj)
  return fly.post("xshop/addShopInfo.do", data)
}
