const shop = {
  state: {
    shopData:null,
    shopName:null
  },
  mutations: {
    submitData(state, obj) {
      state.shopData = obj
    },
    submitOther(state, shopName) {
      state.shopName = shopName
      console.log( state.shopName)
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

export default shop
