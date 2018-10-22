const store = {
  state: {
    address:'123',
    city:'北京',
  },
  getters:{
    // 获取 用户信息
    'getAddress': function (state) {
      return state.address
    },
    'getCity': function (state) {
      return state.city
    }
  },
  mutations: {
    submitAddress (state,obj) {
      state.address = obj.address
      state.city = obj.city
    },
    setIdentity (state,data) {
      state.userInfo.role = data
    },
  }
}

export default store
