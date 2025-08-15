import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { 
  Award, 
  Download, 
  Eye, 
  Calendar, 
  Star, 
  Filter,
  Search,
  Share2,
  Printer,
  CheckCircle
} from 'lucide-react'
import { formatDate } from '../../utils/formatDate'

const MyCertificates = () => {
  const [certificates, setCertificates] = useState([])
  const [loading, setLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('all')
  const [viewMode, setViewMode] = useState('grid') // grid or list

  // Mock data - replace with actual API call
  useEffect(() => {
    const fetchCertificates = async () => {
      try {
        await new Promise(resolve => setTimeout(resolve, 1000))
        
        const mockCertificates = [
          {
            id: '1',
            title: 'Advanced Technical Aptitude Test',
            category: 'Technical',
            score: 92,
            issuedDate: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000),
            eventId: 'event-1',
            certificateId: 'CERT-001-2024',
            downloadUrl: '#',
            status: 'active',
            image: 'https://images.unsplash.com/photo-1517077304055-6e89abbf09b0?w=500&h=300&fit=crop'
          },
          {
            id: '2',
            title: 'Logical Reasoning Assessment',
            category: 'Logical',
            score: 85,
            issuedDate: new Date(Date.now() - 15 * 24 * 60 * 60 * 1000),
            eventId: 'event-2',
            certificateId: 'CERT-002-2024',
            downloadUrl: '#',
            status: 'active',
            image: 'https://images.unsplash.com/photo-1559757148-5c350d0d3c56?w=500&h=300&fit=crop'
          },
          {
            id: '3',
            title: 'Numerical Analysis Challenge',
            category: 'Numerical',
            score: 78,
            issuedDate: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000),
            eventId: 'event-3',
            certificateId: 'CERT-003-2024',
            downloadUrl: '#',
            status: 'active',
            image: 'https://images.unsplash.com/photo-1635070041078-e363dbe005cb?w=500&h=300&fit=crop'
          },
          {
            id: '4',
            title: 'Verbal Communication Skills',
            category: 'Verbal',
            score: 88,
            issuedDate: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000),
            eventId: 'event-4',
            certificateId: 'CERT-004-2024',
            downloadUrl: '#',
            status: 'active',
            image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=500&h=300&fit=crop'
          },
          {
            id: '5',
            title: 'General Aptitude Mastery',
            category: 'General',
            score: 95,
            issuedDate: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000),
            eventId: 'event-5',
            certificateId: 'CERT-005-2024',
            downloadUrl: '#',
            status: 'active',
            image: 'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=500&h=300&fit=crop'
          },
          {
            id: '6',
            title: 'AI & Machine Learning Aptitude',
            category: 'Technical',
            score: 87,
            issuedDate: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000),
            eventId: 'event-6',
            certificateId: 'CERT-006-2024',
            downloadUrl: '#',
            status: 'active',
            image: 'https://images.unsplash.com/photo-1677442136019-21780ecad995?w=500&h=300&fit=crop'
          }
        ]
        
        setCertificates(mockCertificates)
      } catch (error) {
        console.error('Failed to fetch certificates:', error)
      } finally {
        setLoading(false)
      }
    }

    fetchCertificates()
  }, [])

  const categories = ['all', 'Technical', 'Logical', 'Verbal', 'Numerical', 'General']

  const filteredCertificates = certificates.filter(cert => {
    const matchesSearch = cert.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         cert.category.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesCategory = selectedCategory === 'all' || cert.category === selectedCategory
    return matchesSearch && matchesCategory
  })

  const stats = {
    total: certificates.length,
    technical: certificates.filter(c => c.category === 'Technical').length,
    averageScore: Math.round(certificates.reduce((sum, cert) => sum + cert.score, 0) / certificates.length),
    recent: certificates.filter(c => {
      const daysDiff = (Date.now() - c.issuedDate.getTime()) / (1000 * 60 * 60 * 24)
      return daysDiff <= 7
    }).length
  }

  const handleDownload = (certificate) => {
    // Mock download functionality
    console.log(`Downloading certificate: ${certificate.title}`)
    // In real app, this would trigger actual file download
  }

  const handleView = (certificate) => {
    // Mock view functionality
    console.log(`Viewing certificate: ${certificate.title}`)
    // In real app, this would open certificate viewer
  }

  const handleShare = (certificate) => {
    // Mock share functionality
    if (navigator.share) {
      navigator.share({
        title: certificate.title,
        text: `I earned a certificate in ${certificate.title} with a score of ${certificate.score}%!`,
        url: window.location.href
      })
    } else {
      // Fallback for browsers that don't support Web Share API
      navigator.clipboard.writeText(`${certificate.title} - Score: ${certificate.score}%`)
      alert('Certificate details copied to clipboard!')
    }
  }

  const handlePrint = (certificate) => {
    // Mock print functionality
    console.log(`Printing certificate: ${certificate.title}`)
    // In real app, this would open print dialog
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
              <h2 className="text-xl font-semibold text-dark-700">Loading certificates...</h2>
              <p className="text-dark-500">Fetching your earned achievements</p>
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
          <div className="flex justify-center mb-6">
            <div className="w-20 h-20 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-full flex items-center justify-center">
              <Award className="w-10 h-10 text-white" />
            </div>
          </div>
          <h1 className="text-4xl font-bold text-dark-900 mb-4">
            My Certificates
          </h1>
          <p className="text-xl text-dark-600 max-w-3xl mx-auto">
            Celebrate your achievements! View, download, and share your earned aptitude test certificates.
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
            <div className="w-12 h-12 bg-yellow-100 rounded-xl flex items-center justify-center mx-auto mb-4">
              <Award className="w-6 h-6 text-yellow-600" />
            </div>
            <h3 className="text-2xl font-bold text-dark-900">{stats.total}</h3>
            <p className="text-dark-600">Total Certificates</p>
          </div>
          
          <div className="card text-center p-6">
            <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center mx-auto mb-4">
              <Star className="w-6 h-6 text-blue-600" />
            </div>
            <h3 className="text-2xl font-bold text-dark-900">{stats.averageScore}%</h3>
            <p className="text-dark-600">Average Score</p>
          </div>
          
          <div className="card text-center p-6">
            <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center mx-auto mb-4">
              <CheckCircle className="w-6 h-6 text-green-600" />
            </div>
            <h3 className="text-2xl font-bold text-dark-900">{stats.technical}</h3>
            <p className="text-dark-600">Technical Certs</p>
          </div>
          
          <div className="card text-center p-6">
            <div className="w-12 h-12 bg-purple-100 rounded-xl flex items-center justify-center mx-auto mb-4">
              <Calendar className="w-6 h-6 text-purple-600" />
            </div>
            <h3 className="text-2xl font-bold text-dark-900">{stats.recent}</h3>
            <p className="text-dark-600">Recent (7 days)</p>
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
                  placeholder="Search certificates..."
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

            {/* View Mode Toggle */}
            <div className="flex items-center space-x-2 bg-dark-100 rounded-lg p-1">
              <button
                onClick={() => setViewMode('grid')}
                className={`p-2 rounded-md transition-colors ${
                  viewMode === 'grid' ? 'bg-white text-primary-600 shadow-soft' : 'text-dark-500 hover:text-dark-700'
                }`}
              >
                <div className="w-5 h-5 grid grid-cols-2 gap-0.5">
                  <div className="w-2 h-2 bg-current rounded-sm"></div>
                  <div className="w-2 h-2 bg-current rounded-sm"></div>
                  <div className="w-2 h-2 bg-current rounded-sm"></div>
                  <div className="w-2 h-2 bg-current rounded-sm"></div>
                </div>
              </button>
              <button
                onClick={() => setViewMode('list')}
                className={`p-2 rounded-md transition-colors ${
                  viewMode === 'list' ? 'bg-white text-primary-600 shadow-soft' : 'text-dark-500 hover:text-dark-700'
                }`}
              >
                <div className="w-5 h-5 flex flex-col gap-0.5">
                  <div className="w-full h-1 bg-current rounded-sm"></div>
                  <div className="w-full h-1 bg-current rounded-sm"></div>
                  <div className="w-full h-1 bg-current rounded-sm"></div>
                </div>
              </button>
            </div>
          </div>
        </motion.div>

        {/* Certificates Grid/List */}
        <AnimatePresence mode="wait">
          {filteredCertificates.length === 0 ? (
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="text-center py-16"
            >
              <div className="w-24 h-24 bg-dark-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <Award className="w-12 h-12 text-dark-400" />
              </div>
              <h3 className="text-xl font-semibold text-dark-700 mb-2">No certificates found</h3>
              <p className="text-dark-500 mb-6">
                {searchTerm || selectedCategory !== 'all'
                  ? 'Try adjusting your search criteria or filters.'
                  : "You haven't earned any certificates yet. Take some aptitude tests to get started!"
                }
              </p>
              {!searchTerm && selectedCategory === 'all' && (
                <button className="btn-primary">
                  Browse Available Tests
                </button>
              )}
            </motion.div>
          ) : (
            <motion.div
              key={`${viewMode}-${filteredCertificates.length}`}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className={viewMode === 'grid' 
                ? 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8'
                : 'space-y-6'
              }
            >
              {filteredCertificates.map((certificate, index) => (
                <motion.div
                  key={certificate.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className={`card-hover overflow-hidden group ${
                    viewMode === 'list' ? 'p-6' : 'p-0'
                  }`}
                >
                  {viewMode === 'grid' ? (
                    // Grid View
                    <>
                      {/* Certificate Image */}
                      <div className="relative h-48 bg-gradient-to-br from-yellow-100 to-orange-100 overflow-hidden">
                        {certificate.image ? (
                          <img
                            src={certificate.image}
                            alt={certificate.title}
                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                          />
                        ) : (
                          <div className="w-full h-full flex items-center justify-center">
                            <div className="text-6xl font-bold text-yellow-300">{certificate.category[0]}</div>
                          </div>
                        )}
                        
                        {/* Overlay */}
                        <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
                        
                        {/* Score Badge */}
                        <div className="absolute top-4 right-4">
                          <span className="px-3 py-1 rounded-full text-sm font-bold bg-white/90 text-dark-900">
                            {certificate.score}%
                          </span>
                        </div>
                        
                        {/* Category Badge */}
                        <div className="absolute bottom-4 left-4">
                          <span className="px-3 py-1 rounded-full text-xs font-medium bg-white/80 text-dark-700">
                            {certificate.category}
                          </span>
                        </div>
                      </div>

                      {/* Certificate Content */}
                      <div className="p-6">
                        <h3 className="text-xl font-bold text-dark-900 mb-2 group-hover:text-primary-600 transition-colors">
                          {certificate.title}
                        </h3>
                        
                        <div className="flex items-center space-x-2 text-dark-500 mb-4">
                          <Calendar className="w-4 h-4" />
                          <span className="text-sm">{formatDate(certificate.issuedDate)}</span>
                        </div>

                        <div className="flex items-center justify-between mb-4">
                          <span className="text-sm text-dark-500">
                            ID: {certificate.certificateId}
                          </span>
                          <div className="flex items-center space-x-2">
                            <Star className="w-4 h-4 text-yellow-500 fill-current" />
                            <span className="text-sm font-medium text-dark-700">{certificate.score}%</span>
                          </div>
                        </div>

                        {/* Action Buttons */}
                        <div className="flex space-x-2">
                          <button
                            onClick={() => handleView(certificate)}
                            className="flex-1 btn-outline py-2 text-sm"
                          >
                            <Eye className="w-4 h-4 mr-2" />
                            View
                          </button>
                          <button
                            onClick={() => handleDownload(certificate)}
                            className="flex-1 btn-primary py-2 text-sm"
                          >
                            <Download className="w-4 h-4 mr-2" />
                            Download
                          </button>
                        </div>
                      </div>
                    </>
                  ) : (
                    // List View
                    <div className="flex items-center space-x-4">
                      <div className="w-16 h-16 bg-gradient-to-br from-yellow-100 to-orange-100 rounded-xl flex items-center justify-center flex-shrink-0">
                        <Award className="w-8 h-8 text-yellow-600" />
                      </div>
                      
                      <div className="flex-1 min-w-0">
                        <h3 className="text-lg font-bold text-dark-900 mb-1">
                          {certificate.title}
                        </h3>
                        <div className="flex items-center space-x-4 text-sm text-dark-500">
                          <span className="flex items-center space-x-1">
                            <Calendar className="w-4 h-4" />
                            <span>{formatDate(certificate.issuedDate)}</span>
                          </span>
                          <span className="px-2 py-1 rounded-full text-xs bg-gray-100 text-gray-600">
                            {certificate.category}
                          </span>
                          <span className="flex items-center space-x-1">
                            <Star className="w-4 h-4 text-yellow-500 fill-current" />
                            <span>{certificate.score}%</span>
                          </span>
                        </div>
                      </div>
                      
                      <div className="flex items-center space-x-2 flex-shrink-0">
                        <button
                          onClick={() => handleView(certificate)}
                          className="p-2 text-dark-500 hover:text-primary-600 transition-colors"
                          title="View Certificate"
                        >
                          <Eye className="w-5 h-5" />
                        </button>
                        <button
                          onClick={() => handleDownload(certificate)}
                          className="p-2 text-dark-500 hover:text-primary-600 transition-colors"
                          title="Download Certificate"
                        >
                          <Download className="w-5 h-5" />
                        </button>
                        <button
                          onClick={() => handleShare(certificate)}
                          className="p-2 text-dark-500 hover:text-secondary-600 transition-colors"
                          title="Share Certificate"
                        >
                          <Share2 className="w-5 h-5" />
                        </button>
                        <button
                          onClick={() => handlePrint(certificate)}
                          className="p-2 text-dark-500 hover:text-accent-600 transition-colors"
                          title="Print Certificate"
                        >
                          <Printer className="w-5 h-5" />
                        </button>
                      </div>
                    </div>
                  )}
                </motion.div>
              ))}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  )
}

export default MyCertificates
  