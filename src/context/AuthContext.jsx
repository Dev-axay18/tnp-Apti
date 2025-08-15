import { createContext, useContext, useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

// Create AuthContext (named export)
export const AuthContext = createContext()

// AuthProvider (named export)
export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null)
  const [token, setToken] = useState(localStorage.getItem('token'))
  const [loading, setLoading] = useState(true)

  // Load user from token on app start
  useEffect(() => {
    if (token) {
      const mockUser = {
        id: '1',
        name: 'John Doe',
        email: 'john@example.com',
        role: 'student',
        avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face'
      }
      setUser(mockUser)
    }
    setLoading(false)
  }, [token])

  // Login function
  const login = async (email, password) => {
    await new Promise(resolve => setTimeout(resolve, 1000)) // simulate API
    const mockUser = {
      id: '1',
      name: 'John Doe',
      email: email,
      role: email.includes('admin') ? 'admin' : 'student',
      avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face'
    }
    const mockToken = 'mock-jwt-token-' + Date.now()
    setUser(mockUser)
    setToken(mockToken)
    localStorage.setItem('token', mockToken)
    return { success: true, user: mockUser }
  }

  // Register function
  const register = async (userData) => {
    await new Promise(resolve => setTimeout(resolve, 1000)) // simulate API
    const mockUser = {
      id: Date.now().toString(),
      name: userData.name,
      email: userData.email,
      role: 'student',
      avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face'
    }
    const mockToken = 'mock-jwt-token-' + Date.now()
    setUser(mockUser)
    setToken(mockToken)
    localStorage.setItem('token', mockToken)
    return { success: true, user: mockUser }
  }

  // Logout function
  const logout = () => {
    setUser(null)
    setToken(null)
    localStorage.removeItem('token')
  }

  // Update user function
  const updateUser = (updates) => {
    setUser(prev => ({ ...prev, ...updates }))
  }

  const value = {
    user,
    token,
    loading,
    login,
    register,
    logout,
    updateUser,
    isAuthenticated: !!user,
    isAdmin: user?.role === 'admin',
    isStudent: user?.role === 'student'
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-50 via-white to-blue-50">
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          className="text-center"
        >
          <div className="w-16 h-16 mx-auto mb-4 border-4 border-blue-500 rounded-full animate-spin"></div>
          <h2 className="text-xl font-semibold text-gray-700">Loading...</h2>
          <p className="text-gray-500">Preparing your experience</p>
        </motion.div>
      </div>
    )
  }

  return (
    <AuthContext.Provider value={value}>
      <AnimatePresence mode="wait">
        {children}
      </AnimatePresence>
    </AuthContext.Provider>
  )
}
