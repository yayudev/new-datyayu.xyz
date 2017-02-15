export const state = {
  posts: [],
  activePost: {},
  fetching: true
}

export const mutations = {
  startFetching () {
    return { ...state, fetching: true }
  },

  updatePosts (state, posts) {
    state.posts = posts
  },

  setActivePost (state, post) {
    state.activePost = post
    state.fetching = false
  }
}

export const getters = {
  fetching: state => state.fetching,
  currentPost: state => state.activePost
}
