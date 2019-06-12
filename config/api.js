// Base endpoint
const HOST_URL =
  process.env.NODE_ENV === "production"
    ? "https://datyayu.dev"
    : "http://localhost:3000"

// const HOST_URL = "http://localhost:3000";

export const POSTS_ENDPOINT = `${HOST_URL}/api/posts`
export const TAGS_ENDPOINT = `${HOST_URL}/api/tags`
