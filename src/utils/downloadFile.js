export const downloadFile = (url, filename) => {
  const link = document.createElement('a')
  link.href = url
  link.download = filename
  document.body.appendChild(link)
  link.click()
  document.body.removeChild(link)
}

export const downloadBlob = (blob, filename) => {
  const url = window.URL.createObjectURL(blob)
  downloadFile(url, filename)
  window.URL.revokeObjectURL(url)
}

export const downloadBase64 = (base64String, filename, mimeType = 'application/octet-stream') => {
  const byteCharacters = atob(base64String.split(',')[1] || base64String)
  const byteNumbers = new Array(byteCharacters.length)
  
  for (let i = 0; i < byteCharacters.length; i++) {
    byteNumbers[i] = byteCharacters.charCodeAt(i)
  }
  
  const byteArray = new Uint8Array(byteNumbers)
  const blob = new Blob([byteArray], { type: mimeType })
  
  downloadBlob(blob, filename)
}

export const downloadText = (text, filename, mimeType = 'text/plain') => {
  const blob = new Blob([text], { type: mimeType })
  downloadBlob(blob, filename)
}

export const downloadJSON = (data, filename) => {
  const jsonString = JSON.stringify(data, null, 2)
  downloadText(jsonString, filename, 'application/json')
}
