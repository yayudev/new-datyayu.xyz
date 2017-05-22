/**
 * Creates the full to a url to a screenshot image
 * based on the project prefix.
 *
 * @param {Sting} prefix Project name.
 * @param {String} size Size of the screenshot.
 * @param {Boolean} isThumbnail Whether the image is a thumbnail or full size.
 * @return {String} Image's url.
 */
export function getImageUrl (prefix, size, isThumbnail = false) {
  const basePath = isThumbnail
    ? 'https://s3-us-west-1.amazonaws.com/datyayu-xyz/project-thumbnails'
    : 'https://s3-us-west-1.amazonaws.com/datyayu-xyz/projects'

  return `${basePath}/${prefix}-${size}.jpg`
}
