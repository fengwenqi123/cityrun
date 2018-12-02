import fly from '@/utils/request'
import qs from 'qs'

export function addSysFeedBack(userId, content, mobilePhone, type) {
  const data = qs.stringify({
    userId, content, mobilePhone, type
  })
  return fly.post("sys/addSysFeedBack.do", data)
}
