import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)
export default new Vuex.Store({
  state: {
    qryContent: '',
    articleId: '',
    searchShow: false
  },
  mutations: {
    setQryContent (state, content) {
      state.qryContent = content
    },
    setArticleId (state, id) {
      state.articleId = id
    },
    setSearchShow (state, show) {
      state.searchShow = show
    }
  },
  actions: {

  }
})
