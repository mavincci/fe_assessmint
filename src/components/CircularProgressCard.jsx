import { useEffect, useState } from "react";

const CircularProgressCard = ({
  percentage = 90,
  title = "Assignments Created",
  color = "#10B981",
}) => {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const timer = setTimeout(() => {
      setProgress(percentage);
    }, 500);

    return () => clearTimeout(timer);
  }, [percentage]);

  // Calculate the SVG parameters
  const radius = 70;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (progress / 100) * circumference;

  return (
    <div className="bg-gradient-to-br from-[#3B565D]  to-[#0A0E237D] rounded-xl p-4 flex flex-col items-center justify-center h-full animate-fade-in">
      <div className="relative flex items-center justify-center">
        {/* Background circle */}
        <svg className="transform -rotate-45 w-48 h-48" viewBox="0 0 192 192">
          <defs>
            <linearGradient id="fadeGradient" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#05CD9900" />
              {/* <stop offset="20%" stopColor="#14b8a6" /> */}
              <stop offset="100%" stopColor="#05CD99" /> {/* teal-500 */}
            </linearGradient>
          </defs>

          {/* Background circle */}
          <circle
            cx="96"
            cy="96"
            r={radius}
            stroke="rgba(255, 255, 255, 0.1)"
            strokeWidth="15"
            fill="transparent"
          />

          {/* Progress circle with gradient stroke and fade-in */}
          <circle
            cx="96"
            cy="96"
            r={radius}
            stroke="url(#fadeGradient)"
            strokeWidth="15"
            strokeDasharray={circumference}
            strokeDashoffset={strokeDashoffset}
            strokeLinecap="round"
            fill="transparent"
            className={`transition-opacity duration-1000 `}
          />
        </svg>

        <div className="absolute text-center">
          <div className="text-4xl font-bold text-white">{progress}%</div>
          <div className="text-base text-gray-300">{title}</div>
        </div>
      </div>
    </div>
  );
};

export default CircularProgressCard;
