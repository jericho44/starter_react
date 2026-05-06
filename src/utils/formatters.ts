export const formatCurrency = (amount: number) => {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
  }).format(amount)
}

export const formatDate = (date: string | Date) => {
  return new Intl.DateTimeFormat('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  }).format(new Date(date))
}

export const formatNumber = (num: number) => {
  return new Intl.NumberFormat('en-US').format(num)
}

export const truncateString = (str: string, length: number) => {
  if (str.length <= length) return str
  return str.slice(0, length) + '...'
}
