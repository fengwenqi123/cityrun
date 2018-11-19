const getters = {
  address: state => state.home.address,
  city: state => state.home.city,
  shopLogo: state => state.home.shopLogo,
  shopNotice: state => state.home.shopNotice,
  avgStar: state => state.home.avgStar,
  orderCount: state => state.home.orderCount,
  shopTitle: state => state.home.shopTitle,
}
export default getters
