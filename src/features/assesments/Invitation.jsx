import { useEffect, useState } from "react";
import { Edit, Trash, Trash2, X } from "lucide-react";
import { useParams } from "react-router-dom";
import { connect, useDispatch } from "react-redux";
import { create_send_invitation, load_invited_candidates_by_assessment_ID } from "../../action/Auth";
// No longer need 'sync' from framer-motion here unless used elsewhere
// import { sync } from "framer-motion";

// Import react-hook-form and yup
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

// Define the validation schema for the email input
const schema = yup.object({
  inviteEmail: yup.string()
    .required("Email(s) are required")
    .test('is-emails', 'Please enter valid email addresses separated by commas', (value) => {
      if (!value) return true; // Allow empty if not required, but it is required here
      const emails = value.split(',').map(email => email.trim()).filter(email => email);
      if (emails.length === 0) return false; // Must contain at least one non-empty email after splitting
      // Basic regex check for each email format
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      return emails.every(email => emailRegex.test(email));
    }),
}).required();
const EmailList = ({ emails }) => {
  return (
    
    <>
{emails.length > 0 ?  <div className="bg-btn-primary rounded-lg shadow-lg p-6 w-full h-[90%] overflow-y-auto scrollbar-hide ">
        <ul className="space-y-2">
          {emails.map((email, index) => (
            <li
              key={index}
              className="p-3 bg-gray-50 rounded-md hover:bg-gray-100 transition-colors duration-200 text-gray-700"
            >
              {email}
            </li>
          ))}
        </ul>
    </div> : (
      <div className="flex flex-col items-center justify-center h-full text-center">
        <div className="animate-bounce mb-4">
          <svg className="w-12 h-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v16m8-8H4"></path>
          </svg>
        </div>
        <p className="text-lg text-gray-500">No Candidates are invited</p>
      </div>
    )}


    
    </>
  );
};

