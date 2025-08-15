import { useState } from 'react'
import { Link, useNavigate, useLocation } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { useAuth } from '../../hooks/useAuth'
import { 
  Eye, 
  EyeOff, 
  Mail, 
  Lock, 
  User, 
  BookOpen, 
  Shield,
  ArrowRight,
  CheckCircle
} from 'lucide-react'
import Loader from '../../components/Loader'

const Login = () => {
  const [loginType, setLoginType] = useState('student') // 'student' or 'admin'
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    name: ''
  })
  const [showPassword, setShowPassword] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState('')
  const [success, setSuccess] = useState('')

  const { login, register } = useAuth()
  const navigate = useNavigate()
  const location = useLocation()

  const from = location.state?.from?.pathname || '/'

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
    setError('')
  }

  const handleGoogleLogin = async () => {
    try {
      setIsLoading(true)
      setError('')
      
      // Simulate Google OAuth - replace with actual Google OAuth implementation
      await new Promise(resolve => setTimeout(resolve, 2000))
      
      const mockUser = {
        id: Date.now().toString(),
        name: 'Google User',
        email: 'googleuser@gmail.com',
        role: 'student',
        avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face'
      }
      
      const mockToken = 'google-oauth-token-' + Date.now()
      
      // Store in localStorage (in real app, this would be handled by OAuth)
      localStorage.setItem('token', mockToken)
      localStorage.setItem('user', JSON.stringify(mockUser))
      
      setSuccess('Successfully logged in with Google!')
      
      setTimeout(() => {
        navigate(from, { replace: true })
      }, 1000)
      
    } catch (error) {
      setError('Google login failed. Please try again.')
    } finally {
      setIsLoading(false)
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    
    if (loginType === 'student' && !formData.name) {
      setError('Name is required for student registration')
      return
    }
    
    if (!formData.email || !formData.password) {
      setError('Please fill in all required fields')
      return
    }

    try {
      setIsLoading(true)
      setError('')
      
      let result
      
      if (loginType === 'student') {
        // For students, always register (or login if exists)
        result = await register({
          name: formData.name,
          email: formData.email,
          password: formData.password
        })
      } else {
        // For admins, only login with credentials
        result = await login({
          email: formData.email,
          password: formData.password
        })
      }
      
      if (result.success) {
        setSuccess(loginType === 'student' ? 'Registration successful!' : 'Login successful!')
        setTimeout(() => {
          navigate(from, { replace: true })
        }, 1000)
      } else {
        setError(result.error || 'Authentication failed')
      }
    } catch (error) {
      setError('An unexpected error occurred. Please try again.')
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-dark-50 via-white to-primary-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center"
        >
          <div className="flex justify-center mb-6">
            <div className="w-16 h-16 bg-gradient-to-r from-primary-500 to-secondary-500 rounded-2xl flex items-center justify-center">
              <span className="text-white font-bold text-3xl">A</span>
            </div>
          </div>
          <h2 className="text-3xl font-bold text-dark-900 mb-2">
            Welcome to AptitudePro
          </h2>
          <p className="text-dark-600">
            {loginType === 'student' 
              ? 'Join our platform and start your aptitude testing journey'
              : 'Access your admin dashboard'
            }
          </p>
        </motion.div>

        {/* Login Type Toggle */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="bg-white/60 backdrop-blur-sm rounded-2xl p-1 border border-white/20"
        >
          <div className="flex">
            <button
              onClick={() => setLoginType('student')}
              className={`flex-1 flex items-center justify-center space-x-2 py-3 px-4 rounded-xl font-medium transition-all duration-300 ${
                loginType === 'student'
                  ? 'bg-white text-primary-600 shadow-soft'
                  : 'text-dark-600 hover:text-primary-600'
              }`}
            >
              <BookOpen className="w-4 h-4" />
              <span>Student</span>
            </button>
            <button
              onClick={() => setLoginType('admin')}
              className={`flex-1 flex items-center justify-center space-x-2 py-3 px-4 rounded-xl font-medium transition-all duration-300 ${
                loginType === 'admin'
                  ? 'bg-white text-primary-600 shadow-soft'
                  : 'text-dark-600 hover:text-primary-600'
              }`}
            >
              <Shield className="w-4 h-4" />
              <span>Admin</span>
            </button>
          </div>
        </motion.div>

        {/* Google OAuth for Students */}
        {loginType === 'student' && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-4"
          >
            <button
              onClick={handleGoogleLogin}
              disabled={isLoading}
              className="w-full flex items-center justify-center space-x-3 py-3 px-4 border-2 border-dark-200 rounded-xl font-medium text-dark-700 hover:border-primary-500 hover:text-primary-600 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isLoading ? (
                <Loader size="sm" variant="dots" />
              ) : (
                <>
                  <svg className="w-5 h-5" viewBox="0 0 24 24">
                    <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                    <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                    <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                    <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
                  </svg>
                  <span>Continue with Google</span>
                </>
              )}
            </button>
            
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-dark-200" />
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-2 bg-transparent text-dark-500">or register with email</span>
              </div>
            </div>
          </motion.div>
        )}

        {/* Form */}
        <motion.form
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          onSubmit={handleSubmit}
          className="space-y-6"
        >
          {/* Name field for students */}
          {loginType === 'student' && (
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-dark-700 mb-2">
                Full Name
              </label>
              <div className="relative">
                <User className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-dark-400" />
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  className="input-field pl-10"
                  placeholder="Enter your full name"
                  required
                />
              </div>
            </div>
          )}

          {/* Email field */}
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-dark-700 mb-2">
              Email Address
            </label>
            <div className="relative">
              <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-dark-400" />
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                className="input-field pl-10"
                placeholder={loginType === 'student' ? 'student@example.com' : 'admin@example.com'}
                required
              />
            </div>
          </div>

          {/* Password field */}
          <div>
            <label htmlFor="password" className="block text-sm font-medium text-dark-700 mb-2">
              Password
            </label>
            <div className="relative">
              <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-dark-400" />
              <input
                type={showPassword ? 'text' : 'password'}
                id="password"
                name="password"
                value={formData.password}
                onChange={handleInputChange}
                className="input-field pr-10 pl-10"
                placeholder="Enter your password"
                required
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-dark-400 hover:text-dark-600"
              >
                {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
              </button>
            </div>
          </div>

          {/* Error/Success Messages */}
          <AnimatePresence>
            {error && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="flex items-center space-x-2 p-3 bg-red-50 border border-red-200 rounded-lg text-red-600"
              >
                <div className="w-5 h-5 bg-red-100 rounded-full flex items-center justify-center">
                  <span className="text-red-500 text-xs">!</span>
                </div>
                <span className="text-sm">{error}</span>
              </motion.div>
            )}
            
            {success && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="flex items-center space-x-2 p-3 bg-green-50 border border-green-200 rounded-lg text-green-600"
              >
                <CheckCircle className="w-5 h-5" />
                <span className="text-sm">{success}</span>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={isLoading}
            className="w-full btn-primary flex items-center justify-center space-x-2 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isLoading ? (
              <Loader size="sm" variant="dots" />
            ) : (
              <>
                <span>
                  {loginType === 'student' ? 'Create Account' : 'Sign In'}
                </span>
                <ArrowRight className="w-4 h-4" />
              </>
            )}
          </button>
        </motion.form>

        {/* Footer Links */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center space-y-4"
        >
          {loginType === 'student' ? (
            <p className="text-dark-600">
              Already have an account?{' '}
              <button
                onClick={() => setLoginType('admin')}
                className="text-primary-600 hover:text-primary-700 font-medium"
              >
                Sign in as admin
              </button>
            </p>
          ) : (
            <p className="text-dark-600">
              Need to register?{' '}
              <button
                onClick={() => setLoginType('student')}
                className="text-primary-600 hover:text-primary-700 font-medium"
              >
                Create student account
              </button>
            </p>
          )}
          
          <p className="text-xs text-dark-500">
            By continuing, you agree to our{' '}
            <Link to="/terms" className="text-primary-600 hover:underline">
              Terms of Service
            </Link>{' '}
            and{' '}
            <Link to="/privacy" className="text-primary-600 hover:underline">
              Privacy Policy
            </Link>
          </p>
        </motion.div>
      </div>
    </div>
  )
}

export default Login
