export function getImageUrl (prefix, size, isThumbnail = false) {
  const basePath = isThumbnail
    ? 'https://s3-us-west-1.amazonaws.com/datyayu-xyz/project-thumbnails'
    : 'https://s3-us-west-1.amazonaws.com/datyayu-xyz/projects'

  return `${basePath}/${prefix}-${size}.jpg`
}