const InvitePeople = ({ create_send_invitation }) => {
  const { assessmentId, name } = useParams();
  const Name = decodeURIComponent(name);
  
const dispatch = useDispatch()
  const [isPublished, setIsPublished] = useState(false);
  const [accessControl, setAccessControl] = useState(false);
  const [CandidateEmails,setCandidateEmails] =useState([])

  // State to manage the list of added emails (remains the same)
  const [invites, setInvites] = useState([]);

  // Initialize react-hook-form
  const { register, handleSubmit, formState: { errors }, reset } = useForm({
    resolver: yupResolver(schema), // Use yup resolver for validation
  });

  console.log("AssessmentID for Invitaion", assessmentId ,Name)

  // This function will be called by handleSubmit when validation passes
  const onSubmit = (data) => {
    if (data.inviteEmail) {
      const emails = data.inviteEmail.split(",").map(email => email.trim()).filter(email => email); // Filter out any empty strings resulting from split
      setInvites([...invites, ...emails]);
      reset(); // Reset the form input field after adding emails
    }
  };

  // handleEdit remains the same, it manipulates the 'invites' list state
  const handleEdit = (index) => {
    const emailToEdit = invites[index];
    // Set the email in the form input field using react-hook-form's setValue (optional, but good UX)
    // setValue("inviteEmail", emailToEdit); // You would need to get setValue from useForm
    // For simplicity with existing state, we just set the input value and remove from list
     setInviteEmail(emailToEdit); // Assuming you want to put it back in the state-controlled input for editing
     setInvites(invites.filter((_, i) => i !== index));
  };
   // Note: To fully integrate react-hook-form for editing, you'd use setValue and handle form submission to update the list.
   // Sticking closer to original logic by modifying state directly after edit.

  // handleDelete remains the same, it manipulates the 'invites' list state
  const handleDelete = (index) => {
    setInvites(invites.filter((_, i) => i !== index));
  };
  console.log(invites)

  const handleSendInvitation = async () => {
    // This function is for sending the collected invites, separate from adding emails to the list
    if (invites.length > 0) {
       await new Promise((resolve) => setTimeout(resolve, 1500)); // Optional delay
       create_send_invitation(assessmentId, invites);
       console.log("Sent",);
       // Optionally clear the invites list after sending
       // setInvites([]);
    } else {
        console.log("No emails to send invitation to.");
        // Maybe show a user notification that no emails have been added
    }

  }

  useEffect(() => {
    const fetch_candidates_by_ID = async () => {
       await new Promise((resolve) => setTimeout(resolve, 1500)); // Optional delay
       
        const res = await dispatch(load_invited_candidates_by_assessment_ID(assessmentId));
        if (res?.body) {
          setCandidateEmails(res.body?.emails);
  console.log("Cand",res)
        } 
    };
    // if (assessmentId) {
   
      fetch_candidates_by_ID()
    // }
  }, [])

  return (
    <div className="flex flex-col md:flex-row gap-6 p-8 w-full  my-6 rounded-xl h-full bg-white ">
      <div className=" md:w-1/2 space-y-4">
        <h1 className="text-2xl font-bold">Assessment Management</h1>

        <h2 className="text-xl font-semibold mb-4">Create Invite Peoples</h2>

        {/* Select Assessment Card (remains unchanged as it's not part of the email form) */}
        <div className="card bg-base-100 border rounded border-gray-200 p-4">
          <div className="form-control flex flex-col">
            <label className="label">
              <span className="label-text">Selected Assessment</span>
            </label>
            {/* <select className="select select-bordered w-full">
              <option>Select the test</option>
              <option value="test1">Test 1</option>
              <option value="test2">Test 2</option>
            </select> */}
            <input type="text" className="font-bold text-lg text-accent-teal-light" disabled value={Name}/>
          </div>
        </div>

        {/* Publication Status (remains unchanged) */}
        {/* <div className="flex-row border rounded border-gray-200 p-4 flex justify-between items-center">
          <div>
            <h3 className="font-bold">Publication Status</h3>
            <p>{isPublished ? "Published and available" : "Unpublished"}</p>
          </div>
          <input type="checkbox" className="toggle toggle-accent " checked={isPublished} onChange={() => setIsPublished(!isPublished)} />
        </div> */}

        {/* Access Control (remains unchanged) */}
        {/* <div className="flex-row border rounded border-gray-200 p-4 flex justify-between items-center">
          <div>
            <h3 className="font-bold">Access Control</h3>
            <p>{accessControl ? "Restricted" : "Open"}</p>
          </div>
          <input type="checkbox" className="toggle toggle-accent " checked={accessControl} onChange={() => setAccessControl(!accessControl)} />
        </div> */}

        {/* Invite Emails Section (form handling refactored) */}
        <div className="flex-row border rounded border-gray-200 p-4">
          {/* Use a form element, onSubmit will be triggered by handleSubmit */}
          <form onSubmit={handleSubmit(onSubmit)} className="flex items-center flex-col last:items-end gap-4">
            <textarea
              placeholder="Enter emails separated by commas"
              className={`outline-2 outline-btn-primary p-2 rounded-xl w-full ${errors.inviteEmail ? 'border-red-500' : ''}`} // Add error border
              // Register the input with react-hook-form
              {...register("inviteEmail")}
            />
            {/* Display validation errors */}
            {errors.inviteEmail && <p className="text-red-500 text-sm self-start">{errors.inviteEmail.message}</p>}

            {/* Display added invites (remains largely the same, uses 'invites' state) */}
            <div className="card bg-base-100 border rounded border-gray-200 p-4 w-full flex-row gap-3 flex-wrap max-h-44 overflow-y-scroll scrollbar-hide">
              {invites.length > 0 ? invites.map((email, index) => (
                <div key={index} className="flex flex-row items-center py-2 border border-gray rounded-xl p-2 gap-3  w-fit ">
                  <p className="text-sm">{email}</p>
                  <div className=" text-sm flex flex-row gap-2 rounded-l-full md:p-1">
                    <Edit className="cursor-pointer text-accent-teal-light h-5 w-5" onClick={() => handleEdit(index)} />
                    <X className="cursor-pointer text-orange-500 h-5 w-5" onClick={() => handleDelete(index)} />
                  </div>
                </div>
              )) : (
                <div className="text-center py-8">
                  <p className="text-lg">No invites added yet</p>
                </div>
              )}
            </div>

            {/* The button now triggers form submission */}
            <button type="submit" className="btn bg-btn-primary text-white">
              + Add
            </button>
          </form> {/* End of form */}
        </div>

        {/* Action Buttons (remains unchanged, could trigger handleSendInvitation) */}
        <div className="flex justify-end gap-4">
          <button className="btn btn-outline">Cancel</button>
          {/* Example of integrating handleSendInvitation */}
          <button className="btn bg-btn-primary text-white" onClick={handleSendInvitation}>Send Invitations</button> {/* Changed text for clarity */}
        </div>

      </div>

      {/* Invite List Section (remains unchanged) */}
      <div className="md:w-1/2 h-[70vh] overflow-y-auto scrollbar-hide">
        <h1 className="text-lg font-bold italic ">Invited Candidates List</h1>
         <EmailList emails={CandidateEmails}/>
      </div>
    </div>
  );
}


const mapStateToProps = (state) => ({
  isAuthenticated: state.auth.isAuthenticated, // Keep existing Redux mapping
});

// Connect the component to Redux
export default connect(mapStateToProps, { create_send_invitation })(InvitePeople);