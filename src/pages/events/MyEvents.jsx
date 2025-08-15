import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Link } from 'react-router-dom'
import { 
  Calendar, 
  Clock, 
  MapPin, 
  Users, 
  Award, 
  Star,
  Eye,
  Download,
  CheckCircle,
  Clock as ClockIcon
} from 'lucide-react'
import { formatDate, formatDuration } from '../../utils/formatDate'

const MyEvents = () => {
  const [events, setEvents] = useState([])
  const [loading, setLoading] = useState(true)
  const [filter, setFilter] = useState('all') // all, upcoming, completed, ongoing

  // Mock data - replace with actual API call
  useEffect(() => {
    const fetchMyEvents = async () => {
      try {
        await new Promise(resolve => setTimeout(resolve, 1000))
        
        const mockEvents = [
          {
            id: '1',
            title: 'Advanced Technical Aptitude Test',
            description: 'Comprehensive assessment covering programming, algorithms, data structures, and system design.',
            startDate: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
            endDate: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000 + 2 * 60 * 60 * 1000),
            duration: 120,
            location: 'Online',
            category: 'Technical',
            difficulty: 'hard',
            status: 'upcoming',
            score: null,
            certificate: null,
            registrationDate: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000)
          },
          {
            id: '2',
            title: 'Logical Reasoning Assessment',
            description: 'Test your logical thinking, pattern recognition, and problem-solving abilities.',
            startDate: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000),
            endDate: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000 + 90 * 60 * 1000),
            duration: 90,
            location: 'Online',
            category: 'Logical',
            difficulty: 'medium',
            status: 'completed',
            score: 85,
            certificate: {
              id: 'cert-1',
              downloadUrl: '#',
              issuedDate: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000)
            },
            registrationDate: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000)
          },
          {
            id: '3',
            title: 'Verbal Communication Skills',
            description: 'Evaluate your verbal reasoning, vocabulary, and communication effectiveness.',
            startDate: new Date(Date.now() + 1 * 24 * 60 * 60 * 1000),
            endDate: new Date(Date.now() + 1 * 24 * 60 * 60 * 1000 + 60 * 60 * 1000),
            duration: 60,
            location: 'Online',
            category: 'Verbal',
            difficulty: 'easy',
            status: 'upcoming',
            score: null,
            certificate: null,
            registrationDate: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000)
          },
          {
            id: '4',
            title: 'Numerical Analysis Challenge',
            description: 'Advanced mathematical reasoning, statistics, and quantitative analysis.',
            startDate: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000),
            endDate: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000 + 150 * 60 * 1000),
            duration: 150,
            location: 'Online',
            category: 'Numerical',
            difficulty: 'hard',
            status: 'completed',
            score: 78,
            certificate: {
              id: 'cert-2',
              downloadUrl: '#',
              issuedDate: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000)
            },
            registrationDate: new Date(Date.now() - 4 * 24 * 60 * 60 * 1000)
          }
        ]
        
        setEvents(mockEvents)
      } catch (error) {
        console.error('Failed to fetch events:', error)
      } finally {
        setLoading(false)
      }
    }

    fetchMyEvents()
  }, [])

  const getStatusColor = (status) => {
    switch (status) {
      case 'upcoming':
        return 'text-blue-600 bg-blue-100'
      case 'ongoing':
        return 'text-green-600 bg-green-100'
      case 'completed':
        return 'text-purple-600 bg-purple-100'
      default:
        return 'text-gray-600 bg-gray-100'
    }
  }

  const getStatusIcon = (status) => {
    switch (status) {
      case 'upcoming':
        return <ClockIcon className="w-4 h-4" />
      case 'ongoing':
        return <ClockIcon className="w-4 h-4" />
      case 'completed':
        return <CheckCircle className="w-4 h-4" />
      default:
        return <ClockIcon className="w-4 h-4" />
    }
  }

  const filteredEvents = events.filter(event => {
    if (filter === 'all') return true
    return event.status === filter
  })

  const stats = {
    total: events.length,
    upcoming: events.filter(e => e.status === 'upcoming').length,
    completed: events.filter(e => e.status === 'completed').length,
    averageScore: events.filter(e => e.score).length > 0 
      ? Math.round(events.filter(e => e.score).reduce((sum, e) => sum + e.score, 0) / events.filter(e => e.score).length)
      : 0
  }

  if (loading) {
    return (
      <div className="section-padding">
        <div className="container-custom">
          <div className="flex justify-center items-center min-h-[400px]">
            <div className="text-center">
              <div className="w-16 h-16 mx-auto mb-4">
                <div className="spinner"></div>
              </div>
              <h2 className="text-xl font-semibold text-dark-700">Loading your events...</h2>
              <p className="text-dark-500">Fetching your registered aptitude tests</p>
            </div>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="section-padding">
      <div className="container-custom">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <h1 className="text-4xl font-bold text-dark-900 mb-4">
            My Aptitude Tests
          </h1>
          <p className="text-xl text-dark-600 max-w-3xl mx-auto">
            Track your registered tests, view scores, and download certificates for completed assessments.
          </p>
        </motion.div>

        {/* Stats Cards */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8"
        >
          <div className="card text-center p-6">
            <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center mx-auto mb-4">
              <Calendar className="w-6 h-6 text-blue-600" />
            </div>
            <h3 className="text-2xl font-bold text-dark-900">{stats.total}</h3>
            <p className="text-dark-600">Total Tests</p>
          </div>
          
          <div className="card text-center p-6">
            <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center mx-auto mb-4">
              <ClockIcon className="w-6 h-6 text-green-600" />
            </div>
            <h3 className="text-2xl font-bold text-dark-900">{stats.upcoming}</h3>
            <p className="text-dark-600">Upcoming</p>
          </div>
          
          <div className="card text-center p-6">
            <div className="w-12 h-12 bg-purple-100 rounded-xl flex items-center justify-center mx-auto mb-4">
              <CheckCircle className="w-6 h-6 text-purple-600" />
            </div>
            <h3 className="text-2xl font-bold text-dark-900">{stats.completed}</h3>
            <p className="text-dark-600">Completed</p>
          </div>
          
          <div className="card text-center p-6">
            <div className="w-12 h-12 bg-yellow-100 rounded-xl flex items-center justify-center mx-auto mb-4">
              <Star className="w-6 h-6 text-yellow-600" />
            </div>
            <h3 className="text-2xl font-bold text-dark-900">{stats.averageScore}%</h3>
            <p className="text-dark-600">Avg. Score</p>
          </div>
        </motion.div>

        {/* Filter Tabs */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="flex flex-wrap gap-2 mb-8 justify-center"
        >
          {[
            { key: 'all', label: 'All Events', count: stats.total },
            { key: 'upcoming', label: 'Upcoming', count: stats.upcoming },
            { key: 'ongoing', label: 'Ongoing', count: 0 },
            { key: 'completed', label: 'Completed', count: stats.completed }
          ].map((tab) => (
            <button
              key={tab.key}
              onClick={() => setFilter(tab.key)}
              className={`px-6 py-3 rounded-xl font-medium transition-all duration-300 ${
                filter === tab.key
                  ? 'bg-primary-500 text-white shadow-glow'
                  : 'bg-white/60 text-dark-600 hover:bg-primary-50 hover:text-primary-600'
              }`}
            >
              {tab.label} ({tab.count})
            </button>
          ))}
        </motion.div>

        {/* Events Grid */}
        <AnimatePresence mode="wait">
          {filteredEvents.length === 0 ? (
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="text-center py-16"
            >
              <div className="w-24 h-24 bg-dark-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <Calendar className="w-12 h-12 text-dark-400" />
              </div>
              <h3 className="text-xl font-semibold text-dark-700 mb-2">No events found</h3>
              <p className="text-dark-500 mb-6">
                {filter === 'all' 
                  ? "You haven't registered for any aptitude tests yet."
                  : `No ${filter} events found.`
                }
              </p>
              <Link to="/events" className="btn-primary">
                Browse Available Tests
              </Link>
            </motion.div>
          ) : (
            <motion.div
              key={filter}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="grid grid-cols-1 lg:grid-cols-2 gap-8"
            >
              {filteredEvents.map((event, index) => (
                <motion.div
                  key={event.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="card-hover p-6"
                >
                  {/* Event Header */}
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex-1">
                      <h3 className="text-xl font-bold text-dark-900 mb-2">
                        {event.title}
                      </h3>
                      <div className="flex items-center space-x-2 mb-3">
                        <span className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(event.status)}`}>
                          {getStatusIcon(event.status)}
                          <span className="ml-1 capitalize">{event.status}</span>
                        </span>
                        <span className="px-3 py-1 rounded-full text-xs font-medium bg-gray-100 text-gray-600">
                          {event.category}
                        </span>
                        <span className="px-3 py-1 rounded-full text-xs font-medium bg-orange-100 text-orange-600">
                          {event.difficulty}
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Event Description */}
                  <p className="text-dark-600 mb-6 line-clamp-2">
                    {event.description}
                  </p>

                  {/* Event Details */}
                  <div className="grid grid-cols-2 gap-4 mb-6">
                    <div className="flex items-center space-x-2 text-dark-500">
                      <Calendar className="w-4 h-4" />
                      <span className="text-sm">{formatDate(event.startDate, { month: 'short', day: 'numeric' })}</span>
                    </div>
                    
                    <div className="flex items-center space-x-2 text-dark-500">
                      <Clock className="w-4 h-4" />
                      <span className="text-sm">{formatDuration(event.duration)}</span>
                    </div>
                    
                    <div className="flex items-center space-x-2 text-dark-500">
                      <MapPin className="w-4 h-4" />
                      <span className="text-sm">{event.location}</span>
                    </div>
                    
                    <div className="flex items-center space-x-2 text-dark-500">
                      <Users className="w-4 h-4" />
                      <span className="text-sm">Registered</span>
                    </div>
                  </div>

                  {/* Score and Certificate */}
                  {event.score && (
                    <div className="bg-green-50 border border-green-200 rounded-lg p-4 mb-6">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-2">
                          <Star className="w-5 h-5 text-green-600 fill-current" />
                          <span className="font-semibold text-green-800">Score: {event.score}%</span>
                        </div>
                        {event.certificate && (
                          <button className="flex items-center space-x-2 text-green-600 hover:text-green-700 transition-colors">
                            <Download className="w-4 h-4" />
                            <span className="text-sm font-medium">Download Certificate</span>
                          </button>
                        )}
                      </div>
                    </div>
                  )}

                  {/* Action Buttons */}
                  <div className="flex flex-col sm:flex-row gap-3">
                    <Link
                      to={`/events/${event.id}`}
                      className="btn-outline flex items-center justify-center space-x-2 flex-1"
                    >
                      <Eye className="w-4 h-4" />
                      <span>View Details</span>
                    </Link>
                    
                    {event.status === 'upcoming' && (
                      <button className="btn-primary flex items-center justify-center space-x-2 flex-1">
                        <Clock className="w-4 h-4" />
                        <span>Start Test</span>
                      </button>
                    )}
                    
                    {event.status === 'completed' && event.certificate && (
                      <button className="btn-secondary flex items-center justify-center space-x-2 flex-1">
                        <Award className="w-4 h-4" />
                        <span>View Certificate</span>
                      </button>
                    )}
                  </div>
                </motion.div>
              ))}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  )
}

export default MyEvents
