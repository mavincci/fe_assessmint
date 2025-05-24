

export default function NoInternetPage({status}) {
  return (
    <>
     <div className="m flex flex-col items-center justify-center bg-bg-light p-4">
      <div className="text-center max-w-md">
        {/* Simple emoji illustration instead of 3D graphics */}
        <div className="flex justify-center mb-8">
          <div className="relative">
            <span className="text-7xl inline-block">🌐</span>
            <span className="text-4xl absolute bottom-0 right-0">❌</span>
          </div>
        </div>

        {/* Main heading - simple and direct */}
        <h1 className="text-3xl font-bold mb-4 text-gray-800">Looks like you're not connected to the internet</h1>

        {/* Supportive message */}
        <p className="text-xl text-gray-600 mb-10">Let's get you back online!</p>

        {/* Simple suggestions */}
        <div className="text-left mb-10 bg-white p-6 rounded-lg shadow-sm">
          <p className="text-gray-700 mb-4">Try:</p>
          <ul className="space-y-3 text-gray-600">
            <li className="flex items-center gap-3">
              <span className="text-xl">🔄</span>
              <span>Checking your network cables, modem, and router</span>
            </li>
            <li className="flex items-center gap-3">
              <span className="text-xl">📱</span>
              <span>Reconnecting to Wi-Fi</span>
            </li>
          </ul>
        </div>

        {/* Refresh button */}
     

        {/* Error code */}
        <p className="text-gray-400 text-sm mt-8">ERR_INTERNET_DISCONNECTED</p>
      </div>
    </div>
    </>
  )
}
