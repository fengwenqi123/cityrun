import fly from '@/utils/request'
import qs from 'qs'

export function submitAddress(obj) {
  const data = qs.stringify(obj)
  return fly.post("xwx/addUserAddress", data)
}

export function getAddress(obj) {
  const data = qs.stringify(obj)
  return fly.post("xwx/getUserAddressList", data)
}

export function DefaultAddress(obj) {
  const data = qs.stringify(obj)
  return fly.post("xwx/updateDefaultAddress", data)
}

export function updateAddress(obj) {
  const data = qs.stringify(obj)
  return fly.post("xwx/updateUserAddres", data)
}
