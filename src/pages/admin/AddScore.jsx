import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useParams } from 'react-router-dom'
import { 
  BarChart3, 
  Search, 
  Filter, 
  Star, 
  CheckCircle, 
  XCircle,
  Clock,
  Users,
  TrendingUp,
  TrendingDown,
  Save,
  Plus,
  Edit,
  Trash2,
  MoreVertical
} from 'lucide-react'
import { formatDate } from '../../utils/formatDate'

const AddScore = () => {
  const { id } = useParams()
  const [event, setEvent] = useState(null)
  const [participants, setParticipants] = useState([])
  const [loading, setLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedStatus, setSelectedStatus] = useState('all')
  const [editingScore, setEditingScore] = useState(null)
  const [showScoreModal, setShowScoreModal] = useState(false)

  // Mock data - replace with actual API call
  useEffect(() => {
    const fetchEventData = async () => {
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
          status: 'active',
          totalQuestions: 50,
          passingScore: 70
        }
        
        const mockParticipants = [
          {
            id: '1',
            name: 'John Doe',
            email: 'john.doe@example.com',
            avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face',
            registrationDate: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000),
            status: 'completed',
            score: 85,
            correctAnswers: 42,
            totalQuestions: 50,
            timeTaken: 95,
            submittedAt: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000),
            certificate: {
              id: 'cert-1',
              downloadUrl: '#',
              issuedDate: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000)
            }
          },
          {
            id: '2',
            name: 'Jane Smith',
            email: 'jane.smith@example.com',
            avatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150&h=150&fit=crop&crop=face',
            registrationDate: new Date(Date.now() - 4 * 24 * 60 * 60 * 1000),
            status: 'completed',
            score: 78,
            correctAnswers: 39,
            totalQuestions: 50,
            timeTaken: 110,
            submittedAt: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000),
            certificate: {
              id: 'cert-2',
              downloadUrl: '#',
              issuedDate: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000)
            }
          },
          {
            id: '3',
            name: 'Mike Johnson',
            email: 'mike.johnson@example.com',
            avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face',
            registrationDate: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000),
            status: 'completed',
            score: 92,
            correctAnswers: 46,
            totalQuestions: 50,
            timeTaken: 88,
            submittedAt: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000),
            certificate: {
              id: 'cert-3',
              downloadUrl: '#',
              issuedDate: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000)
            }
          },
          {
            id: '4',
            name: 'Sarah Wilson',
            email: 'sarah.wilson@example.com',
            avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face',
            registrationDate: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000),
            status: 'completed',
            score: 65,
            correctAnswers: 32,
            totalQuestions: 50,
            timeTaken: 120,
            submittedAt: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000),
            certificate: null
          },
          {
            id: '5',
            name: 'David Brown',
            email: 'david.brown@example.com',
            avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&h=150&fit=crop&crop=face',
            registrationDate: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000),
            status: 'completed',
            score: null,
            correctAnswers: null,
            totalQuestions: 50,
            timeTaken: null,
            submittedAt: null,
            certificate: null
          }
        ]
        
        setEvent(mockEvent)
        setParticipants(mockParticipants)
      } catch (error) {
        console.error('Failed to fetch event data:', error)
      } finally {
        setLoading(false)
      }
    }

    fetchEventData()
  }, [id])

  const statuses = ['all', 'completed', 'pending', 'failed']

  const filteredParticipants = participants.filter(participant => {
    const matchesSearch = participant.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         participant.email.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesStatus = selectedStatus === 'all' || participant.status === selectedStatus
    return matchesSearch && matchesStatus
  })

  const stats = {
    total: participants.length,
    completed: participants.filter(p => p.status === 'completed' && p.score !== null).length,
    pending: participants.filter(p => p.status === 'completed' && p.score === null).length,
    averageScore: participants.filter(p => p.score).length > 0 
      ? Math.round(participants.filter(p => p.score).reduce((sum, p) => sum + p.score, 0) / participants.filter(p => p.score).length)
      : 0,
    passingRate: participants.filter(p => p.score && p.score >= event?.passingScore).length > 0
      ? Math.round((participants.filter(p => p.score && p.score >= event?.passingScore).length / participants.filter(p => p.score).length) * 100)
      : 0
  }

  const getScoreColor = (score) => {
    if (!score) return 'text-gray-500'
    if (score >= 90) return 'text-green-600'
    if (score >= 80) return 'text-blue-600'
    if (score >= 70) return 'text-yellow-600'
    return 'text-red-600'
  }

  const getScoreBackground = (score) => {
    if (!score) return 'bg-gray-100'
    if (score >= 90) return 'bg-green-100'
    if (score >= 80) return 'bg-blue-100'
    if (score >= 70) return 'bg-yellow-100'
    return 'bg-red-100'
  }

  const handleAddScore = (participant) => {
    setEditingScore(participant)
    setShowScoreModal(true)
  }

  const handleEditScore = (participant) => {
    setEditingScore(participant)
    setShowScoreModal(true)
  }

  const handleSaveScore = async (scoreData) => {
    try {
      // Mock API call
      await new Promise(resolve => setTimeout(resolve, 500))
      
      setParticipants(participants.map(p => 
        p.id === scoreData.participantId 
          ? { 
              ...p, 
              score: scoreData.score,
              correctAnswers: Math.round((scoreData.score / 100) * p.totalQuestions),
              submittedAt: new Date(),
              certificate: scoreData.score >= event?.passingScore ? {
                id: `cert-${Date.now()}`,
                downloadUrl: '#',
                issuedDate: new Date()
              } : null
            }
          : p
      ))
      
      setShowScoreModal(false)
      setEditingScore(null)
      // Show success message
    } catch (error) {
      console.error('Failed to save score:', error)
      // Show error message
    }
  }

  if (loading) {
    return (
      <div className="p-6">
        <div className="flex justify-center items-center min-h-[400px]">
          <div className="text-center">
            <div className="w-16 h-16 mx-auto mb-4">
              <div className="spinner"></div>
            </div>
            <h2 className="text-xl font-semibold text-dark-700">Loading event data...</h2>
            <p className="text-dark-500">Fetching participants and scores</p>
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
          <h1 className="text-3xl font-bold text-dark-900 mb-2">Add Scores</h1>
          <p className="text-dark-600">Input and manage test scores for participants</p>
        </div>
        
        <div className="flex items-center space-x-3 mt-4 sm:mt-0">
          <button className="btn-outline flex items-center space-x-2">
            <BarChart3 className="w-4 h-4" />
            <span>View Analytics</span>
          </button>
          <button className="btn-primary flex items-center space-x-2">
            <Plus className="w-4 h-4" />
            <span>Bulk Import</span>
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
                <Users className="w-4 h-4" />
                <span>{event?.currentParticipants} participants</span>
              </span>
              <span className="flex items-center space-x-2 text-dark-500">
                <BarChart3 className="w-4 h-4" />
                <span>{event?.totalQuestions} questions</span>
              </span>
              <span className="flex items-center space-x-2 text-dark-500">
                <Star className="w-4 h-4" />
                <span>Passing: {event?.passingScore}%</span>
              </span>
            </div>
          </div>
          <div className="text-right">
            <span className="px-3 py-1 rounded-full text-sm font-medium bg-green-100 text-green-600">
              Active
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
          <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center mx-auto mb-4">
            <CheckCircle className="w-6 h-6 text-green-600" />
          </div>
          <h3 className="text-2xl font-bold text-dark-900">{stats.completed}</h3>
          <p className="text-dark-600 text-sm">Scored</p>
        </div>
        
        <div className="card text-center p-6">
          <div className="w-12 h-12 bg-yellow-100 rounded-xl flex items-center justify-center mx-auto mb-4">
            <Clock className="w-6 h-6 text-yellow-600" />
          </div>
          <h3 className="text-2xl font-bold text-dark-900">{stats.pending}</h3>
          <p className="text-dark-600 text-sm">Pending</p>
        </div>
        
        <div className="card text-center p-6">
          <div className="w-12 h-12 bg-purple-100 rounded-xl flex items-center justify-center mx-auto mb-4">
            <Star className="w-6 h-6 text-purple-600" />
          </div>
          <h3 className="text-2xl font-bold text-dark-900">{stats.averageScore}%</h3>
          <p className="text-dark-600 text-sm">Avg. Score</p>
        </div>
        
        <div className="card text-center p-6">
          <div className="w-12 h-12 bg-indigo-100 rounded-xl flex items-center justify-center mx-auto mb-4">
            <TrendingUp className="w-6 h-6 text-indigo-600" />
          </div>
          <h3 className="text-2xl font-bold text-dark-900">{stats.passingRate}%</h3>
          <p className="text-dark-600 text-sm">Pass Rate</p>
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
                  {status === 'all' ? 'All Statuses' : status.charAt(0).toUpperCase() + status.slice(1)}
                </option>
              ))}
            </select>
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
                <th className="px-6 py-4 text-left text-sm font-semibold text-dark-900">Test Details</th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-dark-900">Score</th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-dark-900">Result</th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-dark-900">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-dark-100">
              {filteredParticipants.map((participant, index) => (
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
                        {participant.registrationDate.toLocaleDateString()}
                      </div>
                    </div>
                  </td>
                  
                  <td className="px-6 py-4">
                    <div className="text-sm">
                      {participant.submittedAt ? (
                        <>
                          <div className="text-dark-900 mb-1">
                            Submitted: {formatDate(participant.submittedAt, { month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' })}
                          </div>
                          {participant.timeTaken && (
                            <div className="text-dark-500">
                              Time: {Math.floor(participant.timeTaken / 60)}m {participant.timeTaken % 60}s
                            </div>
                          )}
                        </>
                      ) : (
                        <span className="text-dark-500">Not submitted</span>
                      )}
                    </div>
                  </td>
                  
                  <td className="px-6 py-4">
                    {participant.score ? (
                      <div className="flex items-center space-x-2">
                        <div className={`w-12 h-12 rounded-full flex items-center justify-center ${getScoreBackground(participant.score)}`}>
                          <span className={`font-bold text-lg ${getScoreColor(participant.score)}`}>
                            {participant.score}%
                          </span>
                        </div>
                        <div>
                          <div className="text-sm text-dark-900">
                            {participant.correctAnswers}/{participant.totalQuestions}
                          </div>
                          <div className="text-xs text-dark-500">correct</div>
                        </div>
                      </div>
                    ) : (
                      <span className="text-dark-500">-</span>
                    )}
                  </td>
                  
                  <td className="px-6 py-4">
                    {participant.score ? (
                      <div className="flex items-center space-x-2">
                        {participant.score >= event?.passingScore ? (
                          <CheckCircle className="w-5 h-5 text-green-600" />
                        ) : (
                          <XCircle className="w-5 h-5 text-red-600" />
                        )}
                        <span className={`text-sm font-medium ${
                          participant.score >= event?.passingScore ? 'text-green-600' : 'text-red-600'
                        }`}>
                          {participant.score >= event?.passingScore ? 'Passed' : 'Failed'}
                        </span>
                      </div>
                    ) : (
                      <span className="text-dark-500">-</span>
                    )}
                  </td>
                  
                  <td className="px-6 py-4">
                    <div className="flex items-center space-x-2">
                      {participant.score ? (
                        <button
                          onClick={() => handleEditScore(participant)}
                          className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                          title="Edit Score"
                        >
                          <Edit className="w-4 h-4" />
                        </button>
                      ) : (
                        <button
                          onClick={() => handleAddScore(participant)}
                          className="p-2 text-green-600 hover:bg-green-50 rounded-lg transition-colors"
                          title="Add Score"
                        >
                          <Plus className="w-4 h-4" />
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
        
        {filteredParticipants.length === 0 && (
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
          </div>
        )}
      </motion.div>

      {/* Score Modal */}
      <AnimatePresence>
        {showScoreModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
            onClick={() => setShowScoreModal(false)}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="bg-white rounded-2xl shadow-2xl max-w-md w-full"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="p-6 border-b border-dark-100">
                <h2 className="text-2xl font-bold text-dark-900">
                  {editingScore?.score ? 'Edit Score' : 'Add Score'}
                </h2>
                <p className="text-dark-600">
                  {editingScore?.score 
                    ? `Update score for ${editingScore.name}`
                    : `Input test score for ${editingScore?.name}`
                  }
                </p>
              </div>
              
              <div className="p-6">
                <form className="space-y-6" onSubmit={(e) => {
                  e.preventDefault()
                  const formData = new FormData(e.target)
                  handleSaveScore({
                    participantId: editingScore.id,
                    score: parseInt(formData.get('score')),
                    notes: formData.get('notes')
                  })
                }}>
                  <div>
                    <label className="block text-sm font-medium text-dark-700 mb-2">
                      Test Score (%) <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="number"
                      name="score"
                      defaultValue={editingScore?.score || ''}
                      className="input-field"
                      placeholder="85"
                      min="0"
                      max="100"
                      required
                    />
                    <p className="text-xs text-dark-500 mt-1">
                      Passing score: {event?.passingScore}%
                    </p>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-dark-700 mb-2">
                      Notes (Optional)
                    </label>
                    <textarea
                      name="notes"
                      rows={3}
                      className="input-field"
                      placeholder="Add any notes about the test performance..."
                    />
                  </div>
                  
                  <div className="flex justify-end space-x-3">
                    <button
                      type="button"
                      onClick={() => setShowScoreModal(false)}
                      className="btn-outline"
                    >
                      Cancel
                    </button>
                    <button type="submit" className="btn-primary flex items-center space-x-2">
                      <Save className="w-4 h-4" />
                      <span>{editingScore?.score ? 'Update Score' : 'Save Score'}</span>
                    </button>
                  </div>
                </form>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

export default AddScore
  