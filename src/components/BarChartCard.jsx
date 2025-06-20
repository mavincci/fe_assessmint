import { useEffect, useState } from "react";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Bar } from "react-chartjs-2";
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);
const BarChartCard = ({
  title = "Active Users",
  subtitle = "(+23) than last week",
  noOfusers = 0,
  users_info = [],
  repos = 0,
  assessments = 0,
}) => {
  const [chartData, setChartData] = useState({
    labels: [],
    datasets: [],
  });

  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(true);
    }, 800);

    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    const weekDays = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
    const userCountsByDay = {
      Sun: 0,
      Mon: 0,
      Tue: 0,
      Wed: 0,
      Thu: 0,
      Fri: 0,
      Sat: 0,
    };

    users_info.forEach((user) => {
      const createdDate = new Date(user.createdAt || Date.now());
      const day = weekDays[createdDate.getDay()];
      userCountsByDay[day]++;
    });

    const orderedLabels = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
    const dataCounts = orderedLabels.map((day) => userCountsByDay[day]);

    setChartData({
      labels: orderedLabels,
      datasets: [
        {
          label: "Users",
          data: dataCounts,
          backgroundColor: "rgba(59, 130, 246, 0.8)",
          borderRadius: 4,
          barThickness: 12,
        },
      ],
    });
  }, [users_info]);

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: { display: false },
      tooltip: {
        backgroundColor: "rgba(17, 24, 39, 0.9)",
        titleFont: { family: "'Inter', sans-serif", size: 13 },
        bodyFont: { family: "'Inter', sans-serif", size: 12 },
        padding: 12,
        cornerRadius: 8,
      },
    },
    scales: {
      x: {
        grid: { display: false },
        ticks: {
          color: "#6B7280",
          font: { family: "'Inter', sans-serif", size: 10 },
        },
      },
      y: {
        grid: { color: "rgba(156, 163, 175, 0.1)" },
        ticks: {
          color: "#6B7280",
          font: { family: "'Inter', sans-serif", size: 10 },
        },
      },
    },
  };

  return (
    <div
      className={`bg-gray-900 rounded-xl p-5 animate-fade-in opacity-0 ${isVisible ? "opacity-100" : ""}`}
    >
      <div className="flex justify-between items-start mb-4">
        <div>
          <h3 className="text-lg font-bold text-white">{title}</h3>
          <div className="text-sm text-green-500">{subtitle}</div>
        </div>
      </div>

      <div className="h-52">
        <Bar options={options} data={chartData} />
      </div>

      <div className="grid grid-cols-3 gap-4 mt-6">
        <div className="bg-gray-800 p-3 rounded-lg">
          <div className="flex items-center mb-1">
            <div className="w-3 h-3 rounded-full bg-blue-500 mr-2"></div>
            <span className="text-xs text-gray-400">Users</span>
          </div>
          <div className="text-xl font-bold text-white">{noOfusers}</div>
        </div>
        <div className="bg-gray-800 p-3 rounded-lg">
          <div className="flex items-center mb-1">
            <div className="w-3 h-3 rounded-full bg-blue-500 mr-2"></div>
            <span className="text-xs text-gray-400">Repository</span>
          </div>
          <div className="text-xl font-bold text-white">{repos}</div>
        </div>
        <div className="bg-gray-800 p-3 rounded-lg">
          <div className="flex items-center mb-1">
            <div className="w-3 h-3 rounded-full bg-blue-500 mr-2"></div>
            <span className="text-xs text-gray-400">Exam</span>
          </div>
          <div className="text-xl font-bold text-white">{assessments}</div>
        </div>
      </div>
    </div>
  );
};

export default BarChartCard;
