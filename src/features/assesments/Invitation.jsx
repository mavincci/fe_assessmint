"use client"

import { useEffect, useState } from "react"
import { Edit, X, Upload } from "lucide-react"
import { useParams } from "react-router-dom"
import { connect, useDispatch } from "react-redux"
import { create_send_invitation, load_invited_candidates_by_assessment_ID } from "../../action/Auth"

import { useForm } from "react-hook-form"
import { yupResolver } from "@hookform/resolvers/yup"
import * as yup from "yup"

const schema = yup
  .object({
    inviteEmail: yup
      .string()
      .required("Email(s) are required")
      .test("is-emails", "Please enter valid email addresses separated by commas", (value) => {
        if (!value) return true // Allow empty if not required, but it is required here
        const emails = value
          .split(",")
          .map((email) => email.trim())
          .filter((email) => email)
        if (emails.length === 0) return false // Must contain at least one non-empty email after splitting
        // Basic regex check for each email format
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
        return emails.every((email) => emailRegex.test(email))
      }),
  })
  .required()

const EmailList = ({ emails }) => {
  return (
    <>
      {emails.length > 0 ? (
        <div className="bg-white rounded-lg shadow-lg p-6 w-full h-[90%] overflow-y-auto scrollbar-hide dark:bg-gray-700 dark:text-bg-light relative ">
          <span className=" rounded-bl-2xl text-center text-white font-semibold items-center  border border-b border-l border-accent-teal-light bg-accent-teal-light min-w-10  flex  w-fit absolute right-0 h-9 top-0 p-2">
            {emails?.length}
          </span>
          <div className=" gap-2 flex flex-wrap">
            {emails.map((email, index) => (
              <span
                key={index}
                className="p-1 border-b-2 border-accent-teal-light bg-gray-100 dark:bg-gray-600 rounded-full dark:text-accent-teal-spanght text-sm   hover:bg-gray-300 shadow-cl transition-colors duration-200 text-gray-700"
              >
                {email}
              </span>
            ))}
          </div>
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center h-full text-center">
          <div className="animate-bounce mb-4">
            <svg
              className="w-12 h-12 text-gray-400"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v16m8-8H4"></path>
            </svg>
          </div>
          <p className="text-lg text-gray-500">No Candidates are invited</p>
        </div>
      )}
    </>
  )
}

