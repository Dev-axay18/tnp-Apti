import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { 
  Users, 
  Calendar, 
  Award, 
  TrendingUp, 
  TrendingDown,
  Activity,
  BarChart3,
  PieChart,
  LineChart,
  Eye,
  Download,
  Clock,
  CheckCircle,
  XCircle,
  Star
} from 'lucide-react'

const Dashboard = () => {
  const [stats, setStats] = useState({})
  const [loading, setLoading] = useState(true)
  const [timeRange, setTimeRange] = useState('7d') // 7d, 30d, 90d

  // Mock data - replace with actual API call
  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        await new Promise(resolve => setTimeout(resolve, 1000))
        
        const mockStats = {
          overview: {
            totalUsers: 1247,
            totalEvents: 89,
            totalRegistrations: 3456,
            totalCertificates: 2891,
            activeUsers: 892,
            pendingApprovals: 23
          },
          recentActivity: [
            {
              id: '1',
              type: 'registration',
              user: 'John Doe',
              event: 'Technical Aptitude Test',
              time: new Date(Date.now() - 5 * 60 * 1000),
              status: 'completed'
            },
            {
              id: '2',
              type: 'certificate',
              user: 'Jane Smith',
              event: 'Logical Reasoning',
              time: new Date(Date.now() - 15 * 60 * 1000),
              status: 'issued'
            },
            {
              id: '3',
              type: 'event',
              title: 'AI & ML Aptitude Test',
              time: new Date(Date.now() - 2 * 60 * 60 * 1000),
              status: 'created'
            }
          ],
          performance: {
            averageScore: 78.5,
            completionRate: 92.3,
            satisfactionRate: 4.6,
            growthRate: 15.7
          },
          topEvents: [
            { name: 'Technical Aptitude', participants: 234, avgScore: 82 },
            { name: 'Logical Reasoning', participants: 189, avgScore: 79 },
            { name: 'Verbal Skills', participants: 156, avgScore: 85 },
            { name: 'Numerical Analysis', participants: 134, avgScore: 76 }
          ]
        }
        
        setStats(mockStats)
      } catch (error) {
        console.error('Failed to fetch dashboard data:', error)
      } finally {
        setLoading(false)
      }
    }

    fetchDashboardData()
  }, [timeRange])

  if (loading) {
    return (
      <div className="p-6">
        <div className="flex justify-center items-center min-h-[400px]">
          <div className="text-center">
            <div className="w-16 h-16 mx-auto mb-4">
              <div className="spinner"></div>
            </div>
            <h2 className="text-xl font-semibold text-dark-700">Loading dashboard...</h2>
            <p className="text-dark-500">Fetching platform statistics</p>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-8">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex flex-col sm:flex-row justify-between items-start sm:items-center"
      >
        <div>
          <h1 className="text-3xl font-bold text-dark-900 mb-2">Admin Dashboard</h1>
          <p className="text-dark-600">Overview of platform performance and statistics</p>
        </div>
        
        <div className="flex items-center space-x-2 mt-4 sm:mt-0">
          <select
            value={timeRange}
            onChange={(e) => setTimeRange(e.target.value)}
            className="input-field py-2 px-3 text-sm"
          >
            <option value="7d">Last 7 days</option>
            <option value="30d">Last 30 days</option>
            <option value="90d">Last 90 days</option>
          </select>
        </div>
      </motion.div>

      {/* Overview Stats */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-6"
      >
        <div className="card p-6 text-center">
          <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center mx-auto mb-4">
            <Users className="w-6 h-6 text-blue-600" />
          </div>
          <h3 className="text-2xl font-bold text-dark-900">{stats.overview?.totalUsers?.toLocaleString()}</h3>
          <p className="text-dark-600 text-sm">Total Users</p>
          <div className="flex items-center justify-center mt-2 text-green-600 text-sm">
            <TrendingUp className="w-4 h-4 mr-1" />
            +12.5%
          </div>
        </div>

        <div className="card p-6 text-center">
          <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center mx-auto mb-4">
            <Calendar className="w-6 h-6 text-green-600" />
          </div>
          <h3 className="text-2xl font-bold text-dark-900">{stats.overview?.totalEvents}</h3>
          <p className="text-dark-600 text-sm">Total Events</p>
          <div className="flex items-center justify-center mt-2 text-green-600 text-sm">
            <TrendingUp className="w-4 h-4 mr-1" />
            +8.2%
          </div>
        </div>

        <div className="card p-6 text-center">
          <div className="w-12 h-12 bg-purple-100 rounded-xl flex items-center justify-center mx-auto mb-4">
            <Activity className="w-6 h-6 text-purple-600" />
          </div>
          <h3 className="text-2xl font-bold text-dark-900">{stats.overview?.totalRegistrations?.toLocaleString()}</h3>
          <p className="text-dark-600 text-sm">Registrations</p>
          <div className="flex items-center justify-center mt-2 text-green-600 text-sm">
            <TrendingUp className="w-4 h-4 mr-1" />
            +15.7%
          </div>
        </div>

        <div className="card p-6 text-center">
          <div className="w-12 h-12 bg-yellow-100 rounded-xl flex items-center justify-center mx-auto mb-4">
            <Award className="w-6 h-6 text-yellow-600" />
          </div>
          <h3 className="text-2xl font-bold text-dark-900">{stats.overview?.totalCertificates?.toLocaleString()}</h3>
          <p className="text-dark-600 text-sm">Certificates</p>
          <div className="flex items-center justify-center mt-2 text-green-600 text-sm">
            <TrendingUp className="w-4 h-4 mr-1" />
            +22.1%
          </div>
        </div>

        <div className="card p-6 text-center">
          <div className="w-12 h-12 bg-indigo-100 rounded-xl flex items-center justify-center mx-auto mb-4">
            <CheckCircle className="w-6 h-6 text-indigo-600" />
          </div>
          <h3 className="text-2xl font-bold text-dark-900">{stats.overview?.activeUsers}</h3>
          <p className="text-dark-600 text-sm">Active Users</p>
          <div className="flex items-center justify-center mt-2 text-green-600 text-sm">
            <TrendingUp className="w-4 h-4 mr-1" />
            +5.3%
          </div>
        </div>

        <div className="card p-6 text-center">
          <div className="w-12 h-12 bg-red-100 rounded-xl flex items-center justify-center mx-auto mb-4">
            <Clock className="w-6 h-6 text-red-600" />
          </div>
          <h3 className="text-2xl font-bold text-dark-900">{stats.overview?.pendingApprovals}</h3>
          <p className="text-dark-600 text-sm">Pending</p>
          <div className="flex items-center justify-center mt-2 text-red-600 text-sm">
            <TrendingDown className="w-4 h-4 mr-1" />
            -2.1%
          </div>
        </div>
      </motion.div>

      {/* Performance Metrics */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="grid grid-cols-1 lg:grid-cols-2 gap-8"
      >
        {/* Performance Overview */}
        <div className="card p-6">
          <h3 className="text-lg font-semibold text-dark-900 mb-6">Performance Overview</h3>
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                  <BarChart3 className="w-5 h-5 text-blue-600" />
                </div>
                <div>
                  <p className="font-medium text-dark-900">Average Score</p>
                  <p className="text-sm text-dark-500">Across all tests</p>
                </div>
              </div>
              <div className="text-right">
                <p className="text-2xl font-bold text-dark-900">{stats.performance?.averageScore}%</p>
                <p className="text-sm text-green-600">+2.3% vs last period</p>
              </div>
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
                  <CheckCircle className="w-5 h-5 text-green-600" />
                </div>
                <div>
                  <p className="font-medium text-dark-900">Completion Rate</p>
                  <p className="text-sm text-dark-500">Test completion</p>
                </div>
              </div>
              <div className="text-right">
                <p className="text-2xl font-bold text-dark-900">{stats.performance?.completionRate}%</p>
                <p className="text-sm text-green-600">+1.8% vs last period</p>
              </div>
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-yellow-100 rounded-lg flex items-center justify-center">
                  <Star className="w-5 h-5 text-yellow-600" />
                </div>
                <div>
                  <p className="font-medium text-dark-900">Satisfaction Rate</p>
                  <p className="text-sm text-dark-500">User feedback</p>
                </div>
              </div>
              <div className="text-right">
                <p className="text-2xl font-bold text-dark-900">{stats.performance?.satisfactionRate}/5</p>
                <p className="text-sm text-green-600">+0.2 vs last period</p>
              </div>
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center">
                  <TrendingUp className="w-5 h-5 text-purple-600" />
                </div>
                <div>
                  <p className="font-medium text-dark-900">Growth Rate</p>
                  <p className="text-sm text-dark-500">Monthly growth</p>
                </div>
              </div>
              <div className="text-right">
                <p className="text-2xl font-bold text-dark-900">{stats.performance?.growthRate}%</p>
                <p className="text-sm text-green-600">+3.2% vs last period</p>
              </div>
            </div>
          </div>
        </div>

        {/* Top Performing Events */}
        <div className="card p-6">
          <h3 className="text-lg font-semibold text-dark-900 mb-6">Top Performing Events</h3>
          <div className="space-y-4">
            {stats.topEvents?.map((event, index) => (
              <div key={index} className="flex items-center justify-between p-3 bg-dark-50 rounded-lg">
                <div className="flex items-center space-x-3">
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center text-white font-bold text-sm ${
                    index === 0 ? 'bg-yellow-500' : 
                    index === 1 ? 'bg-gray-400' : 
                    index === 2 ? 'bg-orange-500' : 'bg-blue-500'
                  }`}>
                    {index + 1}
                  </div>
                  <div>
                    <p className="font-medium text-dark-900">{event.name}</p>
                    <p className="text-sm text-dark-500">{event.participants} participants</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="font-semibold text-dark-900">{event.avgScore}%</p>
                  <p className="text-sm text-dark-500">avg score</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </motion.div>

      {/* Recent Activity */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="card p-6"
      >
        <h3 className="text-lg font-semibold text-dark-900 mb-6">Recent Activity</h3>
        <div className="space-y-4">
          {stats.recentActivity?.map((activity, index) => (
            <div key={activity.id} className="flex items-center space-x-4 p-4 bg-dark-50 rounded-lg">
              <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                activity.type === 'registration' ? 'bg-blue-100' :
                activity.type === 'certificate' ? 'bg-green-100' :
                'bg-purple-100'
              }`}>
                {activity.type === 'registration' ? (
                  <Users className="w-5 h-5 text-blue-600" />
                ) : activity.type === 'certificate' ? (
                  <Award className="w-5 h-5 text-green-600" />
                ) : (
                  <Calendar className="w-5 h-5 text-purple-600" />
                )}
              </div>
              
              <div className="flex-1">
                <p className="font-medium text-dark-900">
                  {activity.type === 'registration' && `${activity.user} registered for ${activity.event}`}
                  {activity.type === 'certificate' && `${activity.user} earned certificate for ${activity.event}`}
                  {activity.type === 'event' && `New event "${activity.title}" created`}
                </p>
                <p className="text-sm text-dark-500">
                  {activity.time.toLocaleString()}
                </p>
              </div>
              
              <div className={`px-3 py-1 rounded-full text-xs font-medium ${
                activity.status === 'completed' || activity.status === 'issued' ? 'bg-green-100 text-green-600' :
                activity.status === 'created' ? 'bg-blue-100 text-blue-600' :
                'bg-yellow-100 text-yellow-600'
              }`}>
                {activity.status}
              </div>
            </div>
          ))}
        </div>
      </motion.div>

      {/* Quick Actions */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
      >
        <button className="card p-6 text-center hover:shadow-glow transition-all duration-300 group">
          <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center mx-auto mb-4 group-hover:bg-blue-200 transition-colors">
            <Calendar className="w-6 h-6 text-blue-600" />
          </div>
          <h3 className="font-semibold text-dark-900 mb-2">Create Event</h3>
          <p className="text-sm text-dark-500">Add new aptitude test</p>
        </button>

        <button className="card p-6 text-center hover:shadow-glow transition-all duration-300 group">
          <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center mx-auto mb-4 group-hover:bg-green-200 transition-colors">
            <BarChart3 className="w-6 h-6 text-green-600" />
          </div>
          <h3 className="font-semibold text-dark-900 mb-2">Add Scores</h3>
          <p className="text-sm text-dark-500">Input test results</p>
        </button>

        <button className="card p-6 text-center hover:shadow-glow transition-all duration-300 group">
          <div className="w-12 h-12 bg-purple-100 rounded-xl flex items-center justify-center mx-auto mb-4 group-hover:bg-purple-200 transition-colors">
            <Award className="w-6 h-6 text-purple-600" />
          </div>
          <h3 className="font-semibold text-dark-900 mb-2">Upload Certificates</h3>
          <p className="text-sm text-dark-500">Generate certificates</p>
        </button>

        <button className="card p-6 text-center hover:shadow-glow transition-all duration-300 group">
          <div className="w-12 h-12 bg-orange-100 rounded-xl flex items-center justify-center mx-auto mb-4 group-hover:bg-orange-200 transition-colors">
            <Users className="w-6 h-6 text-orange-600" />
          </div>
          <h3 className="font-semibold text-dark-900 mb-2">View Participants</h3>
          <p className="text-sm text-dark-500">Manage registrations</p>
        </button>
      </motion.div>
    </div>
  )
}

export default Dashboard
