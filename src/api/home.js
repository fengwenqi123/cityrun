import fly from '@/utils/request'
import qs from 'qs'

export function ShopLists(obj) {
  const data = qs.stringify(obj)
  return fly.post("xshop/getShopsList", data)
}
