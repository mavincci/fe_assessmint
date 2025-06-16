const Button = ({ icon, label, bg, text, onClick }) => {
  return (
    <button
      onClick={onClick}
      className={`text-${text} ${bg} p-2 px-3 rounded-md flex gap-2 mx-auto h-10 md:w-fit w-58  md:justify-start justify-center   items-center  border border-gray-400`}
    >
      {icon} {label}
    </button>
  );
};

export default Button;
