import { useEffect, useState } from 'react'
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Filler, Legend } from 'chart.js'
import { Line } from 'react-chartjs-2'

// Register Chart.js components
ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Filler, Legend)

const AreaChartCard = ({ title = "Created Assignment", subtitle = "(+5) more in 2021" }) => {
  const [chartData, setChartData] = useState({
    labels: [],
    datasets: [],
  })
  
  const [isVisible, setIsVisible] = useState(false)
  
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(true)
    }, 600)
    
    return () => clearTimeout(timer)
  }, [])
  
  useEffect(() => {
    // Dummy data for the area chart
    const labels = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
    
    // Generate some random data with an upward trend
    const generateData = (base, variance) => {
      return labels.map((_, index) => {
        const trend = index * 10 // Upward trend
        const random = Math.floor(Math.random() * variance)
        return base + trend + random
      })
    }
    
    setChartData({
      labels,
      datasets: [
        {
          fill: true,
          label: 'This Year',
          data: generateData(200, 100),
          borderColor: 'rgba(59, 130, 246, 1)',
          backgroundColor: 'rgba(59, 130, 246, 0.3)',
          tension: 0.4,
        },
        {
          fill: true,
          label: 'Last Year',
          data: generateData(100, 80),
          borderColor: 'rgba(16, 185, 129, 1)',
          backgroundColor: 'rgba(16, 185, 129, 0.3)',
          tension: 0.4,
        },
      ],
    })
  }, [])
  
  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'top',
        labels: {
          usePointStyle: true,
          color: '#6B7280',
          font: {
            family: "'Inter', sans-serif",
            size: 12
          }
        }
      },
      tooltip: {
        backgroundColor: 'rgba(17, 24, 39, 0.9)',
        titleFont: {
          family: "'Inter', sans-serif",
          size: 13
        },
        bodyFont: {
          family: "'Inter', sans-serif",
          size: 12
        },
        padding: 12,
        cornerRadius: 8
      }
    },
    scales: {
      x: {
        grid: {
          display: false
        },
        ticks: {
          color: '#6B7280',
          font: {
            family: "'Inter', sans-serif",
            size: 10
          }
        }
      },
      y: {
        grid: {
          color: 'rgba(156, 163, 175, 0.1)'
        },
        ticks: {
          color: '#6B7280',
          font: {
            family: "'Inter', sans-serif",
            size: 10
          }
        }
      }
    },
    interaction: {
      mode: 'index',
      intersect: false,
    },
    elements: {
      point: {
        radius: 2,
        hoverRadius: 5
      }
    }
  }
  
  return (
    <div className={`bg-white  dark:bg-gray-700 dark:text-bg-light rounded-xl p-5 animate-fade-in opacity-0 ${isVisible ? 'opacity-100' : ''}`}>
      <div className="flex justify-between items-start mb-4">
        <div>
          <h3 className="text-lg font-bold text-gray-900 dark:text-white">{title}</h3>
          <div className="text-sm text-green-500">{subtitle}</div>
        </div>
      </div>
      <div className="h-72">
        <Line options={options} data={chartData} />
      </div>
    </div>
  )
}

export default AreaChartCard