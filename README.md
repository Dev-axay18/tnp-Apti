# AptitudePro Frontend

A stunning, professional frontend for an Aptitude Test platform with jaw-dropping animations and modern aesthetic design.

## ✨ Features

- **Beautiful UI/UX**: Modern, professional design with glassmorphism effects
- **Smooth Animations**: Framer Motion powered animations and transitions
- **Responsive Design**: Mobile-first approach with Tailwind CSS
- **Authentication System**: Separate flows for students and admins
- **Google OAuth**: Social login for students (mock implementation)
- **Role-Based Access**: Protected routes for different user types
- **Aptitude Test Management**: Browse, register, and manage tests
- **Certificate System**: Track achievements and download certificates
- **Admin Dashboard**: Comprehensive admin panel for test management

## 🚀 Tech Stack

- **React 18** - Modern React with hooks
- **Vite** - Fast build tool and dev server
- **Tailwind CSS** - Utility-first CSS framework
- **Framer Motion** - Production-ready motion library
- **React Router** - Client-side routing
- **Lucide React** - Beautiful icon library
- **Headless UI** - Accessible UI components

## 🎨 Design Features

- **Color Scheme**: Professional blue, purple, and yellow palette
- **Typography**: Inter and Poins fonts for readability
- **Animations**: Smooth transitions, hover effects, and micro-interactions
- **Glass Effects**: Modern backdrop blur and transparency
- **Gradients**: Beautiful gradient backgrounds and buttons
- **Shadows**: Subtle shadows and glow effects

## 📱 Pages & Components

### Authentication
- **Login**: Separate flows for students (OAuth + email) and admins (credentials only)
- **Register**: Student registration with Google OAuth option

### Student Pages
- **Events List**: Browse available aptitude tests with search and filters
- **Event Details**: View test information and register
- **My Events**: Track registered tests and scores
- **Certificates**: View earned certificates

### Admin Pages
- **Dashboard**: Overview of platform statistics
- **Manage Events**: Create and edit aptitude tests
- **Participants**: View test participants
- **Add Scores**: Input student test results
- **Upload Certificates**: Generate and upload certificates

### Components
- **Navbar**: Responsive navigation with user menu
- **Footer**: Comprehensive footer with links
- **EventCard**: Beautiful test display cards
- **Loader**: Multiple loading animation variants
- **ProtectedRoute**: Authentication guards
- **RoleBasedRoute**: Role-based access control

## 🛠️ Installation

1. **Clone the repository**
   ```bash
   https://github.com/Dev-axay18/tnp-Apti.git
   cd tp-frontend
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start development server**
   ```bash
   npm run dev
   ```

4. **Open in browser**
   Navigate to `http://localhost:3000`

## 🔧 Configuration

### Environment Variables
Create a `.env` file in the root directory:
```env
VITE_API_URL=http://localhost:5000/api
```

### Tailwind Configuration
The project includes custom Tailwind configuration with:
- Custom color palette
- Custom animations and keyframes
- Extended spacing and typography
- Custom component classes

## 📁 Project Structure

```
src/
├── components/          # Reusable UI components
├── context/            # React context providers
├── hooks/              # Custom React hooks
├── layouts/            # Page layout components
├── pages/              # Main page components
├── services/           # API service functions
├── styles/             # Global styles and Tailwind
├── utils/              # Utility functions
├── App.jsx             # Main app component
└── main.jsx            # App entry point
```

## 🎯 Key Features Explained

### Authentication Flow
- **Students**: Can register/login with Google OAuth or email/password
- **Admins**: Only email/password authentication
- **Protected Routes**: Students can't access admin areas
- **Role-Based Access**: Different navigation and permissions

### Aptitude Test System
- **Test Categories**: Technical, Logical, Verbal, Numerical, General
- **Difficulty Levels**: Easy, Medium, Hard
- **Registration**: Students can register for available tests
- **Scoring**: Admins can input test scores
- **Certificates**: Automatic certificate generation for passed tests

### Admin Dashboard
- **Event Management**: Create, edit, and delete aptitude tests
- **Participant Tracking**: Monitor test registrations
- **Score Management**: Input and manage student results
- **Certificate Generation**: Upload and manage certificates

## 🚀 Building for Production

```bash
npm run build
```

The build output will be in the `dist/` directory.

## 🔮 Future Enhancements

- **Real Google OAuth**: Replace mock implementation
- **Backend Integration**: Connect to actual API endpoints
- **Real-time Updates**: WebSocket integration for live updates
- **Advanced Analytics**: Detailed test performance metrics
- **Mobile App**: React Native version
- **Internationalization**: Multi-language support

## 🎨 Customization

### Colors
Modify `tailwind.config.js` to change the color scheme:
```javascript
colors: {
  primary: { /* Your primary colors */ },
  secondary: { /* Your secondary colors */ },
  accent: { /* Your accent colors */ }
}
```

### Animations
Add custom animations in `tailwind.config.js`:
```javascript
animation: {
  'custom': 'custom 2s ease-in-out infinite'
}
```

## 📱 Responsive Design

The platform is fully responsive with:
- Mobile-first approach
- Tablet and desktop optimizations
- Touch-friendly interactions
- Adaptive layouts for all screen sizes

## 🔒 Security Features

- **Protected Routes**: Authentication required for sensitive pages
- **Role-Based Access**: Different permissions for different user types
- **Input Validation**: Form validation and sanitization
- **Secure Authentication**: JWT token-based auth system

## 🧪 Testing

```bash
# Run tests (when implemented)
npm test

# Run tests in watch mode
npm test:watch
```

## 📊 Performance

- **Code Splitting**: Automatic route-based code splitting
- **Lazy Loading**: Components loaded on demand
- **Optimized Images**: Responsive image handling
- **Minified Builds**: Production-optimized builds

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## 📄 License

This project is licensed under the MIT License.

## 🆘 Support

For support and questions:
- Create an issue in the repository
- Contact the development team
- Check the documentation

---

**Built with ❤️ using modern web technologies**
