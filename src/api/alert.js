import fly from '@/utils/request'
import qs from 'qs'

export function getShopByWxUserId(wxUserId) {
  const data = qs.stringify({
    wxUserId
  })
  return fly.post("xshop/getShopByWxUserId", data)
}
