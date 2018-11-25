const address = {
  state: {
    addressInfo:null
  },
  mutations: {
    submitAddressInfo(state, obj) {
      state.addressInfo = obj
      // console.log(state.addressInfo)
    }
  }
}

export default address
