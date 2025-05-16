import { useState } from "react";
import { Edit, Trash2 } from "lucide-react";

export default function InvitePeople() {
  const [isPublished, setIsPublished] = useState(false);
  const [accessControl, setAccessControl] = useState(false);
  const [inviteEmail, setInviteEmail] = useState("");
  const [invites, setInvites] = useState([]);

  const handleInvite = () => {
    if (inviteEmail) {
      const emails = inviteEmail.split(",").map(email => email.trim());
      setInvites([...invites, ...emails]);
      setInviteEmail("");
    }
  };

  const handleEdit = (index) => {
    const emailToEdit = invites[index];
    setInviteEmail(emailToEdit);
    setInvites(invites.filter((_, i) => i !== index));
  };

  const handleDelete = (index) => {
    setInvites(invites.filter((_, i) => i !== index));
  };
console.log(invites)
  return (
    <div className="flex flex-col md:flex-row gap-6 p-8 w-full h-full bg-white">
      <div className="md:w-1/2 space-y-4">
        <h2 className="text-2xl font-bold mb-4">Create Invite Peoples</h2>

        <div className="card bg-base-100 shadow-xl p-4">
          <div className="form-control flex">
            <label className="label">
              <span className="label-text">Selected Assessment</span>
            </label>
            <p>Name</p>
          </div>
        </div>

        <div className="flex-row  shadow-xl p-4 flex justify-between items-center">
          <div>
            <h3 className="font-bold">Publication Status</h3>
            <p>{isPublished ? "Published and available" : "Unpublished"}</p>
          </div>
          <input type="checkbox" className="toggle toggle-accent " checked={isPublished} onChange={() => setIsPublished(!isPublished)} />
        </div>

        <div className="flex-row shadow-xl p-4 flex justify-between items-center">
          <div>
            <h3 className="font-bold">Access Control</h3>
            <p>{accessControl ? "Restricted" : "Open"}</p>
          </div>
          <input type="checkbox" className="toggle toggle-accent " checked={accessControl} onChange={() => setAccessControl(!accessControl)} />
        </div>

        <div className="flex-row shadow-xl p-4">
          <div className="flex items-center flex-col last:items-end gap-4">
            <textarea
              placeholder="Enter emails separated by commas"
                          className="outline-2 outline-btn-primary p-2 rounded-xl   w-full"
                          
              value={inviteEmail}
              onChange={(e) => setInviteEmail(e.target.value)}
            />
            <button className="btn bg-btn-primary text-white    " onClick={handleInvite}>+ Add</button>
          </div>
        </div>

        <div className="flex justify-end gap-4">
          <button className="btn btn-outline">Cancel</button>
          <button className="btn bg-btn-primary text-white">Save Changes</button>
        </div>
      </div>

      <div className="md:w-1/2 space-y-4">
        <h2 className="text-2xl font-bold mb-4">Invite List</h2>
        <div className="card bg-base-100 shadow-xl p-4 h-full">
          {invites.length > 0 ? invites.map((email, index) => (
            <div key={index} className="flex justify-between items-center py-2 border-b">
              <p className="text-sm">{email}</p>
              <div className=" text-sm flex gap-2 rounded-l-full md:bg-bg-secondary-light md:p-1">
                <Edit className="cursor-pointer md:text-white text-accent-teal-light h-5 w-5" onClick={() => handleEdit(index)} />
                <Trash2 className="cursor-pointer text-orange-500 h-5 w-5" onClick={() => handleDelete(index)} />
              </div>
            </div>
          )) : (
            <div className="text-center py-8">
              <p className="text-lg">No invites added yet</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
