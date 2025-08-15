import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { Home, ArrowLeft, Search, BookOpen } from 'lucide-react'

const NotFound = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-dark-50 via-white to-primary-50 px-4">
      <div className="max-w-2xl mx-auto text-center">
        {/* 404 Number */}
        <motion.div
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="mb-8"
        >
          <h1 className="text-9xl font-bold gradient-text leading-none">
            404
          </h1>
        </motion.div>

        {/* Error Message */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mb-8"
        >
          <h2 className="text-3xl font-bold text-dark-900 mb-4">
            Page Not Found
          </h2>
          <p className="text-xl text-dark-600 leading-relaxed">
            Oops! The page you're looking for doesn't exist. It might have been moved, 
            deleted, or you entered the wrong URL.
          </p>
        </motion.div>

        {/* Action Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="flex flex-col sm:flex-row gap-4 justify-center mb-12"
        >
          <Link
            to="/"
            className="btn-primary flex items-center justify-center space-x-2"
          >
            <Home className="w-5 h-5" />
            <span>Go Home</span>
          </Link>
          
          <button
            onClick={() => window.history.back()}
            className="btn-outline flex items-center justify-center space-x-2"
          >
            <ArrowLeft className="w-5 h-5" />
            <span>Go Back</span>
          </button>
        </motion.div>

        {/* Quick Links */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="bg-white/60 backdrop-blur-sm rounded-2xl p-6 border border-white/20"
        >
          <h3 className="text-lg font-semibold text-dark-900 mb-4">
            Popular Pages
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <Link
              to="/events"
              className="flex items-center space-x-3 p-3 rounded-xl hover:bg-primary-50 transition-colors duration-200 group"
            >
              <div className="w-10 h-10 bg-primary-100 rounded-lg flex items-center justify-center group-hover:bg-primary-200 transition-colors">
                <BookOpen className="w-5 h-5 text-primary-600" />
              </div>
              <div className="text-left">
                <p className="font-medium text-dark-900">Aptitude Tests</p>
                <p className="text-sm text-dark-500">Browse available tests</p>
              </div>
            </Link>
            
            <Link
              to="/my-events"
              className="flex items-center space-x-3 p-3 rounded-xl hover:bg-secondary-50 transition-colors duration-200 group"
            >
              <div className="w-10 h-10 bg-secondary-100 rounded-lg flex items-center justify-center group-hover:bg-secondary-200 transition-colors">
                <Search className="w-5 h-5 text-secondary-600" />
              </div>
              <div className="text-left">
                <p className="font-medium text-dark-900">My Events</p>
                <p className="text-sm text-dark-500">View registered tests</p>
              </div>
            </Link>
            
            <Link
              to="/certificates"
              className="flex items-center space-x-3 p-3 rounded-xl hover:bg-accent-50 transition-colors duration-200 group"
            >
              <div className="w-10 h-10 bg-accent-100 rounded-lg flex items-center justify-center group-hover:bg-accent-200 transition-colors">
                <div className="w-5 h-5 bg-accent-500 rounded-full"></div>
              </div>
              <div className="text-left">
                <p className="font-medium text-dark-900">Certificates</p>
                <p className="text-sm text-dark-500">View achievements</p>
              </div>
            </Link>
          </div>
        </motion.div>

        {/* Help Text */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.8 }}
          className="mt-8 text-center"
        >
          <p className="text-dark-500 mb-2">
            Still having trouble? Contact our support team
          </p>
          <Link
            to="/support"
            className="text-primary-600 hover:text-primary-700 font-medium underline"
          >
            Get Help
          </Link>
        </motion.div>
      </div>
    </div>
  )
}

export default NotFound
