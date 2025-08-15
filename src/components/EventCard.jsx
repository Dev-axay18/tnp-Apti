import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { 
  Calendar, 
  Clock, 
  Users, 
  Award, 
  ArrowRight,
  Star,
  TrendingUp
} from 'lucide-react'
import { formatDate, formatDuration, isUpcoming, isToday } from '../utils/formatDate'

const EventCard = ({ event, variant = 'default' }) => {
  const {
    id,
    title,
    description,
    startDate,
    endDate,
    duration,
    maxParticipants,
    currentParticipants,
    difficulty,
    category,
    image,
    isRegistered,
    score,
    certificate
  } = event

  const isEventUpcoming = isUpcoming(startDate)
  const isEventToday = isToday(startDate)
  const participationRate = (currentParticipants / maxParticipants) * 100

  const difficultyColors = {
    easy: 'text-green-600 bg-green-100',
    medium: 'text-yellow-600 bg-yellow-100',
    hard: 'text-red-600 bg-red-100'
  }

  const categoryColors = {
    'Technical': 'bg-blue-100 text-blue-600',
    'Logical': 'bg-purple-100 text-purple-600',
    'Verbal': 'bg-green-100 text-green-600',
    'Numerical': 'bg-orange-100 text-orange-600',
    'General': 'bg-gray-100 text-gray-600'
  }

  const renderStatus = () => {
    if (isRegistered) {
      return (
        <div className="flex items-center space-x-2 text-primary-600">
          <div className="w-2 h-2 bg-primary-500 rounded-full"></div>
          <span className="text-sm font-medium">Registered</span>
        </div>
      )
    }
    
    if (isEventToday) {
      return (
        <div className="flex items-center space-x-2 text-accent-600">
          <div className="w-2 h-2 bg-accent-500 rounded-full animate-pulse"></div>
          <span className="text-sm font-medium">Today</span>
        </div>
      )
    }
    
    if (isEventUpcoming) {
      return (
        <div className="flex items-center space-x-2 text-green-600">
          <div className="w-2 h-2 bg-green-500 rounded-full"></div>
          <span className="text-sm font-medium">Upcoming</span>
        </div>
      )
    }
    
    return (
      <div className="flex items-center space-x-2 text-gray-600">
        <div className="w-2 h-2 bg-gray-500 rounded-full"></div>
        <span className="text-sm font-medium">Past</span>
      </div>
    )
  }

  const renderScore = () => {
    if (score !== undefined) {
      return (
        <div className="flex items-center space-x-2 text-accent-600">
          <Star className="w-4 h-4 fill-current" />
          <span className="font-semibold">{score}%</span>
        </div>
      )
    }
    return null
  }

  const renderCertificate = () => {
    if (certificate) {
      return (
        <div className="flex items-center space-x-2 text-green-600">
          <Award className="w-4 h-4" />
          <span className="text-sm font-medium">Certificate Available</span>
        </div>
      )
    }
    return null
  }

  if (variant === 'compact') {
    return (
      <motion.div
        whileHover={{ scale: 1.02, y: -2 }}
        className="card-hover p-4"
      >
        <div className="flex items-center justify-between">
          <div className="flex-1">
            <h3 className="font-semibold text-dark-900 mb-1">{title}</h3>
            <div className="flex items-center space-x-4 text-sm text-dark-500">
              <span className="flex items-center space-x-1">
                <Calendar className="w-4 h-4" />
                <span>{formatDate(startDate, { month: 'short', day: 'numeric' })}</span>
              </span>
              <span className="flex items-center space-x-1">
                <Clock className="w-4 h-4" />
                <span>{formatDuration(duration)}</span>
              </span>
            </div>
          </div>
          <Link
            to={`/events/${id}`}
            className="text-primary-600 hover:text-primary-700 transition-colors"
          >
            <ArrowRight className="w-5 h-5" />
          </Link>
        </div>
      </motion.div>
    )
  }

  return (
    <motion.div
      whileHover={{ scale: 1.02, y: -4 }}
      className="card-hover overflow-hidden group"
    >
      {/* Event Image */}
      <div className="relative h-48 bg-gradient-to-br from-primary-100 to-secondary-100 overflow-hidden">
        {image ? (
          <img
            src={image}
            alt={title}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center">
            <div className="text-6xl font-bold text-primary-200">{category?.[0] || 'T'}</div>
          </div>
        )}
        
        {/* Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
        
        {/* Status Badge */}
        <div className="absolute top-4 left-4">
          {renderStatus()}
        </div>
        
        {/* Difficulty Badge */}
        <div className="absolute top-4 right-4">
          <span className={`px-3 py-1 rounded-full text-xs font-medium ${difficultyColors[difficulty] || difficultyColors.medium}`}>
            {difficulty}
          </span>
        </div>
        
        {/* Category Badge */}
        <div className="absolute bottom-4 left-4">
          <span className={`px-3 py-1 rounded-full text-xs font-medium ${categoryColors[category] || categoryColors.General}`}>
            {category}
          </span>
        </div>
      </div>

      {/* Event Content */}
      <div className="p-6">
        <h3 className="text-xl font-bold text-dark-900 mb-2 group-hover:text-primary-600 transition-colors">
          {title}
        </h3>
        
        <p className="text-dark-600 mb-4 line-clamp-2">
          {description}
        </p>

        {/* Event Details */}
        <div className="grid grid-cols-2 gap-4 mb-4">
          <div className="flex items-center space-x-2 text-dark-500">
            <Calendar className="w-4 h-4" />
            <span className="text-sm">{formatDate(startDate, { month: 'short', day: 'numeric' })}</span>
          </div>
          
          <div className="flex items-center space-x-2 text-dark-500">
            <Clock className="w-4 h-4" />
            <span className="text-sm">{formatDuration(duration)}</span>
          </div>
          
          <div className="flex items-center space-x-2 text-dark-500">
            <Users className="w-4 h-4" />
            <span className="text-sm">{currentParticipants}/{maxParticipants}</span>
          </div>
          
          <div className="flex items-center space-x-2 text-dark-500">
            <TrendingUp className="w-4 h-4" />
            <span className="text-sm">{participationRate.toFixed(0)}% full</span>
          </div>
        </div>

        {/* Progress Bar for Participation */}
        <div className="mb-4">
          <div className="flex justify-between text-xs text-dark-500 mb-1">
            <span>Participation</span>
            <span>{participationRate.toFixed(0)}%</span>
          </div>
          <div className="w-full bg-dark-200 rounded-full h-2">
            <motion.div
              className="bg-gradient-to-r from-primary-500 to-secondary-500 h-2 rounded-full"
              initial={{ width: 0 }}
              animate={{ width: `${participationRate}%` }}
              transition={{ duration: 1, delay: 0.2 }}
            />
          </div>
        </div>

        {/* Score and Certificate */}
        {(renderScore() || renderCertificate()) && (
          <div className="flex items-center justify-between mb-4 p-3 bg-dark-50 rounded-lg">
            {renderScore()}
            {renderCertificate()}
          </div>
        )}

        {/* Action Button */}
        <div className="flex justify-between items-center">
          <Link
            to={`/events/${id}`}
            className="btn-primary flex items-center space-x-2"
          >
            <span>{isRegistered ? 'View Details' : 'Learn More'}</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
          
          {isRegistered && (
            <div className="text-sm text-green-600 font-medium">
              ✓ Registered
            </div>
          )}
        </div>
      </div>
    </motion.div>
  )
}

export default EventCard
