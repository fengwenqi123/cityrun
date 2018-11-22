import fly from '@/utils/request'
import qs from 'qs'

export function getUserInfos(code,iv,encryptedData) {
  const data = qs.stringify({
    code,iv,encryptedData
    })
  return fly.post("xwx/getWxUserInfo", data)
}
