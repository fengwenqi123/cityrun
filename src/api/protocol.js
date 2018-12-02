import fly from '@/utils/request'
import qs from 'qs'

export function getSysProtocolList() {
  return fly.post("xsys/getSysProtocolList")
}
