/** Created by guangqiang on 2018-06-29 10:26:46 */

import Vue from 'vue'
import Vuex from 'vuex'
import shoppingCart from './modules/shoppingCart'
import home from './modules/home'

Vue.use(Vuex)

const store = new Vuex.Store({
  modules: {
    shoppingCart: {
      namespaced: true,
      ...shoppingCart
    },
    home
  }
})

export default store
