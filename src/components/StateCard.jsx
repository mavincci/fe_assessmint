import { useState, useEffect } from 'react'
import { Calendar } from './Icons'

const StateCard = ({ title, value, subtitle, Icon, color = 'primary', delay = 0, bg }) => {
  const [isVisible, setIsVisible] = useState(false)
  
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(true)
    }, delay)
    
    return () => clearTimeout(timer)
  }, [delay])

  const getColorClass = () => {
    const colors = {
      primary: 'bg-btn-primary',
      secondary: 'bg-amber-600 ',
      success: 'bg-emerald-600 ',
      warning: 'bg-yellow-500',
      error: 'bg-red-500',
      info: 'bg-blue-500',
    }
    
    return colors[color] || colors.primary
  }

  return (
    <div 
      className={`flex flex-row justify-between  items-center p-2 py-4 rounded-3xl ${bg ? bg : "bg-gradient-to-r animate-fade-in from-bg-secondary-light to-[#648F9A]" }  opacity-0 ${isVisible ? 'opacity-100' : ''}`} 
      style={{ 
        animationDelay: `${delay}ms`,
        transitionDelay: `${delay}ms`
      }}
    >
      <div className="flex flex-col text-white px-2 ">
        <div className=" text-sm font-medium dark:text-gray-400">{title}</div>
        <div className="text-2xl font-bold  dark:text-white my-1">{value}</div>
        {subtitle && <div className="text-xs  dark:text-gray-400">{subtitle}</div>}
      </div>
      <div className={`p-3 rounded-full ${getColorClass()}`}>
        {Icon ? <Icon className="w-5 h-5 text-white" /> :  Icon ? Icon: <Calendar className="w-5 h-5 text-white" />}
      </div>
    </div>
  )
}

export default StateCard