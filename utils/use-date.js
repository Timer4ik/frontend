export const getDate = (date) => {
    const day = new Date(date).getDate()
    const month = new Date(date).toLocaleString('ru-RU', { month: 'short' })
    const year = new Date(date).getFullYear()
    return `${day} ${month} ${year}`
}
