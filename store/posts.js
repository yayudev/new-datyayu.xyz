export const state = () => ({
  posts: [],
  activePost: {},
  fetching: true,
  page: 0,
  tagName: "",
  error: false,
})

export const mutations = {
  startFetching(state) {
    state.posts = []
    state.activePost = {}
    state.fetching = true
    state.page = 0
    state.tagName = ""
    state.error = false
  },

  errorFetching(state) {
    state.error = true
  },

  updatePosts(state, payload) {
    const { posts, totalPosts, page } = payload

    state.page = page
    state.posts = posts
    state.totalPosts = totalPosts
    state.fetching = false
    state.error = false
  },

  setActivePost(state, post) {
    state.activePost = post
    state.fetching = false
  },

  setTagName(state, tagName) {
    state.tagName = tagName
  },
}

export const getters = {
  tagName: (state) => state.tagName,
  fetching: (state) => state.fetching,
  currentPost: (state) => state.activePost,
  posts: (state) => state.posts,
  currentPage: (state) => state.page,
  hasPrevPage: (state) => state.page !== 0 && state.page !== 1,
  hasNextPage: (state) => state.page !== 0 && state.page < state.totalPosts / 5,
  error: (state) => state.error,
}
