
const LandingPage = () =>{
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-cyan-50">
      {/* Navigation */}
      <div className="navbar bg-white/80 backdrop-blur-sm px-4 lg:px-8 shadow-sm">
        <div className="navbar-start">
          <div className="dropdown">
            <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16"></path>
              </svg>
            </div>
            <ul
              tabIndex={0}
              className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52"
            >
              <li>
                <a>Home</a>
              </li>
              <li>
                <a>Careers</a>
              </li>
              <li>
                <a>Blog</a>
              </li>
              <li>
                <a>About Us</a>
              </li>
              <li>
                <a>Login</a>
              </li>
            </ul>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-teal-600 rounded flex items-center justify-center">
              <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                ></path>
              </svg>
            </div>
            <span className="text-xl font-bold text-gray-800">AssisaMint</span>
          </div>
        </div>
        <div className="navbar-center hidden lg:flex">
          <ul className="menu menu-horizontal px-1 gap-2">
            <li>
              <a className="hover:text-teal-600 font-medium">Home</a>
            </li>
            <li>
              <a className="hover:text-teal-600 font-medium">Careers</a>
            </li>
            <li>
              <a className="hover:text-teal-600 font-medium">Blog</a>
            </li>
            <li>
              <a className="hover:text-teal-600 font-medium">About Us</a>
            </li>
            <li>
              <a className="hover:text-teal-600 font-medium">Login</a>
            </li>
          </ul>
        </div>
        <div className="navbar-end">
          <button className="btn bg-teal-600 hover:bg-teal-700 text-white border-none">Sign Up</button>
        </div>
      </div>

      {/* Hero Section */}
      <section className="relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 py-12 lg:py-20">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Left Content */}
            <div className="space-y-8">
              <div className="space-y-6">
                <h1 className="text-4xl lg:text-5xl xl:text-6xl font-bold leading-tight">
                  <span className="text-teal-600">AI-Powered</span> <span className="text-gray-800">Smarter</span>
                  <br />
                  <span className="text-gray-800">Exam Management</span>
                </h1>
                <p className="text-lg text-gray-600 max-w-md">
                  AssisaMint is an interesting platform that will help you in more an interactive way
                </p>
              </div>

              <div className="flex flex-col sm:flex-row gap-4">
                <button className="btn bg-teal-600 hover:bg-teal-700 text-white border-none px-8">Join for free</button>
                <button className="btn btn-ghost text-teal-600 gap-2">
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                    <path
                      fillRule="evenodd"
                      d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z"
                      clipRule="evenodd"
                    ></path>
                  </svg>
                  Watch how it works
                </button>
              </div>
            </div>

            {/* Right Content - Image with Overlays */}
            <div className="relative">
              <div className="relative z-10">
                <img
                  src="/hero-woman.png"
                  alt="Smiling woman with educational materials"
                  width={500}
                  height={600}
                  className="w-full max-w-md mx-auto"
                  priority
                />
              </div>

              {/* Floating UI Elements */}
              {/* Students Count */}
              <div className="absolute top-8 left-4 bg-white rounded-lg shadow-lg p-4 z-20">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                    <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197m13.5-9a2.5 2.5 0 11-5 0 2.5 2.5 0 015 0z"
                      ></path>
                    </svg>
                  </div>
                  <div>
                    <div className="text-xl font-bold text-gray-800">250k</div>
                    <div className="text-sm text-gray-600">Advanced Students</div>
                  </div>
                </div>
              </div>

              {/* Congratulations Notification */}
              <div className="absolute top-32 right-4 bg-white rounded-lg shadow-lg p-4 z-20 max-w-xs">
                <div className="flex items-start gap-3">
                  <div className="w-2 h-2 bg-green-500 rounded-full mt-2"></div>
                  <div>
                    <div className="font-semibold text-gray-800">Congratulations</div>
                    <div className="text-sm text-gray-600">Your admission completed</div>
                  </div>
                </div>
              </div>

              {/* User Experience Class */}
              <div className="absolute bottom-20 left-8 bg-white rounded-lg shadow-lg p-4 z-20">
                <div className="flex items-center gap-3">
                  <div className="avatar">
                    <div className="w-10 rounded-full">
                      <img src="/placeholder.svg?height=40&width=40" alt="User avatar" width={40} height={40} />
                    </div>
                  </div>
                  <div>
                    <div className="font-semibold text-gray-800">User Experience Class</div>
                    <div className="text-sm text-gray-600">Today at 12:00 PM</div>
                  </div>
                </div>
                <button className="btn btn-sm bg-pink-500 hover:bg-pink-600 text-white border-none mt-2 w-full">
                  Join Now
                </button>
              </div>

              {/* Decorative Elements */}
              <div className="absolute top-16 right-16 w-4 h-4 bg-red-500 rounded-full z-10"></div>
              <div className="absolute bottom-32 right-12 w-6 h-6 bg-yellow-400 rounded-full z-10"></div>
              <div className="absolute bottom-48 left-16 w-3 h-3 bg-green-500 rounded-full z-10"></div>
            </div>
          </div>
        </div>

        {/* Background Decorative Elements */}
        <div className="absolute top-20 left-10 w-20 h-20 bg-teal-100 rounded-full opacity-50"></div>
        <div className="absolute bottom-20 right-20 w-32 h-32 bg-blue-100 rounded-full opacity-30"></div>
        <div className="absolute top-1/2 left-1/4 w-16 h-16 bg-cyan-100 rounded-full opacity-40"></div>
      </section>

      {/* Features Preview Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-800 mb-4">Why Choose AssisaMint?</h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Experience the future of exam management with our AI-powered platform
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center p-6">
              <div className="w-16 h-16 bg-teal-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-teal-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z"
                  ></path>
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-gray-800 mb-2">Smart AI Analysis</h3>
              <p className="text-gray-600">
                Advanced AI algorithms analyze student performance and provide personalized insights
              </p>
            </div>

            <div className="text-center p-6">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 100 4m0-4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 100 4m0-4v2m0-6V4"
                  ></path>
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-gray-800 mb-2">Interactive Learning</h3>
              <p className="text-gray-600">Engage students with interactive exam formats and real-time feedback</p>
            </div>

            <div className="text-center p-6">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
                  ></path>
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-gray-800 mb-2">Detailed Analytics</h3>
              <p className="text-gray-600">
                Comprehensive reports and analytics to track progress and identify areas for improvement
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
export default LandingPage