import { useState } from "react";
import { Send } from "lucide-react";

export default function MessageInput({ onSendMessage }) {
  const [message, setMessage] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (message.trim()) {
      onSendMessage(message);
      setMessage("");
    }
  };

  return (
    <div className="flex gap-2 p-4 bg-white border-t">
      <input
        type="text"
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        placeholder="Ask me anything..."
        className="input input-bordered flex-1"
      />
      <button onClick={handleSubmit} className="btn btn-primary">
        <Send className="w-4 h-4" />
      </button>
    </div>
  );
}
