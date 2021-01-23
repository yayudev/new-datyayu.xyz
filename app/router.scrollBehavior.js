export default function scrollBehavior(to, from, savedPosition) {
  if (savedPosition) {
    return savedPosition
  }

  const $header = document.querySelector(".header")
  if ($header) {
    $header.scrollIntoView()
  }

  return { x: 0, y: 0 }
}
