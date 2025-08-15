import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useParams } from 'react-router-dom'
import { 
  Users, 
  Search, 
  Filter, 
  Mail, 
  Calendar, 
  Clock, 
  Star,
  Eye,
  Download,
  MoreVertical,
  CheckCircle,
  XCircle,
  Clock as ClockIcon,
  TrendingUp,
  TrendingDown
} from 'lucide-react'
import { formatDate, formatDuration } from '../../utils/formatDate'

const EventParticipants = () => {
  const { id } = useParams()
  const [event, setEvent] = useState(null)
  const [participants, setParticipants] = useState([])
  const [loading, setLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedStatus, setSelectedStatus] = useState('all')
  const [sortBy, setSortBy] = useState('registrationDate')
  const [sortOrder, setSortOrder] = useState('desc')

  // Mock data - replace with actual API call
  useEffect(() => {
    const fetchEventParticipants = async () => {
      try {
        await new Promise(resolve => setTimeout(resolve, 1000))
        
        const mockEvent = {
          id: id || '1',
          title: 'Advanced Technical Aptitude Test',
          description: 'Comprehensive assessment covering programming, algorithms, data structures, and system design.',
          category: 'Technical',
          difficulty: 'hard',
          startDate: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
          endDate: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000 + 2 * 60 * 60 * 1000),
          duration: 120,
          maxParticipants: 100,
          currentParticipants: 67,
          status: 'active'
        }
        
        const mockParticipants = [
          {
            id: '1',
            name: 'John Doe',
            email: 'john.doe@example.com',
            avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face',
            registrationDate: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000),
            status: 'registered',
            score: null,
            startTime: null,
            endTime: null,
            duration: null,
            certificate: null
          },
          {
            id: '2',
            name: 'Jane Smith',
            email: 'jane.smith@example.com',
            avatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150&h=150&fit=crop&crop=face',
            registrationDate: new Date(Date.now() - 4 * 24 * 60 * 60 * 1000),
            status: 'completed',
            score: 85,
            startTime: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000),
            endTime: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000 + 90 * 60 * 1000),
            duration: 90,
            certificate: {
              id: 'cert-1',
              downloadUrl: '#',
              issuedDate: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000)
            }
          },
          {
            id: '3',
            name: 'Mike Johnson',
            email: 'mike.johnson@example.com',
            avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face',
            registrationDate: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000),
            status: 'in_progress',
            score: null,
            startTime: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000),
            endTime: null,
            duration: 45,
            certificate: null
          },
          {
            id: '4',
            name: 'Sarah Wilson',
            email: 'sarah.wilson@example.com',
            avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face',
            registrationDate: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000),
            status: 'completed',
            score: 92,
            startTime: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000),
            endTime: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000 + 110 * 60 * 1000),
            duration: 110,
            certificate: {
              id: 'cert-2',
              downloadUrl: '#',
              issuedDate: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000)
            }
          },
          {
            id: '5',
            name: 'David Brown',
            email: 'david.brown@example.com',
            avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&h=150&fit=crop&crop=face',
            registrationDate: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000),
            status: 'registered',
            score: null,
            startTime: null,
            endTime: null,
            duration: null,
            certificate: null
          }
        ]
        
        setEvent(mockEvent)
        setParticipants(mockParticipants)
      } catch (error) {
        console.error('Failed to fetch event participants:', error)
      } finally {
        setLoading(false)
      }
    }

    fetchEventParticipants()
  }, [id])

  const statuses = ['all', 'registered', 'in_progress', 'completed', 'cancelled']

  const filteredParticipants = participants.filter(participant => {
    const matchesSearch = participant.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         participant.email.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesStatus = selectedStatus === 'all' || participant.status === selectedStatus
    return matchesSearch && matchesStatus
  })

  const sortedParticipants = [...filteredParticipants].sort((a, b) => {
    let aValue, bValue
    
    switch (sortBy) {
      case 'name':
        aValue = a.name.toLowerCase()
        bValue = b.name.toLowerCase()
        break
      case 'email':
        aValue = a.email.toLowerCase()
        bValue = b.email.toLowerCase()
        break
      case 'registrationDate':
        aValue = a.registrationDate.getTime()
        bValue = b.registrationDate.getTime()
        break
      case 'score':
        aValue = a.score || 0
        bValue = b.score || 0
        break
      default:
        aValue = a.registrationDate.getTime()
        bValue = b.registrationDate.getTime()
    }
    
    if (sortOrder === 'asc') {
      return aValue > bValue ? 1 : -1
    } else {
      return aValue < bValue ? 1 : -1
    }
  })

  const getStatusColor = (status) => {
    switch (status) {
      case 'registered':
        return 'text-blue-600 bg-blue-100'
      case 'in_progress':
        return 'text-yellow-600 bg-yellow-100'
      case 'completed':
        return 'text-green-600 bg-green-100'
      case 'cancelled':
        return 'text-red-600 bg-red-100'
      default:
        return 'text-gray-600 bg-gray-100'
    }
  }

  const getStatusIcon = (status) => {
    switch (status) {
      case 'registered':
        return <ClockIcon className="w-4 h-4" />
      case 'in_progress':
        return <ClockIcon className="w-4 h-4" />
      case 'completed':
        return <CheckCircle className="w-4 h-4" />
      case 'cancelled':
        return <XCircle className="w-4 h-4" />
      default:
        return <ClockIcon className="w-4 h-4" />
    }
  }

  const stats = {
    total: participants.length,
    registered: participants.filter(p => p.status === 'registered').length,
    inProgress: participants.filter(p => p.status === 'in_progress').length,
    completed: participants.filter(p => p.status === 'completed').length,
    averageScore: participants.filter(p => p.score).length > 0 
      ? Math.round(participants.filter(p => p.score).reduce((sum, p) => sum + p.score, 0) / participants.filter(p => p.score).length)
      : 0
  }

  if (loading) {
    return (
      <div className="p-6">
        <div className="flex justify-center items-center min-h-[400px]">
          <div className="text-center">
            <div className="w-16 h-16 mx-auto mb-4">
              <div className="spinner"></div>
            </div>
            <h2 className="text-xl font-semibold text-dark-700">Loading participants...</h2>
            <p className="text-dark-500">Fetching event participant data</p>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex flex-col sm:flex-row justify-between items-start sm:items-center"
      >
        <div>
          <h1 className="text-3xl font-bold text-dark-900 mb-2">Event Participants</h1>
          <p className="text-dark-600">Manage and monitor participants for this aptitude test</p>
        </div>
        
        <div className="flex items-center space-x-3 mt-4 sm:mt-0">
          <button className="btn-outline flex items-center space-x-2">
            <Download className="w-4 h-4" />
            <span>Export List</span>
          </button>
          <button className="btn-primary flex items-center space-x-2">
            <Users className="w-4 h-4" />
            <span>Add Participant</span>
          </button>
        </div>
      </motion.div>

      {/* Event Info */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="card p-6"
      >
        <div className="flex items-start justify-between">
          <div>
            <h2 className="text-2xl font-bold text-dark-900 mb-2">{event?.title}</h2>
            <p className="text-dark-600 mb-4">{event?.description}</p>
            <div className="flex items-center space-x-6 text-sm">
              <span className="flex items-center space-x-2 text-dark-500">
                <Calendar className="w-4 h-4" />
                <span>{event?.startDate?.toLocaleDateString()}</span>
              </span>
              <span className="flex items-center space-x-2 text-dark-500">
                <Clock className="w-4 h-4" />
                <span>{event?.duration} minutes</span>
              </span>
              <span className="flex items-center space-x-2 text-dark-500">
                <Users className="w-4 h-4" />
                <span>{event?.currentParticipants}/{event?.maxParticipants} participants</span>
              </span>
            </div>
          </div>
          <div className="text-right">
            <span className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(event?.status)}`}>
              {event?.status?.charAt(0).toUpperCase() + event?.status?.slice(1)}
            </span>
          </div>
        </div>
      </motion.div>

      {/* Stats Cards */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="grid grid-cols-1 md:grid-cols-5 gap-6"
      >
        <div className="card text-center p-6">
          <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center mx-auto mb-4">
            <Users className="w-6 h-6 text-blue-600" />
          </div>
          <h3 className="text-2xl font-bold text-dark-900">{stats.total}</h3>
          <p className="text-dark-600 text-sm">Total</p>
        </div>
        
        <div className="card text-center p-6">
          <div className="w-12 h-12 bg-yellow-100 rounded-xl flex items-center justify-center mx-auto mb-4">
            <ClockIcon className="w-6 h-6 text-yellow-600" />
          </div>
          <h3 className="text-2xl font-bold text-dark-900">{stats.registered}</h3>
          <p className="text-dark-600 text-sm">Registered</p>
        </div>
        
        <div className="card text-center p-6">
          <div className="w-12 h-12 bg-orange-100 rounded-xl flex items-center justify-center mx-auto mb-4">
            <ClockIcon className="w-6 h-6 text-orange-600" />
          </div>
          <h3 className="text-2xl font-bold text-dark-900">{stats.inProgress}</h3>
          <p className="text-dark-600 text-sm">In Progress</p>
        </div>
        
        <div className="card text-center p-6">
          <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center mx-auto mb-4">
            <CheckCircle className="w-6 h-6 text-green-600" />
          </div>
          <h3 className="text-2xl font-bold text-dark-900">{stats.completed}</h3>
          <p className="text-dark-600 text-sm">Completed</p>
        </div>
        
        <div className="card text-center p-6">
          <div className="w-12 h-12 bg-purple-100 rounded-xl flex items-center justify-center mx-auto mb-4">
            <Star className="w-6 h-6 text-purple-600" />
          </div>
          <h3 className="text-2xl font-bold text-dark-900">{stats.averageScore}%</h3>
          <p className="text-dark-600 text-sm">Avg. Score</p>
        </div>
      </motion.div>

      {/* Search and Filters */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="card p-6"
      >
        <div className="flex flex-col lg:flex-row gap-6 items-center">
          {/* Search */}
          <div className="flex-1 w-full lg:w-auto">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-dark-400" />
              <input
                type="text"
                placeholder="Search participants..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="input-field pl-10 w-full"
              />
            </div>
          </div>

          {/* Status Filter */}
          <div className="flex items-center space-x-2">
            <Filter className="w-5 h-5 text-dark-500" />
            <select
              value={selectedStatus}
              onChange={(e) => setSelectedStatus(e.target.value)}
              className="input-field py-2 px-3"
            >
              {statuses.map(status => (
                <option key={status} value={status}>
                  {status === 'all' ? 'All Statuses' : status.replace('_', ' ').charAt(0).toUpperCase() + status.replace('_', ' ').slice(1)}
                </option>
              ))}
            </select>
          </div>

          {/* Sort */}
          <div className="flex items-center space-x-2">
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="input-field py-2 px-3"
            >
              <option value="registrationDate">Sort by Registration</option>
              <option value="name">Sort by Name</option>
              <option value="email">Sort by Email</option>
              <option value="score">Sort by Score</option>
            </select>
            <button
              onClick={() => setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc')}
              className="p-2 text-dark-500 hover:text-primary-600 transition-colors"
            >
              {sortOrder === 'asc' ? <TrendingUp className="w-5 h-5" /> : <TrendingDown className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </motion.div>

      {/* Participants Table */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
        className="card overflow-hidden"
      >
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-dark-50">
              <tr>
                <th className="px-6 py-4 text-left text-sm font-semibold text-dark-900">Participant</th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-dark-900">Registration</th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-dark-900">Status</th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-dark-900">Progress</th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-dark-900">Score</th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-dark-900">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-dark-100">
              {sortedParticipants.map((participant, index) => (
                <motion.tr
                  key={participant.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.05 }}
                  className="hover:bg-dark-50 transition-colors duration-200"
                >
                  <td className="px-6 py-4">
                    <div className="flex items-center space-x-3">
                      <img
                        src={participant.avatar}
                        alt={participant.name}
                        className="w-10 h-10 rounded-full border-2 border-primary-200"
                      />
                      <div>
                        <h3 className="font-semibold text-dark-900">{participant.name}</h3>
                        <p className="text-sm text-dark-500">{participant.email}</p>
                      </div>
                    </div>
                  </td>
                  
                  <td className="px-6 py-4">
                    <div className="text-sm">
                      <div className="text-dark-900 mb-1">
                        {formatDate(participant.registrationDate, { month: 'short', day: 'numeric' })}
                      </div>
                      <div className="text-dark-500">
                        {formatRelativeTime(participant.registrationDate)}
                      </div>
                    </div>
                  </td>
                  
                  <td className="px-6 py-4">
                    <span className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(participant.status)}`}>
                      {getStatusIcon(participant.status)}
                      <span className="ml-1">
                        {participant.status.replace('_', ' ').charAt(0).toUpperCase() + participant.status.replace('_', ' ').slice(1)}
                      </span>
                    </span>
                  </td>
                  
                  <td className="px-6 py-4">
                    <div className="text-sm">
                      {participant.startTime ? (
                        <>
                          <div className="text-dark-900 mb-1">
                            Started: {formatDate(participant.startTime, { month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' })}
                          </div>
                          {participant.duration && (
                            <div className="text-dark-500">
                              Duration: {formatDuration(participant.duration)}
                            </div>
                          )}
                        </>
                      ) : (
                        <span className="text-dark-500">Not started</span>
                      )}
                    </div>
                  </td>
                  
                  <td className="px-6 py-4">
                    {participant.score ? (
                      <div className="flex items-center space-x-2">
                        <Star className="w-4 h-4 text-yellow-500 fill-current" />
                        <span className="font-semibold text-dark-900">{participant.score}%</span>
                      </div>
                    ) : (
                      <span className="text-dark-500">-</span>
                    )}
                  </td>
                  
                  <td className="px-6 py-4">
                    <div className="flex items-center space-x-2">
                      <button
                        className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                        title="View Details"
                      >
                        <Eye className="w-4 h-4" />
                      </button>
                      
                      {participant.certificate && (
                        <button
                          className="p-2 text-green-600 hover:bg-green-50 rounded-lg transition-colors"
                          title="Download Certificate"
                        >
                          <Download className="w-4 h-4" />
                        </button>
                      )}
                      
                      <div className="relative">
                        <button className="p-2 text-dark-500 hover:bg-dark-50 rounded-lg transition-colors">
                          <MoreVertical className="w-4 h-4" />
                        </button>
                        {/* Dropdown menu would go here */}
                      </div>
                    </div>
                  </td>
                </motion.tr>
              ))}
            </tbody>
          </table>
        </div>
        
        {sortedParticipants.length === 0 && (
          <div className="text-center py-16">
            <div className="w-24 h-24 bg-dark-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <Users className="w-12 h-12 text-dark-400" />
            </div>
            <h3 className="text-xl font-semibold text-dark-700 mb-2">No participants found</h3>
            <p className="text-dark-500 mb-6">
              {searchTerm || selectedStatus !== 'all'
                ? 'Try adjusting your search criteria or filters.'
                : "No participants have registered for this event yet."
              }
            </p>
            {!searchTerm && selectedStatus === 'all' && (
              <button className="btn-primary">
                Invite Participants
              </button>
            )}
          </div>
        )}
      </motion.div>
    </div>
  )
}

// Helper function for relative time
const formatRelativeTime = (date) => {
  const now = new Date()
  const diffInSeconds = Math.floor((now - date) / 1000)

  if (diffInSeconds < 60) {
    return 'Just now'
  } else if (diffInSeconds < 3600) {
    const minutes = Math.floor(diffInSeconds / 60)
    return `${minutes} minute${minutes > 1 ? 's' : ''} ago`
  } else if (diffInSeconds < 86400) {
    const hours = Math.floor(diffInSeconds / 3600)
    return `${hours} hour${hours > 1 ? 's' : ''} ago`
  } else {
    const days = Math.floor(diffInSeconds / 86400)
    return `${days} day${days > 1 ? 's' : ''} ago`
  }
}

export default EventParticipants
  