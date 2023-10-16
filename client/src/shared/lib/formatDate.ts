export const formatDate = (date: Date) => {
  const month = date.getMonth() + 1
  const day = date.getDate()

  return `${date.getFullYear()}-${month > 9 ? month : '0' + month}-${day > 9 ? day : '0' + day}`
}