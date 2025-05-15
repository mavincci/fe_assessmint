
import { Search, Bell, Clock, ChevronRight, Calendar, ListTodo, Calendar1 } from "lucide-react"

export default function DefaultDashboard() {


  return (
     <div className="p-6 bg-blue-50 min-h-[100vh] w-full items-center ">
      <div className="flex flex-col md:flex-row justify-evenly items-center  align-middle gap-4 mb-8">
        <div className="bg-white shadow-md rounded-xl p-9 flex items-center justify-center roundxl flex-row gap-4 w-[400px] ">
    <svg width="44" height="36" viewBox="0 0 44 36" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M2 34C2 34 4.87074 -4.48536 12.0571 13.3418C19.2435 31.1689 22.1143 30.3501 24.8571 16.5823C28.2477 -0.436459 40.7465 14.2172 42 2" stroke="black" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"/>
<path d="M2 34C2 34 4.87074 -4.48536 12.0571 13.3418C19.2435 31.1689 22.1143 30.3501 24.8571 16.5823C28.2477 -0.436459 40.7465 14.2172 42 2" stroke="black" stroke-opacity="0.21" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"/>
<path d="M2 34C2 34 4.87074 -4.48536 12.0571 13.3418C19.2435 31.1689 22.1143 30.3501 24.8571 16.5823C28.2477 -0.436459 40.7465 14.2172 42 2" stroke="black" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"/>
</svg>

          <div className="div">
             <h2 className="text-xl font-semibold">Total Assignment</h2>
          <p className="text-3xl font-bold">567</p>
         </div>
        </div>
        <div className="bg-white shadow-md p-9 flex items-center justify-center rounded-xl flex-row gap-4  w-[400px]">
          <ListTodo/>
          <div className="flex flex-col">
             <h2 className="text-xl font-semibold">Pending Evaluation</h2>
          <p className="text-3xl font-bold">8</p>
         </div>
        </div>
        <div className="bg-white shadow-md p-9 flex items-center justify-center rounded-xl flex-row gap-4 w-[400px] ">
          <Calendar1/>
          <div className="flex flex-col">
            <h2 className="text-xl font-semibold">Scheduled Assignment</h2>
          <p className="text-3xl font-bold">5</p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div className="bg-white p-4 shadow-md">
          <h2 className="text-lg font-bold mb-4">Upcoming Assignments</h2>
          {[1, 2, 3].map((item) => (
            <div key={item} className="flex justify-between items-center mb-2 p-2 border rounded-lg">
              <div>
                <p className="font-semibold">Front End Interview</p>
                <p>May 5, 2025</p>
                <p>10:00AM - 12:00PM</p>
              </div>
              <div className="flex space-x-2">
                <button className="btn btn-sm">Edit</button>
                <button className="btn btn-sm btn-primary">Manage</button>
              </div>
            </div>
          ))}
        </div>

        <div className="bg-white p-4 shadow-md">
          <h2 className="text-lg font-bold mb-4">Recent Submission</h2>
          {["created assignment", "evaluation", "invitation", "update", "add question"].map((item, index) => (
            <div key={index} className="mb-2">
              <p className="font-semibold">{item}</p>
              <p className="text-gray-500">2 minutes ago</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
