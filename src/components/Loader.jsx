import { motion } from 'framer-motion'

const Loader = ({ size = 'md', text = 'Loading...', variant = 'spinner' }) => {
  const sizeClasses = {
    sm: 'w-6 h-6',
    md: 'w-12 h-12',
    lg: 'w-16 h-16',
    xl: 'w-24 h-24'
  }

  const renderSpinner = () => (
    <motion.div
      className={`${sizeClasses[size]} border-4 border-primary-200 border-t-primary-600 rounded-full`}
      animate={{ rotate: 360 }}
      transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
    />
  )

  const renderDots = () => (
    <div className="flex space-x-2">
      {[0, 1, 2].map((i) => (
        <motion.div
          key={i}
          className="w-3 h-3 bg-primary-500 rounded-full"
          animate={{
            scale: [1, 1.5, 1],
            opacity: [0.5, 1, 0.5]
          }}
          transition={{
            duration: 1.5,
            repeat: Infinity,
            delay: i * 0.2
          }}
        />
      ))}
    </div>
  )

  const renderPulse = () => (
    <motion.div
      className={`${sizeClasses[size]} bg-primary-500 rounded-full`}
      animate={{
        scale: [1, 1.2, 1],
        opacity: [1, 0.7, 1]
      }}
      transition={{
        duration: 2,
        repeat: Infinity,
        ease: "easeInOut"
      }}
    />
  )

  const renderShimmer = () => (
    <div className={`${sizeClasses[size]} relative overflow-hidden bg-gradient-to-r from-primary-200 to-primary-300 rounded-lg`}>
      <motion.div
        className="absolute inset-0 bg-gradient-to-r from-transparent via-white to-transparent"
        animate={{
          x: ['-100%', '100%']
        }}
        transition={{
          duration: 2,
          repeat: Infinity,
          ease: "linear"
        }}
      />
    </div>
  )

  const renderLoader = () => {
    switch (variant) {
      case 'dots':
        return renderDots()
      case 'pulse':
        return renderPulse()
      case 'shimmer':
        return renderShimmer()
      default:
        return renderSpinner()
    }
  }

  return (
    <div className="flex flex-col items-center justify-center space-y-4">
      {renderLoader()}
      {text && (
        <motion.p
          className="text-dark-600 font-medium text-center"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          {text}
        </motion.p>
      )}
    </div>
  )
}

export default Loader
