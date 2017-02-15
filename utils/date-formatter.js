import leftpad from 'left-pad'

export function formatDate (dateString) {
  const date = new Date(dateString)

  const formatedYear = date.getFullYear()
  const formatedMonth = leftpad(date.getMonth() + 1, 2, '0')
  const formatedDay = leftpad(date.getDate(), 2, '0')
  const formatedDate = `${formatedYear}.${formatedMonth}.${formatedDay}`

  return formatedDate
}
