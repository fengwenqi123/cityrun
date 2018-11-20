const home = {
  state: {
    address: '123',
    city: '北京',
    shopLogo: '',
    shopNotice: '',
    avgStar: '',
    orderCount: '',
    shopTitle: '',
    latitude: null,
    longitude: null

  },
  mutations: {
    submitAddress(state, obj) {
      state.address = obj.address
      state.city = obj.city
      state.latitude = obj.latitude
      state.longitude = obj.longitude
    },
    submitShopInfo(state, obj) {
      state.shopLogo = obj.shopLogo
      state.shopNotice = obj.shopNotice
      state.avgStar = obj.avgStar
      state.orderCount = obj.orderCount
      state.shopTitle = obj.shopTitle
    },
    abc(state) {
      console.log(state.address)
    }
  }
}

export default home
