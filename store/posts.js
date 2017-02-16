export const state = {
  posts: [],
  activePost: {},
  fetching: true,
  page: 0
}

export const mutations = {
  startFetching (state) {
    state = {
      posts: [],
      activePost: {},
      fetching: true,
      page: 0
    }
  },

  updatePosts (state, payload) {
    const { posts, totalPosts, page } = payload

    state.page = page
    state.posts = posts
    state.totalPosts = totalPosts
    state.fetching = false
  },

  setActivePost (state, post) {
    state.activePost = post
    state.fetching = false
  }
}

export const getters = {
  fetching: state => state.fetching,
  currentPost: state => state.activePost,
  posts: state => state.posts,
  currentPage: state => state.page,
  hasPrevPage: state => state.page !== 0 && state.page !== 1,
  hasNextPage: state => state.page !== 0 && state.page < (state.totalPosts / 5)
}
