// Base endpoint
const HOST_URL =
// process.env.NODE_ENV === 'production'
//   ? 'https://datyayu.xyz'
  'http://localhost:3000'

export const POSTS_ENDPOINT = `${HOST_URL}/api/posts`
export const TAGS_ENDPOINT = `${HOST_URL}/api/tags`
