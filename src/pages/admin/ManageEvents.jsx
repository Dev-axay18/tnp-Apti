import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { 
  Plus, 
  Search, 
  Filter, 
  Edit, 
  Trash2, 
  Eye, 
  Calendar, 
  Clock, 
  Users, 
  MoreVertical,
  Copy,
  Archive,
  BarChart3
} from 'lucide-react'

const ManageEvents = () => {
  const [events, setEvents] = useState([])
  const [loading, setLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('all')
  const [selectedStatus, setSelectedStatus] = useState('all')
  const [showCreateModal, setShowCreateModal] = useState(false)
  const [editingEvent, setEditingEvent] = useState(null)

  // Mock data - replace with actual API call
  useEffect(() => {
    const fetchEvents = async () => {
      try {
        await new Promise(resolve => setTimeout(resolve, 1000))
        
        const mockEvents = [
          {
            id: '1',
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
            isPublished: true,
            createdBy: 'Admin User',
            createdAt: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000),
            questions: 50
          },
          {
            id: '2',
            title: 'Logical Reasoning Assessment',
            description: 'Test your logical thinking, pattern recognition, and problem-solving abilities.',
            category: 'Logical',
            difficulty: 'medium',
            startDate: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000),
            endDate: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000 + 90 * 60 * 1000),
            duration: 90,
            maxParticipants: 150,
            currentParticipants: 89,
            status: 'active',
            isPublished: true,
            createdBy: 'Admin User',
            createdAt: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000),
            questions: 40
          },
          {
            id: '3',
            title: 'Verbal Communication Skills',
            description: 'Evaluate your verbal reasoning, vocabulary, and communication effectiveness.',
            category: 'Verbal',
            difficulty: 'easy',
            startDate: new Date(Date.now() + 1 * 24 * 60 * 60 * 1000),
            endDate: new Date(Date.now() + 1 * 24 * 60 * 60 * 1000 + 60 * 60 * 1000),
            duration: 60,
            maxParticipants: 80,
            currentParticipants: 45,
            status: 'draft',
            isPublished: false,
            createdBy: 'Admin User',
            createdAt: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000),
            questions: 30
          },
          {
            id: '4',
            title: 'Numerical Analysis Challenge',
            description: 'Advanced mathematical reasoning, statistics, and quantitative analysis.',
            category: 'Numerical',
            difficulty: 'hard',
            startDate: new Date(Date.now() + 5 * 24 * 60 * 60 * 1000),
            endDate: new Date(Date.now() + 5 * 24 * 60 * 60 * 1000 + 150 * 60 * 1000),
            duration: 150,
            maxParticipants: 60,
            currentParticipants: 23,
            status: 'active',
            isPublished: true,
            createdBy: 'Admin User',
            createdAt: new Date(Date.now() - 4 * 24 * 60 * 60 * 1000),
            questions: 60
          }
        ]
        
        setEvents(mockEvents)
      } catch (error) {
        console.error('Failed to fetch events:', error)
      } finally {
        setLoading(false)
      }
    }

    fetchEvents()
  }, [])

  const categories = ['all', 'Technical', 'Logical', 'Verbal', 'Numerical', 'General']
  const statuses = ['all', 'active', 'draft', 'archived', 'completed']

  const filteredEvents = events.filter(event => {
    const matchesSearch = event.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         event.description.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesCategory = selectedCategory === 'all' || event.category === selectedCategory
    const matchesStatus = selectedStatus === 'all' || event.status === selectedStatus
    return matchesSearch && matchesCategory && matchesStatus
  })

  const getStatusColor = (status) => {
    switch (status) {
      case 'active':
        return 'text-green-600 bg-green-100'
      case 'draft':
        return 'text-yellow-600 bg-yellow-100'
      case 'archived':
        return 'text-gray-600 bg-gray-100'
      case 'completed':
        return 'text-blue-600 bg-blue-100'
      default:
        return 'text-gray-600 bg-gray-100'
    }
  }

  const getDifficultyColor = (difficulty) => {
    switch (difficulty) {
      case 'easy':
        return 'text-green-600 bg-green-100'
      case 'medium':
        return 'text-yellow-600 bg-yellow-100'
      case 'hard':
        return 'text-red-600 bg-red-100'
      default:
        return 'text-gray-600 bg-gray-100'
    }
  }

  const handleEdit = (event) => {
    setEditingEvent(event)
    setShowCreateModal(true)
  }

  const handleDelete = async (eventId) => {
    if (window.confirm('Are you sure you want to delete this event? This action cannot be undone.')) {
      try {
        // Mock API call
        await new Promise(resolve => setTimeout(resolve, 500))
        setEvents(events.filter(e => e.id !== eventId))
        // Show success message
      } catch (error) {
        console.error('Failed to delete event:', error)
        // Show error message
      }
    }
  }

  const handleDuplicate = async (event) => {
    try {
      // Mock API call
      await new Promise(resolve => setTimeout(resolve, 500))
      const duplicatedEvent = {
        ...event,
        id: Date.now().toString(),
        title: `${event.title} (Copy)`,
        status: 'draft',
        isPublished: false,
        currentParticipants: 0,
        createdAt: new Date()
      }
      setEvents([duplicatedEvent, ...events])
      // Show success message
    } catch (error) {
      console.error('Failed to duplicate event:', error)
      // Show error message
    }
  }

  const handleToggleStatus = async (eventId, newStatus) => {
    try {
      // Mock API call
      await new Promise(resolve => setTimeout(resolve, 500))
      setEvents(events.map(e => 
        e.id === eventId ? { ...e, status: newStatus } : e
      ))
      // Show success message
    } catch (error) {
      console.error('Failed to update event status:', error)
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
            <h2 className="text-xl font-semibold text-dark-700">Loading events...</h2>
            <p className="text-dark-500">Fetching aptitude test events</p>
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
          <h1 className="text-3xl font-bold text-dark-900 mb-2">Manage Events</h1>
          <p className="text-dark-600">Create, edit, and manage aptitude test events</p>
        </div>
        
        <button
          onClick={() => setShowCreateModal(true)}
          className="btn-primary flex items-center space-x-2 mt-4 sm:mt-0"
        >
          <Plus className="w-5 h-5" />
          <span>Create Event</span>
        </button>
      </motion.div>

      {/* Search and Filters */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="card p-6"
      >
        <div className="flex flex-col lg:flex-row gap-6 items-center">
          {/* Search */}
          <div className="flex-1 w-full lg:w-auto">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-dark-400" />
              <input
                type="text"
                placeholder="Search events..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="input-field pl-10 w-full"
              />
            </div>
          </div>

          {/* Category Filter */}
          <div className="flex items-center space-x-2">
            <Filter className="w-5 h-5 text-dark-500" />
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="input-field py-2 px-3"
            >
              {categories.map(category => (
                <option key={category} value={category}>
                  {category === 'all' ? 'All Categories' : category}
                </option>
              ))}
            </select>
          </div>

          {/* Status Filter */}
          <div className="flex items-center space-x-2">
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

      {/* Events Table */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="card overflow-hidden"
      >
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-dark-50">
              <tr>
                <th className="px-6 py-4 text-left text-sm font-semibold text-dark-900">Event</th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-dark-900">Category</th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-dark-900">Date</th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-dark-900">Participants</th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-dark-900">Status</th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-dark-900">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-dark-100">
              {filteredEvents.map((event, index) => (
                <motion.tr
                  key={event.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.05 }}
                  className="hover:bg-dark-50 transition-colors duration-200"
                >
                  <td className="px-6 py-4">
                    <div>
                      <h3 className="font-semibold text-dark-900 mb-1">{event.title}</h3>
                      <p className="text-sm text-dark-500 line-clamp-2 max-w-xs">
                        {event.description}
                      </p>
                      <div className="flex items-center space-x-2 mt-2">
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${getDifficultyColor(event.difficulty)}`}>
                          {event.difficulty}
                        </span>
                        <span className="text-xs text-dark-500">
                          {event.questions} questions
                        </span>
                      </div>
                    </div>
                  </td>
                  
                  <td className="px-6 py-4">
                    <span className="px-3 py-1 rounded-full text-sm font-medium bg-blue-100 text-blue-600">
                      {event.category}
                    </span>
                  </td>
                  
                  <td className="px-6 py-4">
                    <div className="text-sm">
                      <div className="flex items-center space-x-1 text-dark-900 mb-1">
                        <Calendar className="w-4 h-4" />
                        <span>{event.startDate.toLocaleDateString()}</span>
                      </div>
                      <div className="flex items-center space-x-1 text-dark-500">
                        <Clock className="w-4 h-4" />
                        <span>{event.duration} min</span>
                      </div>
                    </div>
                  </td>
                  
                  <td className="px-6 py-4">
                    <div className="text-sm">
                      <div className="flex items-center space-x-1 text-dark-900 mb-1">
                        <Users className="w-4 h-4" />
                        <span>{event.currentParticipants}/{event.maxParticipants}</span>
                      </div>
                      <div className="w-full bg-dark-200 rounded-full h-2">
                        <div 
                          className="bg-primary-500 h-2 rounded-full transition-all duration-300"
                          style={{ width: `${(event.currentParticipants / event.maxParticipants) * 100}%` }}
                        />
                      </div>
                    </div>
                  </td>
                  
                  <td className="px-6 py-4">
                    <span className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(event.status)}`}>
                      {event.status.charAt(0).toUpperCase() + event.status.slice(1)}
                    </span>
                    {event.isPublished && (
                      <div className="mt-1">
                        <span className="text-xs text-green-600 bg-green-50 px-2 py-1 rounded-full">
                          Published
                        </span>
                      </div>
                    )}
                  </td>
                  
                  <td className="px-6 py-4">
                    <div className="flex items-center space-x-2">
                      <button
                        onClick={() => handleEdit(event)}
                        className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                        title="Edit Event"
                      >
                        <Edit className="w-4 h-4" />
                      </button>
                      
                      <button
                        onClick={() => handleDuplicate(event)}
                        className="p-2 text-purple-600 hover:bg-purple-50 rounded-lg transition-colors"
                        title="Duplicate Event"
                      >
                        <Copy className="w-4 h-4" />
                      </button>
                      
                      <button
                        onClick={() => handleDelete(event.id)}
                        className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                        title="Delete Event"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                      
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
        
        {filteredEvents.length === 0 && (
          <div className="text-center py-16">
            <div className="w-24 h-24 bg-dark-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <Calendar className="w-12 h-12 text-dark-400" />
            </div>
            <h3 className="text-xl font-semibold text-dark-700 mb-2">No events found</h3>
            <p className="text-dark-500 mb-6">
              {searchTerm || selectedCategory !== 'all' || selectedStatus !== 'all'
                ? 'Try adjusting your search criteria or filters.'
                : "You haven't created any events yet."
              }
            </p>
            {!searchTerm && selectedCategory === 'all' && selectedStatus === 'all' && (
              <button
                onClick={() => setShowCreateModal(true)}
                className="btn-primary"
              >
                Create Your First Event
              </button>
            )}
          </div>
        )}
      </motion.div>

      {/* Create/Edit Modal */}
      <AnimatePresence>
        {showCreateModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
            onClick={() => setShowCreateModal(false)}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="bg-white rounded-2xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="p-6 border-b border-dark-100">
                <h2 className="text-2xl font-bold text-dark-900">
                  {editingEvent ? 'Edit Event' : 'Create New Event'}
                </h2>
                <p className="text-dark-600">
                  {editingEvent ? 'Update event details and settings' : 'Set up a new aptitude test event'}
                </p>
              </div>
              
              <div className="p-6">
                <form className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-dark-700 mb-2">
                        Event Title <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="text"
                        defaultValue={editingEvent?.title || ''}
                        className="input-field"
                        placeholder="Enter event title"
                        required
                      />
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-dark-700 mb-2">
                        Category <span className="text-red-500">*</span>
                      </label>
                      <select className="input-field" defaultValue={editingEvent?.category || ''} required>
                        <option value="">Select category</option>
                        {categories.filter(c => c !== 'all').map(category => (
                          <option key={category} value={category}>{category}</option>
                        ))}
                      </select>
                    </div>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-dark-700 mb-2">
                      Description <span className="text-red-500">*</span>
                    </label>
                    <textarea
                      defaultValue={editingEvent?.description || ''}
                      rows={3}
                      className="input-field"
                      placeholder="Describe the aptitude test event"
                      required
                    />
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-dark-700 mb-2">
                        Difficulty <span className="text-red-500">*</span>
                      </label>
                      <select className="input-field" defaultValue={editingEvent?.difficulty || ''} required>
                        <option value="">Select difficulty</option>
                        <option value="easy">Easy</option>
                        <option value="medium">Medium</option>
                        <option value="hard">Hard</option>
                      </select>
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-dark-700 mb-2">
                        Duration (minutes) <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="number"
                        defaultValue={editingEvent?.duration || ''}
                        className="input-field"
                        placeholder="120"
                        min="15"
                        required
                      />
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-dark-700 mb-2">
                        Max Participants <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="number"
                        defaultValue={editingEvent?.maxParticipants || ''}
                        className="input-field"
                        placeholder="100"
                        min="1"
                        required
                      />
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-dark-700 mb-2">
                        Start Date <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="datetime-local"
                        defaultValue={editingEvent?.startDate?.toISOString().slice(0, 16) || ''}
                        className="input-field"
                        required
                      />
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-dark-700 mb-2">
                        End Date <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="datetime-local"
                        defaultValue={editingEvent?.endDate?.toISOString().slice(0, 16) || ''}
                        className="input-field"
                        required
                      />
                    </div>
                  </div>
                  
                  <div className="flex items-center space-x-4">
                    <label className="flex items-center space-x-2">
                      <input
                        type="checkbox"
                        defaultChecked={editingEvent?.isPublished || false}
                        className="w-4 h-4 text-primary-600 border-dark-300 rounded focus:ring-primary-500"
                      />
                      <span className="text-sm text-dark-700">Publish immediately</span>
                    </label>
                  </div>
                </form>
              </div>
              
              <div className="p-6 border-t border-dark-100 flex justify-end space-x-3">
                <button
                  onClick={() => setShowCreateModal(false)}
                  className="btn-outline"
                >
                  Cancel
                </button>
                <button className="btn-primary">
                  {editingEvent ? 'Update Event' : 'Create Event'}
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

export default ManageEvents
  