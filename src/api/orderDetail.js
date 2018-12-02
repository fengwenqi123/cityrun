import fly from '@/utils/request'
import qs from 'qs'

export function getList(id) {
  const data = qs.stringify({
    id
  })
  return fly.post("xorder/getOrdersById", data)
}

export function payOrdersInfo(id) {
  const data = qs.stringify({
    id
  })
  return fly.post("xorder/payOrdersInfo", data)
}

export function updateOrdersInfo(id, status) {
  const data = qs.stringify({
    id,
    status
  })
  return fly.post("xorder/updateOrdersInfo", data)
}

export function addOrderCommentInfo(content, commentStar, commentPic, orderId, userId, userNickName) {
  const data = qs.stringify({
    content, commentStar, commentPic, orderId, userId, userNickName
  })
  return fly.post("xorder/addOrderCommentInfo.do", data)
}
