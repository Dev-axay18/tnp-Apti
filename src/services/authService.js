import apiClient from './apiClient'

export const authService = {
  // Login user
  login: async (credentials) => {
    try {
      // For now, return mock data - replace with actual API call
      await new Promise(resolve => setTimeout(resolve, 1000))
      
      if (credentials.email.includes('admin')) {
        return {
          user: {
            id: 'admin-1',
            name: 'Admin User',
            email: credentials.email,
            role: 'admin',
            avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face'
          },
          token: 'mock-admin-token-' + Date.now()
        }
      }
      
      return {
        user: {
          id: 'student-1',
          name: 'Student User',
          email: credentials.email,
          role: 'student',
          avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face'
        },
        token: 'mock-student-token-' + Date.now()
      }
    } catch (error) {
      throw new Error('Login failed: ' + error.message)
    }
  },

  // Register user
  register: async (userData) => {
    try {
      // For now, return mock data - replace with actual API call
      await new Promise(resolve => setTimeout(resolve, 1000))
      
      return {
        user: {
          id: Date.now().toString(),
          name: userData.name,
          email: userData.email,
          role: 'student',
          avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face'
        },
        token: 'mock-register-token-' + Date.now()
      }
    } catch (error) {
      throw new Error('Registration failed: ' + error.message)
    }
  },

  // Get current user
  getCurrentUser: async () => {
    try {
      // For now, return mock data - replace with actual API call
      const token = localStorage.getItem('token')
      if (!token) {
        throw new Error('No token found')
      }
      
      await new Promise(resolve => setTimeout(resolve, 500))
      
      if (token.includes('admin')) {
        return {
          id: 'admin-1',
          name: 'Admin User',
          email: 'admin@example.com',
          role: 'admin',
          avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face'
        }
      }
      
      return {
        id: 'student-1',
        name: 'Student User',
        email: 'student@example.com',
        role: 'student',
        avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face'
      }
    } catch (error) {
      throw new Error('Failed to get user: ' + error.message)
    }
  },

  // Update user profile
  updateProfile: async (userData) => {
    try {
      // For now, return mock data - replace with actual API call
      await new Promise(resolve => setTimeout(resolve, 1000))
      
      return {
        success: true,
        user: userData
      }
    } catch (error) {
      throw new Error('Profile update failed: ' + error.message)
    }
  },

  // Change password
  changePassword: async (passwordData) => {
    try {
      // For now, return mock data - replace with actual API call
      await new Promise(resolve => setTimeout(resolve, 1000))
      
      return {
        success: true,
        message: 'Password changed successfully'
      }
    } catch (error) {
      throw new Error('Password change failed: ' + error.message)
    }
  },

  // Forgot password
  forgotPassword: async (email) => {
    try {
      // For now, return mock data - replace with actual API call
      await new Promise(resolve => setTimeout(resolve, 1000))
      
      return {
        success: true,
        message: 'Password reset email sent'
      }
    } catch (error) {
      throw new Error('Password reset failed: ' + error.message)
    }
  },

  // Reset password
  resetPassword: async (token, newPassword) => {
    try {
      // For now, return mock data - replace with actual API call
      await new Promise(resolve => setTimeout(resolve, 1000))
      
      return {
        success: true,
        message: 'Password reset successfully'
      }
    } catch (error) {
      throw new Error('Password reset failed: ' + error.message)
    }
  },

  // Logout
  logout: async () => {
    try {
      // For now, just clear local storage - replace with actual API call
      localStorage.removeItem('token')
      return { success: true }
    } catch (error) {
      throw new Error('Logout failed: ' + error.message)
    }
  }
}

export default authService
