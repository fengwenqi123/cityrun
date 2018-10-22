const home = {
  state: {
    address:'123',
    city:'北京',
  },
  mutations: {
    submitAddress (state,obj) {
      state.address = obj.address
      state.city = obj.city
    },
    abc(state){
      console.log(state.address)
    }
  }
}

export default home
