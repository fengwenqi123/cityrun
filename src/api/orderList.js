import fly from '@/utils/request'
import qs from 'qs'

export function getOrdersList(obj) {
  const data = qs.stringify(obj)
  return fly.post("xorder/getOrdersList", data)
}
