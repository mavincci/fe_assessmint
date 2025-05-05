"use client"

export default function MiniAssignmentCard({
  title = "assignment",
  progress = 33,
  startDate = "12 Jan",
  endDate = "12 Jan",
}) {
  return (
    <div className="bg-white rounded-b-2xl shadow-sm p-4 md:max-w-96 w-full  max-h-fit">
      {/* Header */}
      <div className="mb-4 text-xl font-semibold">
        <h3 className="text-gray-500 text-sm font-medium">{title}</h3>
      </div>

      {/* Progress bar and button */}
      <div className="flex flex-col space-y-4  mb-6 ">
        <div className="flex flex-col gap-1 flex-1 mr-4 w">
          <div className="w-full bg-[#EAEAEA] rounded-full h-2">
            <div className="bg-red-300 h-2 rounded-full" style={{ width: `${progress}%` }}></div>
          </div>
        </div>
              <div className="flex flex-row justify-between items-center">
              <span className="text-xs text-gray-500">{progress}% Complete</span>

<button className="btn btn-sm rounded-full bg-blue-500 hover:bg-blue-600 border-none text-white  text-md px-4">
  Resume
</button>
        </div>
      </div>
  <hr className="border border-[#EAEAEA]"/>
      {/* Dates */}
      <div className="flex justify-between text-xs text-[#4A4A4A]">
        <div className="flex items-center text-[17px]">
          <span className=" font-bold  ">Start Date:</span>
          <span className="font-medium text-gray-700 ">{startDate}</span>
        </div>
        <div className="flex items-center text-[17px]">
          <span className="font-bold">End Date: </span>
          <span className="font-medium text-gray-700">{endDate}</span>
        </div>
      </div>
    </div>
  )
}
