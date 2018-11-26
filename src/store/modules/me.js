const me = {
  state: {
    userInfo: {},
    id: null

  },
  mutations: {
    submitUserInfo(state, obj) {
      state.userInfo = obj
      state.id = obj.id
    },
    submitShopInfo(state, obj) {
      state.shopLogo = obj.shopLogo
      state.shopNotice = obj.shopNotice
      state.avgStar = obj.avgStar
      state.orderCount = obj.orderCount
      state.shopTitle = obj.shopTitle
    }
  }
}

export default me
