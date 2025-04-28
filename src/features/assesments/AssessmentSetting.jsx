import { useState } from "react"

export default function AssessmentSettings() {
  const [settings, setSettings] = useState({
    title: "Math Assessment",
    timeLimit: 30,
    enableTimeLimit: true,
    difficulty: "medium",
    showAnswersImmediately: true,
    passingScore: 70,
    attemptsAllowed: 2,
    enableRandomization: true,
    showProgressBar: true,
    notifyInstructor: false,
  })

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target
    setSettings({
      ...settings,
      [name]: type === "checkbox" ? checked : value,
    })
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    console.log("Saved settings:", settings)
    // Here you would save the settings to your backend
    document.getElementById("save-modal").showModal()
  }

  return (
    <div className="bg-gray-50 min-h-screen p-6">
      <div className="max-w-4xl mx-auto">
        <div className="bg-white shadow-lg rounded-lg overflow-hidden">
          {/* Header */}
          <div className="bg-[#286575] text-white p-6">
            <h1 className="text-2xl font-bold">Assessment Settings</h1>
            <p className="opacity-80 mt-1">Configure your assessment parameters</p>
          </div>

          {/* Main Content */}
          <form onSubmit={handleSubmit} className="p-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Left Column */}
              <div className="space-y-6">
                {/* Assessment Title */}
                <div className="form-control">
                  <label className="label">
                    <span className="label-text font-medium">Assessment Title</span>
                  </label>
                  <input
                    type="text"
                    name="title"
                    value={settings.title}
                    onChange={handleChange}
                    className="input input-bordered w-full"
                  />
                </div>

                {/* Time Settings */}
                <div className="card bg-base-100 border border-gray-200">
                  <div className="card-body p-4">
                    <h2 className="card-title text-lg">Time Settings</h2>

                    <div className="form-control">
                      <label className="label cursor-pointer justify-start gap-4">
                        <input
                          type="checkbox"
                          name="enableTimeLimit"
                          checked={settings.enableTimeLimit}
                          onChange={handleChange}
                          className="checkbox checkbox-accent"
                        />
                        <span className="label-text">Enable time limit</span>
                      </label>
                    </div>

                    {settings.enableTimeLimit && (
                      <div className="form-control">
                        <label className="label">
                          <span className="label-text">Time limit (minutes)</span>
                        </label>
                        <input
                          type="number"
                          name="timeLimit"
                          value={settings.timeLimit}
                          onChange={handleChange}
                          min="1"
                          max="180"
                          className="input input-bordered w-full"
                        />
                      </div>
                    )}
                  </div>
                </div>

                {/* Difficulty Level */}
                <div className="card bg-base-100 border border-gray-200">
                  <div className="card-body p-4">
                    <h2 className="card-title text-lg">Difficulty Level</h2>

                    <div className="form-control">
                      <label className="label">
                        <span className="label-text">Select difficulty</span>
                      </label>
                      <select
                        name="difficulty"
                        value={settings.difficulty}
                        onChange={handleChange}
                        className="select select-bordered w-full"
                      >
                        <option value="easy">Easy</option>
                        <option value="medium">Medium</option>
                        <option value="hard">Hard</option>
                        <option value="adaptive">Adaptive</option>
                      </select>
                    </div>
                  </div>
                </div>
              </div>

              {/* Right Column */}
              <div className="space-y-6">
                {/* Feedback Settings */}
                <div className="card bg-base-100 border border-gray-200">
                  <div className="card-body p-4">
                    <h2 className="card-title text-lg">Feedback Settings</h2>

                    <div className="form-control">
                      <label className="label cursor-pointer justify-start gap-4">
                        <input
                          type="checkbox"
                          name="showAnswersImmediately"
                          checked={settings.showAnswersImmediately}
                          onChange={handleChange}
                          className="checkbox checkbox-accent"
                        />
                        <span className="label-text">Show answers immediately</span>
                      </label>
                      <p className="text-xs text-gray-500 ml-10">
                        Students will see correct answers right after submitting
                      </p>
                    </div>
                  </div>
                </div>

                {/* Scoring Settings */}
                <div className="card bg-base-100 border border-gray-200">
                  <div className="card-body p-4">
                    <h2 className="card-title text-lg">Scoring Settings</h2>

                    <div className="form-control">
                      <label className="label">
                        <span className="label-text">Passing score (%)</span>
                      </label>
                      <input
                        type="number"
                        name="passingScore"
                        value={settings.passingScore}
                        onChange={handleChange}
                        min="0"
                        max="100"
                        className="input input-bordered w-full"
                      />
                    </div>

                    <div className="form-control mt-2">
                      <label className="label">
                        <span className="label-text">Attempts allowed</span>
                      </label>
                      <select
                        name="attemptsAllowed"
                        value={settings.attemptsAllowed}
                        onChange={handleChange}
                        className="select select-bordered w-full"
                      >
                        <option value="1">1 attempt</option>
                        <option value="2">2 attempts</option>
                        <option value="3">3 attempts</option>
                        <option value="0">Unlimited</option>
                      </select>
                    </div>
                  </div>
                </div>

                {/* Additional Options */}
                <div className="card bg-base-100 border border-gray-200">
                  <div className="card-body p-4">
                    <h2 className="card-title text-lg">Additional Options</h2>

                    <div className="space-y-2">
                      <div className="form-control">
                        <label className="label cursor-pointer justify-start gap-4">
                          <input
                            type="checkbox"
                            name="enableRandomization"
                            checked={settings.enableRandomization}
                            onChange={handleChange}
                            className="checkbox checkbox-accent "
                          />
                          <span className="label-text">Randomize questions</span>
                        </label>
                      </div>

                      <div className="form-control">
                        <label className="label cursor-pointer justify-start gap-4">
                          <input
                            type="checkbox"
                            name="showProgressBar"
                            checked={settings.showProgressBar}
                            onChange={handleChange}
                            className="checkbox checkbox-accent"
                          />
                          <span className="label-text">Show progress bar</span>
                        </label>
                      </div>

                      <div className="form-control">
                        <label className="label cursor-pointer justify-start gap-4">
                          <input
                            type="checkbox"
                            name="notifyInstructor"
                            checked={settings.notifyInstructor}
                            onChange={handleChange}
                            className="checkbox checkbox-accent"
                          />
                          <span className="label-text">Notify instructor on completion</span>
                        </label>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex justify-end gap-4 mt-8">
              <button type="button" className="btn btn-outline">
                Cancel
              </button>
              <button type="submit" className="btn bg-[#286575] text-white hover:bg-[#1d4e5a]">
                Save Settings
              </button>
            </div>
          </form>
        </div>
      </div>

      {/* Success Modal */}
      <dialog id="save-modal" className="modal">
        <div className="modal-box">
          <h3 className="font-bold text-lg">Settings Saved!</h3>
          <p className="py-4">Your assessment settings have been successfully updated.</p>
          <div className="modal-action">
            <form method="dialog">
              <button className="btn">Close</button>
            </form>
          </div>
        </div>
      </dialog>
    </div>
  )
}
