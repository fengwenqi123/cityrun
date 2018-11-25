const getters = {
  address: state => state.home.address,
  city: state => state.home.city,
  shopLogo: state => state.home.shopLogo,
  shopNotice: state => state.home.shopNotice,
  avgStar: state => state.home.avgStar,
  orderCount: state => state.home.orderCount,
  shopTitle: state => state.home.shopTitle,
  latitude: state => state.home.latitude,
  longitude: state => state.home.longitude,
  userInfo: state => state.me.userInfo,
  addressInfo: state => state.address.addressInfo
}
export default getters
