import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)
export default new Vuex.Store({
  state: {
    qryContent: ''
  },
  mutations: {
    setQryContent (state, content) {
      state.qryContent = content
    }
  },
  actions: {

  }
})