const InvitePeople = ({ create_send_invitation }) => {
  const { assessmentId, name } = useParams()
  const Name = decodeURIComponent(name)
  const dispatch = useDispatch()
  const [CandidateEmails, setCandidateEmails] = useState([])
  const [invites, setInvites] = useState([])
  const [inviteEmail, setInviteEmail] = useState("") // Declare setInviteEmail variable
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    resolver: yupResolver(schema),
  })

  const onSubmit = (data) => {
    if (data.inviteEmail) {
      const emails = data.inviteEmail
        .split(",")
        .map((email) => email.trim())
        .filter((email) => email)
      setInvites([...invites, ...emails])
      reset()
    }
  }

  const handleEdit = (index) => {
    const emailToEdit = invites[index]
    setInviteEmail(emailToEdit)
    setInvites(invites.filter((_, i) => i !== index))
  }

  const handleDelete = (index) => {
    setInvites(invites.filter((_, i) => i !== index))
  }

  // New CSV/JSON import functionality
  const handleFileImport = (event) => {
    const file = event.target.files?.[0]
    if (!file) return

    const reader = new FileReader()
    reader.onload = (e) => {
      const text = e.target?.result
      const emails = []

      try {
        if (file.name.endsWith(".csv")) {
          // Handle CSV import
          const lines = text.split("\n").filter((line) => line.trim())
          lines.forEach((line) => {
            const values = line.split(",").map((val) => val.trim().replace(/"/g, ""))
            values.forEach((value) => {
              const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
              if (emailRegex.test(value)) {
                emails.push(value)
              }
            })
          })
        } else if (file.name.endsWith(".json")) {
          // Handle JSON import
          const jsonData = JSON.parse(text)

          // Handle different JSON structures
          if (Array.isArray(jsonData)) {
            // Array of emails or objects
            jsonData.forEach((item) => {
              if (typeof item === "string") {
                const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
                if (emailRegex.test(item)) {
                  emails.push(item)
                }
              } else if (typeof item === "object" && item.email) {
                const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
                if (emailRegex.test(item.email)) {
                  emails.push(item.email)
                }
              }
            })
          } else if (typeof jsonData === "object" && jsonData.emails && Array.isArray(jsonData.emails)) {
            // Object with emails array
            jsonData.emails.forEach((email) => {
              const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
              if (emailRegex.test(email)) {
                emails.push(email)
              }
            })
          }
        }

        // Filter out duplicates and add to invites
        const newEmails = emails.filter((email) => !invites.includes(email))
        if (newEmails.length > 0) {
          setInvites([...invites, ...newEmails])
          console.log(`Imported ${newEmails.length} emails from ${file.name}`)
        } else {
          console.log("No new valid emails found in the file")
        }
      } catch (error) {
        console.error("Error parsing file:", error)
        alert("Error reading file. Please check the file format.")
      }
    }

    reader.onerror = () => {
      alert("Error reading file")
    }

    reader.readAsText(file)
    // Reset the input
    event.target.value = ""
  }

  const handleSendInvitation = async () => {
    if (invites.length > 0) {
      create_send_invitation(assessmentId, invites)
      setInvites([])
      await new Promise((resolve) => setTimeout(resolve, 300))
      await fetch_candidates_by_ID()
    } else {
      console.log("No emails to send invitation to.")
    }
  }

  const fetch_candidates_by_ID = async () => {
    await new Promise((resolve) => setTimeout(resolve, 300))

    const res = await dispatch(load_invited_candidates_by_assessment_ID(assessmentId))
    if (res?.body) {
      setCandidateEmails(res.body?.emails)
    }
  }

  useEffect(() => {
    fetch_candidates_by_ID()
  }, [])

  return (
    <div className="flex flex-col md:flex-row gap-6 p-8 w-full  my-6 rounded-xl h-full bg-bg-light dark:bg-gray-800 dark:text-bg-light ">
      <div className=" md:w-1/2 space-y-4">
        <h1 className="text-2xl font-bold">Assessment Management</h1>

        <h2 className="text-xl font-semibold mb-4"> Invite Peoples</h2>
        <div className="card bg-base-100 border rounded border-gray-200 p-4">
          <div className="form-control flex flex-col">
            <label className="label">
              <span className="label-text">Selected Assessment</span>
            </label>
            <input type="text" className="font-bold text-lg text-accent-teal-light" disabled value={Name} />
          </div>
        </div>
        <div className="flex-row border rounded border-gray-200 p-4">
          <form onSubmit={handleSubmit(onSubmit)} className="flex items-center flex-col last:items-end gap-4">
            <textarea
              placeholder="Enter emails separated by commas"
              className={`outline-2 outline-btn-primary p-2 rounded-xl w-full ${errors.inviteEmail ? "border-red-500" : ""}`}
              {...register("inviteEmail")}
            />
            {errors.inviteEmail && <p className="text-red-500 text-sm self-start">{errors.inviteEmail.message}</p>}

            {/* New CSV/JSON Import Section */}
            <div className="w-full border-t pt-4 mt-4">
              <div className="flex items-center gap-4 mb-2">
                <span className="text-sm font-medium">Or import from file:</span>
              </div>
              <div className="flex items-center gap-2">
                <input
                  type="file"
                  accept=".csv,.json"
                  onChange={handleFileImport}
                  className="hidden"
                  id="file-import"
                />
                <label
                  htmlFor="file-import"
                  className="flex items-center gap-2 px-4 py-2 bg-accent-teal-light text-bg-light hover:bg-accent-teal-dark rounded-lg cursor-pointer border border-gray-300 transition-colors"
                >
                  <Upload className="w-4 h-4" />
                  <span className="text-sm ">Import CSV/JSON</span>
                </label>
                <span className="text-xs text-gray-500">Supports CSV and JSON files with email addresses</span>
              </div>
            </div>

            <div className="card bg-base-100 border rounded border-gray-200 p-4 w-full flex-row gap-3 flex-wrap max-h-44 overflow-y-scroll scrollbar-hide">
              {invites.length > 0 ? (
                invites.map((email, index) => (
              
                  <div className="">
                                        <span className="absolute right-0 bg-accent-teal-light text-bg-light p-1 rounded-bl-2xl   top-0 min-w-6">{invites.length}</span>

                         <div
                    key={index}
                    className="flex flex-row items-center py-2 border border-gray rounded-xl p-1 text-sm gap-3  w-fit relative "
                  >

                    <p className="text-sm">{email}</p>
                    <div className=" text-sm flex flex-row gap-2 rounded-l-full md:p-1">
                      <Edit
                        className="cursor-pointer text-accent-teal-light h-3 w-3"
                        onClick={() => handleEdit(index)}
                      />
                      <X className="cursor-pointer text-orange-500 h-3 w-3" onClick={() => handleDelete(index)} />
                    </div>
                  </div>
                  </div>
                ))
              ) : (
                <div className="text-center py-8">
                  <p className="text-lg">No invites added yet</p>
                </div>
              )}
            </div>

            <button type="submit" className="btn bg-btn-primary text-white">
              + Add to cart
            </button>
          </form>
        </div>

        <div className="flex justify-end gap-4">
          <button className="btn btn-outline">Cancel</button>
          <button className="btn bg-btn-primary text-white" onClick={handleSendInvitation}>
            Send Invitations
          </button>
        </div>
      </div>

      <div className="md:w-1/2 h-[70vh] overflow-y-auto scrollbar-hide">
        <h1 className="text-lg font-bold italic ">Invited Candidates List</h1>
        <EmailList emails={CandidateEmails} />
      </div>
    </div>
  )
}

const mapStateToProps = (state) => ({
  isAuthenticated: state.auth.isAuthenticated,
})

export default connect(mapStateToProps, { create_send_invitation })(InvitePeople)
