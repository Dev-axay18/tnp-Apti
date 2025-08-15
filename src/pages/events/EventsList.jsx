import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Search, Filter, Grid3X3, List, Calendar, Users, Clock, TrendingUp } from 'lucide-react'
import EventCard from '../../components/EventCard'
import Loader from '../../components/Loader'

const EventsList = () => {
  const [events, setEvents] = useState([])
  const [filteredEvents, setFilteredEvents] = useState([])
  const [loading, setLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('all')
  const [selectedDifficulty, setSelectedDifficulty] = useState('all')
  const [viewMode, setViewMode] = useState('grid')
  const [sortBy, setSortBy] = useState('date')

  // Mock data - replace with actual API call
  useEffect(() => {
    const fetchEvents = async () => {
      try {
        await new Promise(resolve => setTimeout(resolve, 1500))
        
        const mockEvents = [
          {
            id: '1',
            title: 'Advanced Technical Aptitude Test',
            description: 'Comprehensive assessment covering programming, algorithms, data structures, and system design.',
            startDate: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
            endDate: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000 + 2 * 60 * 60 * 1000),
            duration: 120,
            maxParticipants: 100,
            currentParticipants: 67,
            difficulty: 'hard',
            category: 'Technical',
            image: 'https://images.unsplash.com/photo-1517077304055-6e89abbf09b0?w=500&h=300&fit=crop',
            isRegistered: false,
            score: null,
            certificate: false
          },
          {
            id: '2',
            title: 'Logical Reasoning Assessment',
            description: 'Test your logical thinking, pattern recognition, and problem-solving abilities.',
            startDate: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000),
            endDate: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000 + 90 * 60 * 1000),
            duration: 90,
            maxParticipants: 150,
            currentParticipants: 89,
            difficulty: 'medium',
            category: 'Logical',
            image: 'https://images.unsplash.com/photo-1559757148-5c350d0d3c56?w=500&h=300&fit=crop',
            isRegistered: true,
            score: 85,
            certificate: true
          }
        ]
        
        setEvents(mockEvents)
        setFilteredEvents(mockEvents)
      } catch (error) {
        console.error('Failed to fetch events:', error)
      } finally {
        setLoading(false)
      }
    }

    fetchEvents()
  }, [])

  // Filter and search events
  useEffect(() => {
    let filtered = events.filter(event => {
      const matchesSearch = event.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           event.description.toLowerCase().includes(searchTerm.toLowerCase())
      
      const matchesCategory = selectedCategory === 'all' || event.category === selectedCategory
      const matchesDifficulty = selectedDifficulty === 'all' || event.difficulty === selectedDifficulty
      
      return matchesSearch && matchesCategory && matchesDifficulty
    })

    // Sort events
    filtered.sort((a, b) => {
      switch (sortBy) {
        case 'date':
          return new Date(a.startDate) - new Date(b.startDate)
        case 'participants':
          return b.currentParticipants - a.currentParticipants
        case 'duration':
          return a.duration - b.duration
        case 'difficulty':
          const difficultyOrder = { easy: 1, medium: 2, hard: 3 }
          return difficultyOrder[a.difficulty] - difficultyOrder[b.difficulty]
        default:
          return 0
      }
    })

    setFilteredEvents(filtered)
  }, [events, searchTerm, selectedCategory, selectedDifficulty, sortBy])

  const categories = ['all', 'Technical', 'Logical', 'Verbal', 'Numerical', 'General']
  const difficulties = ['all', 'easy', 'medium', 'hard']

  if (loading) {
    return (
      <div className="section-padding">
        <div className="container-custom">
          <div className="flex justify-center items-center min-h-[400px]">
            <Loader size="lg" text="Loading aptitude tests..." variant="pulse" />
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
            Available Aptitude Tests
          </h1>
          <p className="text-xl text-dark-600 max-w-3xl mx-auto">
            Choose from our comprehensive selection of aptitude tests designed to assess your skills 
            and help you earn professional certificates.
          </p>
        </motion.div>

        {/* Stats */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8"
        >
          <div className="card text-center p-6">
            <Calendar className="w-8 h-8 text-primary-500 mx-auto mb-3" />
            <h3 className="text-2xl font-bold text-dark-900">{filteredEvents.length}</h3>
            <p className="text-dark-600">Available Tests</p>
          </div>
          <div className="card text-center p-6">
            <Users className="w-8 h-8 text-secondary-500 mx-auto mb-3" />
            <h3 className="text-2xl font-bold text-dark-900">
              {filteredEvents.reduce((sum, event) => sum + event.currentParticipants, 0)}
            </h3>
            <p className="text-dark-600">Total Participants</p>
          </div>
          <div className="card text-center p-6">
            <Clock className="w-8 h-8 text-accent-500 mx-auto mb-3" />
            <h3 className="text-2xl font-bold text-dark-900">
              {filteredEvents.reduce((sum, event) => sum + event.duration, 0)}m
            </h3>
            <p className="text-dark-600">Total Duration</p>
          </div>
          <div className="card text-center p-6">
            <TrendingUp className="w-8 h-8 text-green-500 mx-auto mb-3" />
            <h3 className="text-2xl font-bold text-dark-900">
              {Math.round(filteredEvents.reduce((sum, event) => sum + (event.currentParticipants / event.maxParticipants), 0) / filteredEvents.length * 100)}%
            </h3>
            <p className="text-dark-600">Avg. Participation</p>
          </div>
        </motion.div>

        {/* Search and Filters */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="card p-6 mb-8"
        >
          <div className="flex flex-col lg:flex-row gap-6 items-center">
            {/* Search */}
            <div className="flex-1 w-full lg:w-auto">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-dark-400" />
                <input
                  type="text"
                  placeholder="Search aptitude tests..."
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

            {/* Difficulty Filter */}
            <div className="flex items-center space-x-2">
              <select
                value={selectedDifficulty}
                onChange={(e) => setSelectedDifficulty(e.target.value)}
                className="input-field py-2 px-3"
              >
                {difficulties.map(difficulty => (
                  <option key={difficulty} value={difficulty}>
                    {difficulty === 'all' ? 'All Difficulties' : difficulty}
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
                <option value="date">Sort by Date</option>
                <option value="participants">Sort by Participants</option>
                <option value="duration">Sort by Duration</option>
                <option value="difficulty">Sort by Difficulty</option>
              </select>
            </div>

            {/* View Mode Toggle */}
            <div className="flex items-center space-x-2 bg-dark-100 rounded-lg p-1">
              <button
                onClick={() => setViewMode('grid')}
                className={`p-2 rounded-md transition-colors ${
                  viewMode === 'grid' ? 'bg-white text-primary-600 shadow-soft' : 'text-dark-500 hover:text-dark-700'
                }`}
              >
                <Grid3X3 className="w-5 h-5" />
              </button>
              <button
                onClick={() => setViewMode('list')}
                className={`p-2 rounded-md transition-colors ${
                  viewMode === 'list' ? 'bg-white text-primary-600 shadow-soft' : 'text-dark-500 hover:text-dark-700'
                }`}
              >
                <List className="w-5 h-5" />
              </button>
            </div>
          </div>
        </motion.div>

        {/* Events Grid/List */}
        <AnimatePresence mode="wait">
          {filteredEvents.length === 0 ? (
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="text-center py-16"
            >
              <div className="w-24 h-24 bg-dark-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <Search className="w-12 h-12 text-dark-400" />
              </div>
              <h3 className="text-xl font-semibold text-dark-700 mb-2">No tests found</h3>
              <p className="text-dark-500 mb-6">
                Try adjusting your search criteria or filters to find more aptitude tests.
              </p>
              <button
                onClick={() => {
                  setSearchTerm('')
                  setSelectedCategory('all')
                  setSelectedDifficulty('all')
                }}
                className="btn-outline"
              >
                Clear Filters
              </button>
            </motion.div>
          ) : (
            <motion.div
              key={`${viewMode}-${filteredEvents.length}`}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className={viewMode === 'grid' 
                ? 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8'
                : 'space-y-6'
              }
            >
              {filteredEvents.map((event, index) => (
                <motion.div
                  key={event.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                >
                  <EventCard 
                    event={event} 
                    variant={viewMode === 'list' ? 'compact' : 'default'}
                  />
                </motion.div>
              ))}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  )
}

export default EventsList
