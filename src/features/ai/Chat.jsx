import React, { useState, useEffect, useRef } from 'react';
import { Send, User, Bot, CornerDownLeft, Mic, Paperclip, Moon, Sun } from 'lucide-react';
import logo  from "../../assets/chatAi.png"
// Main App Component
export default function ChatAi() {
  // State for dark mode
  const [darkMode, setDarkMode] = useState(false);
  // State for messages in the chat
  const [messages, setMessages] = useState([
    { id: 1, text: "Hello! I'm a friendly AI assistant. How can I help you today?", sender: 'bot', timestamp: new Date() },
  ]);
  // State for the current input value
  const [inputValue, setInputValue] = useState('');
  // State to indicate if the AI is typing
  const [isTyping, setIsTyping] = useState(false);

  // Ref for the messages container to enable auto-scrolling
  const messagesEndRef = useRef(null);
  // Ref for the input field
  const inputRef = useRef(null);

  // Toggle dark mode
  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
  };

  // Effect to apply dark mode class to the body
  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [darkMode]);

  // Function to scroll to the bottom of the messages
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  // Effect to scroll to bottom when messages change
  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  // Effect to focus on input field on load
  useEffect(() => {
    inputRef.current?.focus();
  }, []);


  // Handle sending a message
  const handleSendMessage = () => {
    if (inputValue.trim() === '') return;

    // Add user's message to the chat
    const newUserMessage = {
      id: messages.length + 1,
      text: inputValue,
      sender: 'user',
      timestamp: new Date(),
    };
    setMessages(prevMessages => [...prevMessages, newUserMessage]);
    setInputValue(''); // Clear input field
    setIsTyping(true); // AI starts "typing"

    // Simulate AI response after a short delay
    setTimeout(() => {
      const aiResponseText = generateAiResponse(inputValue);
      const newAiMessage = {
        id: messages.length + 2, // Ensure unique ID
        text: aiResponseText,
        sender: 'bot',
        timestamp: new Date(),
      };
      setMessages(prevMessages => [...prevMessages, newAiMessage]);
      setIsTyping(false); // AI finishes "typing"
    }, 1000 + Math.random() * 1000); // Random delay for realism
  };

  // Simple AI response logic (can be expanded)
  const generateAiResponse = (userInput) => {
    const lowerInput = userInput.toLowerCase();
    if (lowerInput.includes("hello") || lowerInput.includes("hi")) {
      return "Hi there! How can I assist you today?";
    } else if (lowerInput.includes("how are you")) {
      return "I'm doing well, thank you for asking! Ready to help.";
    } else if (lowerInput.includes("help")) {
      return "Sure, I can help with a variety of topics. What do you need assistance with?";
    } else if (lowerInput.includes("bye") || lowerInput.includes("goodbye")) {
      return "Goodbye! Have a great day.";
    } else if (lowerInput.includes("name")) {
      return "I am a Chat AI, here to assist you.";
    } else if (lowerInput.includes("time")) {
      return `The current time is ${new Date().toLocaleTimeString()}.`;
    } else if (lowerInput.includes("date")) {
      return `Today's date is ${new Date().toLocaleDateString()}.`;
    }
    return "I'm still learning! Can you try asking something else?";
  };

  // Handle key press for sending message with Enter
  const handleKeyPress = (event) => {
    if (event.key === 'Enter' && !event.shiftKey) {
      event.preventDefault(); // Prevent new line on Enter
      handleSendMessage();
    }
  };

  // Format timestamp for display
  const formatTimestamp = (date) => {
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  return (
    <div className={`flex flex-col h-[100vh] font-sans  bg-gray-100 dark:bg-gray-900 transition-colors duration-300 rounded-2xl`}>
      {/* Header */}
      <header className="bg-white dark:bg-gray-800 shadow-md p-4 flex justify-between items-center z-20">
        <div className="flex items-center gap-4">
                  <img src={logo} className='w-14 h-14'/>
          <h1 className="text-xl font-semibold text-gray-800 dark:text-white">Chat with TestNest AI</h1>
        </div>
        {/* <button
          onClick={toggleDarkMode}
          className="p-2 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500"
          aria-label="Toggle dark mode"
        >
          {darkMode ? <Sun className="w-6 h-6 text-yellow-400" /> : <Moon className="w-6 h-6 text-gray-700" />}
        </button> */}
              
      </header>

      {/* Chat Messages Area */}
      <main className={` relative flex-1 overflow-y-auto p-6 space-y-4 z-10    dark:bg-gray-800`} >
        {/* <div className="backgroundimg h-full w-[90%] -z-10 sticky top-32"></div> */}
        {messages.map((msg) => (
          <div key={msg.id} className={`z-30 flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}>
            <div className={`max-w-xs md:max-w-md lg:max-w-lg xl:max-w-xl px-4 py-3 rounded-xl shadow-md ${
              msg.sender === 'user'
                ? 'bg-accent-teal-light text-white rounded-br-none'
                : 'bg-white dark:bg-gray-700 text-gray-800 dark:text-gray-100 rounded-bl-none'
            }`}>
              <p className="text-sm break-words">{msg.text}</p>
              <p className={`text-xs mt-1 ${msg.sender === 'user' ? 'text-blue-200 text-right' : 'text-gray-500 dark:text-gray-400 text-left'}`}>
                {formatTimestamp(msg.timestamp)}
              </p>
            </div>
          </div>
        ))}
        {/* Typing indicator */}
        {isTyping && (
          <div className="flex justify-start">
            <div className="max-w-xs md:max-w-md lg:max-w-lg xl:max-w-xl px-4 py-3 rounded-xl shadow-md bg-white dark:bg-gray-700 text-gray-800 dark:text-gray-100 rounded-bl-none">
              <div className="flex items-center space-x-1">
                <div className="w-2 h-2 bg-gray-400 rounded-full animate-pulse delay-75"></div>
                <div className="w-2 h-2 bg-gray-400 rounded-full animate-pulse delay-150"></div>
                <div className="w-2 h-2 bg-gray-400 rounded-full animate-pulse delay-300"></div>
                <span className="text-sm text-gray-500 dark:text-gray-400 ml-1">AI is typing...</span>
              </div>
            </div>
          </div>
        )}
        {/* Dummy div to ensure scrolling to the bottom */}
        <div ref={messagesEndRef} />
      </main>

      {/* Input Area */}
      <footer className="bg-white dark:bg-gray-800 p-4 border-t border-gray-200 dark:border-gray-700">
        <div className="flex items-center space-x-2">
          {/* <button className="p-2 text-gray-500 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500">
            <Paperclip className="w-5 h-5" />
          </button> */}
          <input
            ref={inputRef}
            type="text"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder="Type your message..."
            className="flex-1 p-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-accent-teal-light focus:border-transparent outline-none transition-shadow bg-white dark:bg-gray-700 text-gray-800 dark:text-gray-100 placeholder-gray-400 dark:placeholder-gray-500"
          />
          {/* <button className="p-2 text-gray-500 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500">
                      <Mic className="w-5 h-5" />
                      
          </button> */}
          <button
            onClick={handleSendMessage}
            disabled={!inputValue.trim() && !isTyping}
            className="bg-accent-teal-light hover:bg-accent-teal-dark text-white p-3 rounded-lg shadow-md transition-colors duration-200 disabled:opacity-95 disabled:cursor-not-allowed flex items-center justify-center focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 dark:focus:ring-offset-gray-800"
            aria-label="Send message"
          >
            <Send className="w-5 h-5" />
          </button>
        </div>
        <p className="text-xs text-center text-gray-500 dark:text-gray-400 mt-2">
          Press <CornerDownLeft className="inline w-3 h-3" /> Enter to send.
        </p>
      </footer>
    </div>
  );
}
