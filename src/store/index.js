/** Created by guangqiang on 2018-06-29 10:26:46 */

import Vue from 'vue'
import Vuex from 'vuex'
import shoppingCart from './modules/shoppingCart'
import home from './modules/home'
import me from './modules/me'
import address from './modules/address'
import getters from './getters'

Vue.use(Vuex)

const store = new Vuex.Store({
  modules: {
    home,
    me,
    address,
    shoppingCart: {
      namespaced: true,
      ...shoppingCart
    }
  },
  getters
})

export default store
