export const formatDate = (date, options = {}) => {
  const defaultOptions = {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
    ...options
  }

  try {
    const dateObj = new Date(date)
    if (isNaN(dateObj.getTime())) {
      return 'Invalid Date'
    }
    
    return new Intl.DateTimeFormat('en-US', defaultOptions).format(dateObj)
  } catch (error) {
    return 'Invalid Date'
  }
}

export const formatRelativeTime = (date) => {
  const now = new Date()
  const targetDate = new Date(date)
  const diffInSeconds = Math.floor((now - targetDate) / 1000)

  if (diffInSeconds < 60) {
    return 'Just now'
  } else if (diffInSeconds < 3600) {
    const minutes = Math.floor(diffInSeconds / 60)
    return `${minutes} minute${minutes > 1 ? 's' : ''} ago`
  } else if (diffInSeconds < 86400) {
    const hours = Math.floor(diffInSeconds / 3600)
    return `${hours} hour${hours > 1 ? 's' : ''} ago`
  } else if (diffInSeconds < 2592000) {
    const days = Math.floor(diffInSeconds / 86400)
    return `${days} day${days > 1 ? 's' : ''} ago`
  } else {
    return formatDate(date, { month: 'short', day: 'numeric' })
  }
}

export const formatDuration = (minutes) => {
  if (minutes < 60) {
    return `${minutes} min`
  } else {
    const hours = Math.floor(minutes / 60)
    const remainingMinutes = minutes % 60
    return remainingMinutes > 0 ? `${hours}h ${remainingMinutes}m` : `${hours}h`
  }
}

export const isUpcoming = (date) => {
  return new Date(date) > new Date()
}

export const isToday = (date) => {
  const today = new Date()
  const targetDate = new Date(date)
  return today.toDateString() === targetDate.toDateString()
}
