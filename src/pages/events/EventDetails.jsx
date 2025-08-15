import { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { 
  Calendar, 
  Clock, 
  MapPin, 
  Users, 
  Award, 
  Star,
  ArrowLeft,
  BookOpen,
  CheckCircle,
  AlertCircle,
  TrendingUp,
  BarChart3
} from 'lucide-react'
import { formatDate, formatDuration } from '../../utils/formatDate'

const EventDetails = () => {
  const { id } = useParams()
  const navigate = useNavigate()
  const [event, setEvent] = useState(null)
  const [loading, setLoading] = useState(true)
  const [isRegistered, setIsRegistered] = useState(false)
  const [showRegistrationModal, setShowRegistrationModal] = useState(false)

  // Mock event data - replace with actual API call
  useEffect(() => {
    const fetchEventDetails = async () => {
      try {
        await new Promise(resolve => setTimeout(resolve, 1000))
        
        const mockEvent = {
          id: id,
          title: 'Advanced Technical Aptitude Test',
          description: 'This comprehensive aptitude test evaluates your technical skills across multiple domains including programming, algorithms, data structures, system design, and problem-solving abilities. Perfect for software engineering candidates looking to assess their technical proficiency.',
          longDescription: `Our Advanced Technical Aptitude Test is designed to challenge and evaluate candidates across multiple technical dimensions:

• **Programming Fundamentals**: Core programming concepts, syntax, and best practices
• **Algorithm Design**: Problem-solving approaches, time complexity, and optimization
• **Data Structures**: Arrays, linked lists, trees, graphs, and their applications
• **System Architecture**: Design patterns, scalability, and system integration
• **Database Concepts**: SQL, NoSQL, data modeling, and query optimization
• **Network Fundamentals**: Protocols, security, and distributed systems

The test consists of 50 carefully crafted questions with varying difficulty levels, designed to provide a comprehensive assessment of your technical capabilities.`,
          startDate: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
          endDate: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000 + 2 * 60 * 60 * 1000),
          duration: 120,
          maxParticipants: 100,
          currentParticipants: 67,
          difficulty: 'hard',
          category: 'Technical',
          location: 'Online Platform',
          image: 'https://images.unsplash.com/photo-1517077304055-6e89abbf09b0?w=800&h=400&fit=crop',
          requirements: [
            'Basic programming knowledge',
            'Understanding of algorithms',
            'Familiarity with data structures',
            'Problem-solving mindset'
          ],
          benefits: [
            'Professional certification',
            'Detailed performance report',
            'Career advancement opportunities',
            'Skill gap identification'
          ],
          isRegistered: false,
          score: null,
          certificate: false
        }
        
        setEvent(mockEvent)
        setIsRegistered(mockEvent.isRegistered)
      } catch (error) {
        console.error('Failed to fetch event details:', error)
      } finally {
        setLoading(false)
      }
    }

    fetchEventDetails()
  }, [id])

  const handleRegister = async () => {
    try {
      // Simulate registration API call
      await new Promise(resolve => setTimeout(resolve, 1500))
      setIsRegistered(true)
      setShowRegistrationModal(false)
      // In real app, update the event state
    } catch (error) {
      console.error('Registration failed:', error)
    }
  }

  const handleStartTest = () => {
    // Navigate to test taking interface
    navigate(`/test/${id}`)
  }

  if (loading) {
    return (
      <div className="section-padding">
        <div className="container-custom">
          <div className="flex justify-center items-center min-h-[400px]">
            <div className="text-center">
              <div className="w-16 h-16 border-4 border-primary-200 border-t-primary-600 rounded-full animate-spin mx-auto mb-4"></div>
              <p className="text-dark-600">Loading event details...</p>
            </div>
          </div>
        </div>
      </div>
    )
  }

  if (!event) {
    return (
      <div className="section-padding">
        <div className="container-custom">
          <div className="text-center">
            <AlertCircle className="w-16 h-16 text-red-500 mx-auto mb-4" />
            <h2 className="text-2xl font-bold text-dark-900 mb-2">Event Not Found</h2>
            <p className="text-dark-600 mb-6">The event you're looking for doesn't exist or has been removed.</p>
            <button
              onClick={() => navigate('/events')}
              className="btn-primary"
            >
              Back to Events
            </button>
          </div>
        </div>
      </div>
    )
  }

  const participationRate = (event.currentParticipants / event.maxParticipants) * 100
  const isEventUpcoming = new Date(event.startDate) > new Date()
  const isEventToday = new Date(event.startDate).toDateString() === new Date().toDateString()

  return (
    <div className="section-padding">
      <div className="container-custom">
        {/* Back Button */}
        <motion.button
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          onClick={() => navigate('/events')}
          className="flex items-center space-x-2 text-primary-600 hover:text-primary-700 mb-6 transition-colors duration-200"
        >
          <ArrowLeft className="w-5 h-5" />
          <span>Back to Events</span>
        </motion.button>

        {/* Event Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Event Image */}
            <div className="lg:col-span-2">
              <div className="relative h-64 lg:h-80 bg-gradient-to-br from-primary-100 to-secondary-100 rounded-2xl overflow-hidden">
                {event.image ? (
                  <img
                    src={event.image}
                    alt={event.title}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center">
                    <div className="text-8xl font-bold text-primary-200">{event.category?.[0] || 'T'}</div>
                  </div>
                )}
                <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
                
                {/* Status Badge */}
                <div className="absolute top-4 left-4">
                  <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                    isRegistered 
                      ? 'bg-green-100 text-green-600' 
                      : isEventToday 
                        ? 'bg-accent-100 text-accent-600' 
                        : isEventUpcoming 
                          ? 'bg-blue-100 text-blue-600' 
                          : 'bg-gray-100 text-gray-600'
                  }`}>
                    {isRegistered ? 'Registered' : isEventToday ? 'Today' : isEventUpcoming ? 'Upcoming' : 'Past'}
                  </span>
                </div>
                
                {/* Difficulty Badge */}
                <div className="absolute top-4 right-4">
                  <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                    event.difficulty === 'easy' ? 'bg-green-100 text-green-600' :
                    event.difficulty === 'medium' ? 'bg-yellow-100 text-yellow-600' :
                    'bg-red-100 text-red-600'
                  }`}>
                    {event.difficulty}
                  </span>
                </div>
              </div>
            </div>

            {/* Event Info */}
            <div className="space-y-6">
              <div>
                <h1 className="text-3xl lg:text-4xl font-bold text-dark-900 mb-2">
                  {event.title}
                </h1>
                <p className="text-lg text-dark-600">
                  {event.description}
                </p>
              </div>

              {/* Quick Stats */}
              <div className="space-y-4">
                <div className="flex items-center space-x-3 text-dark-600">
                  <Calendar className="w-5 h-5 text-primary-500" />
                  <span>{formatDate(event.startDate)}</span>
                </div>
                
                <div className="flex items-center space-x-3 text-dark-600">
                  <Clock className="w-5 h-5 text-primary-500" />
                  <span>{formatDuration(event.duration)}</span>
                </div>
                
                <div className="flex items-center space-x-3 text-dark-600">
                  <MapPin className="w-5 h-5 text-primary-500" />
                  <span>{event.location}</span>
                </div>
                
                <div className="flex items-center space-x-3 text-dark-600">
                  <Users className="w-5 h-5 text-primary-500" />
                  <span>{event.currentParticipants}/{event.maxParticipants} participants</span>
                </div>
              </div>

              {/* Participation Progress */}
    <div>
                <div className="flex justify-between text-sm text-dark-500 mb-2">
                  <span>Participation</span>
                  <span>{participationRate.toFixed(0)}% full</span>
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

              {/* Action Buttons */}
              <div className="space-y-3">
                {isRegistered ? (
                  <button
                    onClick={handleStartTest}
                    className="w-full btn-primary flex items-center justify-center space-x-2"
                  >
                    <BookOpen className="w-5 h-5" />
                    <span>Start Test</span>
                  </button>
                ) : (
                  <button
                    onClick={() => setShowRegistrationModal(true)}
                    className="w-full btn-primary flex items-center justify-center space-x-2"
                  >
                    <BookOpen className="w-5 h-5" />
                    <span>Register for Test</span>
                  </button>
                )}
                
                <button className="w-full btn-outline flex items-center justify-center space-x-2">
                  <Star className="w-5 h-5" />
                  <span>Add to Wishlist</span>
                </button>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Event Details Tabs */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-8"
        >
          {/* Requirements */}
          <div className="card p-6">
            <h3 className="text-xl font-semibold text-dark-900 mb-4 flex items-center space-x-2">
              <AlertCircle className="w-6 h-6 text-orange-500" />
              <span>Requirements</span>
            </h3>
            <ul className="space-y-2">
              {event.requirements.map((req, index) => (
                <li key={index} className="flex items-start space-x-2">
                  <div className="w-2 h-2 bg-orange-500 rounded-full mt-2 flex-shrink-0"></div>
                  <span className="text-dark-600">{req}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Benefits */}
          <div className="card p-6">
            <h3 className="text-xl font-semibold text-dark-900 mb-4 flex items-center space-x-2">
              <Award className="w-6 h-6 text-green-500" />
              <span>Benefits</span>
            </h3>
            <ul className="space-y-2">
              {event.benefits.map((benefit, index) => (
                <li key={index} className="flex items-start space-x-2">
                  <CheckCircle className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" />
                  <span className="text-dark-600">{benefit}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Test Statistics */}
          <div className="card p-6">
            <h3 className="text-xl font-semibold text-dark-900 mb-4 flex items-center space-x-2">
              <BarChart3 className="w-6 h-6 text-blue-500" />
              <span>Statistics</span>
            </h3>
            <div className="space-y-3">
              <div className="flex justify-between">
                <span className="text-dark-600">Category:</span>
                <span className="font-medium text-dark-900">{event.category}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-dark-600">Difficulty:</span>
                <span className="font-medium text-dark-900 capitalize">{event.difficulty}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-dark-600">Duration:</span>
                <span className="font-medium text-dark-900">{formatDuration(event.duration)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-dark-600">Questions:</span>
                <span className="font-medium text-dark-900">50</span>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Detailed Description */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="card p-8 mb-8"
        >
          <h3 className="text-2xl font-bold text-dark-900 mb-6">About This Test</h3>
          <div className="prose prose-lg max-w-none text-dark-600">
            <p className="whitespace-pre-line">{event.longDescription}</p>
          </div>
        </motion.div>

        {/* Registration Modal */}
        <AnimatePresence>
          {showRegistrationModal && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
              onClick={() => setShowRegistrationModal(false)}
            >
              <motion.div
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.9, opacity: 0 }}
                className="bg-white rounded-2xl p-8 max-w-md w-full"
                onClick={(e) => e.stopPropagation()}
              >
                <h3 className="text-xl font-bold text-dark-900 mb-4">Confirm Registration</h3>
                <p className="text-dark-600 mb-6">
                  Are you sure you want to register for "{event.title}"? This will reserve your spot in the test.
                </p>
                
                <div className="flex space-x-3">
                  <button
                    onClick={() => setShowRegistrationModal(false)}
                    className="flex-1 btn-outline"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={handleRegister}
                    className="flex-1 btn-primary"
                  >
                    Confirm Registration
                  </button>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  )
}

export default EventDetails
