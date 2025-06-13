
const NoDataAvailable = ({message, emoji}) => {
  return (
    <div className=" flex flex-col items-center space-y-5 justify-center mt-23 h-full bg-bg-light dark:bg-gray-800 dark:text-bg-light text-gray-500">
      <span className=" text-9xl text-center animate-pulse duration-300    ">{emoji ? emoji : ""}</span>

      <h2 className="text-lg font-semibold">{message ? message : "No Data Available"} </h2>
      <p className="text-sm mt-1">There’s nothing to display here yet.</p>
    </div>
  );
};

export default NoDataAvailable;
