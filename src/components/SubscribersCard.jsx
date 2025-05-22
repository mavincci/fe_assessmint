import { BanknoteArrowDown, Currency } from "lucide-react";
import { Mail } from "./Icons";

import { useState, useEffect } from "react";

const SubscribersCard = ({
  count = "8.62K",
  title = "Subscribers",
    type = "",
    from, 
    to,
}) => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(true);
    }, 800);

    return () => clearTimeout(timer);
  }, []);
  const IconComponent = type === "money" ? BanknoteArrowDown : Mail;

  return (
    <div
      className={`bg-gradient-to-tl ${from} ${to}  rounded-xl p-8 flex flex-col items-center justify-center h-full text-center animate-fade-in opacity-100`}
    >
      <div className="w-16 h-16 bg-gray-600 rounded-full flex items-center justify-center mb-4">
        <IconComponent className="w-8 h-8 text-white" />
      </div>

      <div className="text-4xl font-bold text-white mb-2">{count}</div>
      <div className="text-lg text-gray-300 mb-6">{title}</div>

      <button className="btn px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-md transition-colors duration-200">
        Manage List
      </button>
    </div>
  );
};

export default SubscribersCard;
