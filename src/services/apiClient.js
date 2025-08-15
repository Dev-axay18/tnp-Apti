// Base API client configuration
// This will be used when you add the backend

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api'

export const apiClient = {
  baseURL: API_BASE_URL,
  
  // Default headers
  headers: {
    'Content-Type': 'application/json',
  },
  
  // Get auth token from localStorage
  getAuthToken: () => {
    return localStorage.getItem('token')
  },
  
  // Add auth header to requests
  getAuthHeaders: () => {
    const token = localStorage.getItem('token')
    return token ? { Authorization: `Bearer ${token}` } : {}
  },
  
  // Make authenticated request
  request: async (endpoint, options = {}) => {
    const url = `${API_BASE_URL}${endpoint}`
    const headers = {
      ...apiClient.headers,
      ...apiClient.getAuthHeaders(),
      ...options.headers,
    }
    
    try {
      const response = await fetch(url, {
        ...options,
        headers,
      })
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`)
      }
      
      return await response.json()
    } catch (error) {
      console.error('API request failed:', error)
      throw error
    }
  },
  
  // GET request
  get: (endpoint) => apiClient.request(endpoint, { method: 'GET' }),
  
  // POST request
  post: (endpoint, data) => apiClient.request(endpoint, {
    method: 'POST',
    body: JSON.stringify(data),
  }),
  
  // PUT request
  put: (endpoint, data) => apiClient.request(endpoint, {
    method: 'PUT',
    body: JSON.stringify(data),
  }),
  
  // DELETE request
  delete: (endpoint) => apiClient.request(endpoint, { method: 'DELETE' }),
  
  // Upload file
  upload: (endpoint, formData) => {
    const url = `${API_BASE_URL}${endpoint}`
    const headers = {
      ...apiClient.getAuthHeaders(),
    }
    
    return fetch(url, {
      method: 'POST',
      headers,
      body: formData,
    })
  },
}

export default apiClient
