import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)
export default new Vuex.Store({
  state: {
    editPostId: '',
    qryContent: '',
    articleId: '',
    searchShow: false,
    category: {id: '', name: ''}
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
    },
    setCategory (state, category) {
      state.category = category
    },
    setEditPostId (state, editPostId) {
      state.editPostId = editPostId
    }
  },
  getters: {
    getEditPostId: (state) => state.editPostId
  },
  actions: {

  }
})
