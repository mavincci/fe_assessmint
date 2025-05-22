import { useState, useEffect } from 'react'

const WelcomeCard = () => {
  const [isVisible, setIsVisible] = useState(false)
  
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(true)
    }, 300)
    
    return () => clearTimeout(timer)
  }, [])

  return (
   <div className={`relative w-full h-full rounded-xl overflow-hidden p-6 bg-gradient-to-r from-btn-primary to-accent-teal-dark dark:from-teal-600 dark:to-teal-900 animate-fade-in transition-opacity duration-700 ${isVisible ? 'opacity-100' : 'opacity-0'}`}>
  {/* Text Content */}
  <div className="relative z-10">
    <h3 className="text-sm font-medium text-bg-light dark:text-teal-100 mb-1">Welcome Admin</h3>
    <h2 className="text-2xl font-bold text-bg-light dark:text-white mb-2">Admin dashboard</h2>
    <p className="text-sm text-teal-100 dark:text-teal-200 mb-6">
      Monitor your key metrics and analyze trends in your data.
    </p>

    
  </div>

  {/* Background Illustration */}
  <div className="absolute inset-0 z-0">
    <img 
      src="https://images.pexels.com/photos/927022/pexels-photo-927022.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1" 
      alt="Dashboard illustration"
      className="w-full h-full object-cover"
      style={{ opacity: 0.3, mixBlendMode: 'multiply' }}
    />
  </div>
</div>

  )
}

export default WelcomeCard