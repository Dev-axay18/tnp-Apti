import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { 
  Upload, 
  FileText, 
  Calendar, 
  Users, 
  Search, 
  Filter, 
  Download, 
  Eye, 
  Trash2, 
  CheckCircle, 
  XCircle,
  Plus,
  MoreVertical
} from 'lucide-react'
import { formatDate } from '../../utils/formatDate'

const UploadCertificate = () => {
  const [events, setEvents] = useState([])
  const [certificates, setCertificates] = useState([])
  const [loading, setLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedEvent, setSelectedEvent] = useState('all')
  const [showUploadModal, setShowUploadModal] = useState(false)
  const [uploadingFile, setUploadingFile] = useState(null)

  // Mock data - replace with actual API call
  useEffect(() => {
    const fetchData = async () => {
      try {
        await new Promise(resolve => setTimeout(resolve, 1000))
        
        const mockEvents = [
          {
            id: '1',
            title: 'Advanced Technical Aptitude Test',
            category: 'Technical',
            participants: 67,
            completed: 45
          },
          {
            id: '2',
            title: 'Logical Reasoning Assessment',
            category: 'Logical',
            participants: 89,
            completed: 72
          },
          {
            id: '3',
            title: 'Verbal Communication Skills',
            category: 'Verbal',
            participants: 45,
            completed: 38
          }
        ]
        
        const mockCertificates = [
          {
            id: '1',
            eventId: '1',
            eventTitle: 'Advanced Technical Aptitude Test',
            participantName: 'John Doe',
            participantEmail: 'john.doe@example.com',
            fileName: 'certificate_john_doe.pdf',
            fileSize: '2.4 MB',
            uploadDate: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000),
            status: 'active',
            downloadUrl: '#'
          },
          {
            id: '2',
            eventId: '1',
            eventTitle: 'Advanced Technical Aptitude Test',
            participantName: 'Jane Smith',
            participantEmail: 'jane.smith@example.com',
            fileName: 'certificate_jane_smith.pdf',
            fileSize: '2.1 MB',
            uploadDate: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000),
            status: 'active',
            downloadUrl: '#'
          },
          {
            id: '3',
            eventId: '2',
            eventTitle: 'Logical Reasoning Assessment',
            participantName: 'Mike Johnson',
            participantEmail: 'mike.johnson@example.com',
            fileName: 'certificate_mike_johnson.pdf',
            fileSize: '1.8 MB',
            uploadDate: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000),
            status: 'active',
            downloadUrl: '#'
          }
        ]
        
        setEvents(mockEvents)
        setCertificates(mockCertificates)
      } catch (error) {
        console.error('Failed to fetch data:', error)
      } finally {
        setLoading(false)
      }
    }

    fetchData()
  }, [])

  const filteredCertificates = certificates.filter(cert => {
    const matchesSearch = cert.participantName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         cert.eventTitle.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesEvent = selectedEvent === 'all' || cert.eventId === selectedEvent
    return matchesSearch && matchesEvent
  })

  const stats = {
    total: certificates.length,
    totalEvents: events.length,
    totalParticipants: events.reduce((sum, event) => sum + event.participants, 0),
    completedTests: events.reduce((sum, event) => sum + event.completed, 0)
  }

  const handleFileUpload = async (event) => {
    const file = event.target.files[0]
    if (file) {
      setUploadingFile(file)
      // Mock upload process
      setTimeout(() => {
        setUploadingFile(null)
        setShowUploadModal(false)
        // Show success message
      }, 2000)
    }
  }

  const handleDeleteCertificate = async (certId) => {
    if (window.confirm('Are you sure you want to delete this certificate? This action cannot be undone.')) {
      try {
        // Mock API call
        await new Promise(resolve => setTimeout(resolve, 500))
        setCertificates(certificates.filter(c => c.id !== certId))
        // Show success message
      } catch (error) {
        console.error('Failed to delete certificate:', error)
        // Show error message
      }
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
            <h2 className="text-xl font-semibold text-dark-700">Loading certificates...</h2>
            <p className="text-dark-500">Fetching certificate data</p>
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
          <h1 className="text-3xl font-bold text-dark-900 mb-2">Upload Certificates</h1>
          <p className="text-dark-600">Manage and upload aptitude test certificates for participants</p>
        </div>
        
        <button
          onClick={() => setShowUploadModal(true)}
          className="btn-primary flex items-center space-x-2 mt-4 sm:mt-0"
        >
          <Plus className="w-5 h-5" />
          <span>Upload Certificate</span>
        </button>
      </motion.div>

      {/* Stats Cards */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="grid grid-cols-1 md:grid-cols-4 gap-6"
      >
        <div className="card text-center p-6">
          <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center mx-auto mb-4">
            <FileText className="w-6 h-6 text-blue-600" />
          </div>
          <h3 className="text-2xl font-bold text-dark-900">{stats.total}</h3>
          <p className="text-dark-600 text-sm">Total Certificates</p>
        </div>
        
        <div className="card text-center p-6">
          <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center mx-auto mb-4">
            <Calendar className="w-6 h-6 text-green-600" />
          </div>
          <h3 className="text-2xl font-bold text-dark-900">{stats.totalEvents}</h3>
          <p className="text-dark-600 text-sm">Active Events</p>
        </div>
        
        <div className="card text-center p-6">
          <div className="w-12 h-12 bg-purple-100 rounded-xl flex items-center justify-center mx-auto mb-4">
            <Users className="w-6 h-6 text-purple-600" />
          </div>
          <h3 className="text-2xl font-bold text-dark-900">{stats.totalParticipants}</h3>
          <p className="text-dark-600 text-sm">Total Participants</p>
        </div>
        
        <div className="card text-center p-6">
          <div className="w-12 h-12 bg-yellow-100 rounded-xl flex items-center justify-center mx-auto mb-4">
            <CheckCircle className="w-6 h-6 text-yellow-600" />
          </div>
          <h3 className="text-2xl font-bold text-dark-900">{stats.completedTests}</h3>
          <p className="text-dark-600 text-sm">Completed Tests</p>
        </div>
      </motion.div>

      {/* Search and Filters */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="card p-6"
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

          {/* Event Filter */}
          <div className="flex items-center space-x-2">
            <Filter className="w-5 h-5 text-dark-500" />
            <select
              value={selectedEvent}
              onChange={(e) => setSelectedEvent(e.target.value)}
              className="input-field py-2 px-3"
            >
              <option value="all">All Events</option>
              {events.map(event => (
                <option key={event.id} value={event.id}>
                  {event.title}
                </option>
              ))}
            </select>
          </div>
        </div>
      </motion.div>

      {/* Certificates Table */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="card overflow-hidden"
      >
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-dark-50">
              <tr>
                <th className="px-6 py-4 text-left text-sm font-semibold text-dark-900">Certificate</th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-dark-900">Event</th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-dark-900">Participant</th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-dark-900">Upload Date</th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-dark-900">Status</th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-dark-900">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-dark-100">
              {filteredCertificates.map((certificate, index) => (
                <motion.tr
                  key={certificate.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.05 }}
                  className="hover:bg-dark-50 transition-colors duration-200"
                >
                  <td className="px-6 py-4">
                    <div className="flex items-center space-x-3">
                      <div className="w-10 h-10 bg-red-100 rounded-lg flex items-center justify-center">
                        <FileText className="w-5 h-5 text-red-600" />
                      </div>
                      <div>
                        <h3 className="font-semibold text-dark-900">{certificate.fileName}</h3>
                        <p className="text-sm text-dark-500">{certificate.fileSize}</p>
                      </div>
                    </div>
                  </td>
                  
                  <td className="px-6 py-4">
                    <div className="text-sm">
                      <div className="text-dark-900 mb-1">{certificate.eventTitle}</div>
                      <div className="text-dark-500">Technical</div>
                    </div>
                  </td>
                  
                  <td className="px-6 py-4">
                    <div className="text-sm">
                      <div className="text-dark-900 mb-1">{certificate.participantName}</div>
                      <div className="text-dark-500">{certificate.participantEmail}</div>
                    </div>
                  </td>
                  
                  <td className="px-6 py-4">
                    <div className="text-sm">
                      <div className="text-dark-900 mb-1">
                        {formatDate(certificate.uploadDate, { month: 'short', day: 'numeric' })}
                      </div>
                      <div className="text-dark-500">
                        {certificate.uploadDate.toLocaleDateString()}
                      </div>
                    </div>
                  </td>
                  
                  <td className="px-6 py-4">
                    <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                      certificate.status === 'active' ? 'text-green-600 bg-green-100' : 'text-gray-600 bg-gray-100'
                    }`}>
                      {certificate.status === 'active' ? (
                        <span className="flex items-center space-x-1">
                          <CheckCircle className="w-4 h-4" />
                          <span>Active</span>
                        </span>
                      ) : (
                        <span className="flex items-center space-x-1">
                          <XCircle className="w-4 h-4" />
                          <span>Inactive</span>
                        </span>
                      )}
                    </span>
                  </td>
                  
                  <td className="px-6 py-4">
                    <div className="flex items-center space-x-2">
                      <button
                        className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                        title="View Certificate"
                      >
                        <Eye className="w-4 h-4" />
                      </button>
                      
                      <button
                        className="p-2 text-green-600 hover:bg-green-50 rounded-lg transition-colors"
                        title="Download Certificate"
                      >
                        <Download className="w-4 h-4" />
                      </button>
                      
                      <button
                        onClick={() => handleDeleteCertificate(certificate.id)}
                        className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                        title="Delete Certificate"
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
        
        {filteredCertificates.length === 0 && (
          <div className="text-center py-16">
            <div className="w-24 h-24 bg-dark-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <FileText className="w-12 h-12 text-dark-400" />
            </div>
            <h3 className="text-xl font-semibold text-dark-700 mb-2">No certificates found</h3>
            <p className="text-dark-500 mb-6">
              {searchTerm || selectedEvent !== 'all'
                ? 'Try adjusting your search criteria or filters.'
                : "No certificates have been uploaded yet."
              }
            </p>
            {!searchTerm && selectedEvent === 'all' && (
              <button
                onClick={() => setShowUploadModal(true)}
                className="btn-primary"
              >
                Upload Your First Certificate
              </button>
            )}
          </div>
        )}
      </motion.div>

      {/* Upload Modal */}
      <AnimatePresence>
        {showUploadModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
            onClick={() => setShowUploadModal(false)}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="bg-white rounded-2xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="p-6 border-b border-dark-100">
                <h2 className="text-2xl font-bold text-dark-900">Upload Certificate</h2>
                <p className="text-dark-600">Upload a new certificate for a participant</p>
              </div>
              
              <div className="p-6">
                <form className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-dark-700 mb-2">
                        Select Event <span className="text-red-500">*</span>
                      </label>
                      <select className="input-field" required>
                        <option value="">Choose an event</option>
                        {events.map(event => (
                          <option key={event.id} value={event.id}>
                            {event.title}
                          </option>
                        ))}
                      </select>
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-dark-700 mb-2">
                        Participant Name <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="text"
                        className="input-field"
                        placeholder="Enter participant name"
                        required
                      />
                    </div>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-dark-700 mb-2">
                      Participant Email <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="email"
                      className="input-field"
                      placeholder="Enter participant email"
                      required
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-dark-700 mb-2">
                      Certificate File <span className="text-red-500">*</span>
                    </label>
                    <div className="border-2 border-dashed border-dark-200 rounded-lg p-8 text-center hover:border-primary-300 transition-colors">
                      {uploadingFile ? (
                        <div className="space-y-4">
                          <div className="w-16 h-16 mx-auto">
                            <div className="spinner"></div>
                          </div>
                          <div>
                            <h3 className="text-lg font-semibold text-dark-900">Uploading...</h3>
                            <p className="text-dark-500">Please wait while we process your file</p>
                          </div>
                        </div>
                      ) : (
                        <div className="space-y-4">
                          <Upload className="w-16 h-16 mx-auto text-dark-400" />
                          <div>
                            <h3 className="text-lg font-semibold text-dark-900">Drop files here</h3>
                            <p className="text-dark-500">or click to browse</p>
                          </div>
                          <input
                            type="file"
                            accept=".pdf,.doc,.docx,.jpg,.jpeg,.png"
                            onChange={handleFileUpload}
                            className="hidden"
                            id="file-upload"
                            required
                          />
                          <label htmlFor="file-upload" className="btn-outline cursor-pointer">
                            Choose File
                          </label>
                        </div>
                      )}
                    </div>
                    <p className="text-xs text-dark-500 mt-2">
                      Supported formats: PDF, DOC, DOCX, JPG, JPEG, PNG (Max size: 10MB)
                    </p>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-dark-700 mb-2">
                      Notes (Optional)
                    </label>
                    <textarea
                      rows={3}
                      className="input-field"
                      placeholder="Add any additional notes about this certificate..."
                    />
                  </div>
                  
                  <div className="flex justify-end space-x-3">
                    <button
                      type="button"
                      onClick={() => setShowUploadModal(false)}
                      className="btn-outline"
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      className="btn-primary flex items-center space-x-2"
                      disabled={uploadingFile}
                    >
                      <Upload className="w-4 h-4" />
                      <span>{uploadingFile ? 'Uploading...' : 'Upload Certificate'}</span>
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

export default UploadCertificate
  