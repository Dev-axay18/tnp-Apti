import { Routes, Route } from 'react-router-dom'
import { AuthProvider } from './context/AuthContext'
import ProtectedRoute from './components/ProtectedRoute'
import RoleBasedRoute from './components/RoleBasedRoute'
import MainLayout from './layouts/MainLayout'
import AdminLayout from './layouts/AdminLayout'

// Auth Pages
import Login from './pages/auth/Login'
import Register from './pages/auth/Register'

// Student Pages
import EventsList from './pages/events/EventsList'
import EventDetails from './pages/events/EventDetails'
import MyEvents from './pages/events/MyEvents'
import MyCertificates from './pages/certificates/MyCertificates'

// Admin Pages
import Dashboard from './pages/admin/Dashboard'
import ManageEvents from './pages/admin/ManageEvents'
import EventParticipants from './pages/admin/EventParticipants'
import AddScore from './pages/admin/AddScore'
import UploadCertificate from './pages/admin/UploadCertificate'

// Other Pages
import NotFound from './pages/NotFound'

function App() {
  return (
    <AuthProvider>
      <div className="min-h-screen bg-gradient-to-br from-dark-50 via-white to-primary-50">
        <Routes>
          {/* Public Routes */}
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          
          {/* Protected Student Routes */}
          <Route path="/" element={
            <ProtectedRoute>
              <MainLayout />
            </ProtectedRoute>
          }>
            <Route index element={<EventsList />} />
            <Route path="events" element={<EventsList />} />
            <Route path="events/:id" element={<EventDetails />} />
            <Route path="my-events" element={<MyEvents />} />
            <Route path="certificates" element={<MyCertificates />} />
          </Route>
          
          {/* Protected Admin Routes */}
          <Route path="/admin" element={
            <RoleBasedRoute allowedRoles={['admin']}>
              <AdminLayout />
            </RoleBasedRoute>
          }>
            <Route index element={<Dashboard />} />
            <Route path="events" element={<ManageEvents />} />
            <Route path="events/:id/participants" element={<EventParticipants />} />
            <Route path="events/:id/score" element={<AddScore />} />
            <Route path="certificates" element={<UploadCertificate />} />
          </Route>
          
          {/* 404 Route */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </div>
    </AuthProvider>
  )
}

export default App
