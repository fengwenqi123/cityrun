const me = {
  state: {
    userInfo: {}

  },
  mutations: {
    submitUserInfo(state, obj) {
      console.log(obj)
      state.userInfo = obj
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

export default me
