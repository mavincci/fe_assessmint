import React, { useState } from "react";
import { Moon, Sun, Send, Trash2, Bot, CornerDownLeft } from "lucide-react";
import { sampleMCQQuestions, sampleTFQuestions } from "../../lib/data";
import ResponseDisplay from "../../components/ResponseDisplay";
import ChatInput from "../../components/ChatInput";
import { API_BASE_URL } from "../../action/Auth";
import aiImage from "../../assets/chatAi.png";
import NoInternetPage from "../../layouts/NoInternet";

export default function ChatInterface() {
  //   const { theme, toggleTheme } = useTheme();
  const [messages, setMessages] = useState([
    {
      id: "1",
      type: "system",
      content:
        "Hello! I can generate quiz questions for you. Try asking for true/false or multiple choice questions about any topic.",
      timestamp: new Date().toISOString(),
    },
  ]);
  const [tfQuestions, setTfQuestions] = useState([]);
  const [mcqQuestions, setMcqQuestions] = useState([]);
  const [activeTab, setActiveTab] = useState("chat");
  const [loading, setLoading] = useState(false);
  const [Noconnection, setNoConnection] = useState(false);
  const detectQuestionType = (input) => {
    const mcqKeywords = [
      /multiple[-\s]?choice/i,
      /\bmcq(s)?\b/i,
      /\bchoice(s)?\b/i,
    ];
    const tfKeywords = [
      /true\s*\/\s*false/i,
      /true\s+or\s+false/i,
      /\btf\b/i,
      /true[-\s]?false/i,
    ];

    const hasMCQ = mcqKeywords.some((regex) => regex.test(input));
    const hasTF = tfKeywords.some((regex) => regex.test(input));

    return { hasMCQ, hasTF };
  };
  // const handleSendMessage = async (message) => {
  //   if (!message.trim()) return;

  //   const newUserMessage = {
  //     id: Date.now().toString(),
  //     type: 'user',
  //     content: message,
  //     timestamp: new Date().toISOString(),
  //   };

  //   setMessages((prev) => [...prev, newUserMessage]);
  //   setLoading(true);

  //   try {
  //       const response = await fetch(`${API_BASE_URL}/ai/generate_mcq`, {
  //       method: 'POST',
  //       headers: {
  //           'Content-Type': 'application/json',
  //            Authorization: `Bearer ${localStorage.getItem("access")}`,
  //            Accept: "application/json",
  //       },
  //       body: JSON.stringify({ topic: message, numberOfQuestions:10}),
  //     });

  //       const data = await response.json();

  //     let responseMessage = {
  //       id: (Date.now() + 1).toString(),
  //       type: 'assistant',
  //       content: 'Here are your questions.',
  //       timestamp: new Date().toISOString(),
  //       hasQuestions: true,
  //       questionType:data.message === "MCQ_QUESTIONS_GENERATION_SUCCESS" ? "mcq" :data.message === "TF_QUESTIONS_GENERATION_SUCCESS"? "tf":"chat",
  //       };
  //       console.log(responseMessage)

  //     if (responseMessage.questionType==='tf' && data?.statusCode !==500) {
  //       setTfQuestions(data.body);
  //       setActiveTab('tf');
  //     } else if (responseMessage.questionType=== 'mcq'  && data?.statusCode !==500) {
  //       setMcqQuestions(data.body);
  //         setActiveTab('mcq');
  //         console.log(data.body)
  //     } else {
  //         setNoConnection(true)
  //     }

  //     setMessages((prev) => [...prev, responseMessage]);
  //   } catch (error) {
  //       console.log("error", error)
  //     setMessages((prev) => [
  //       ...prev,
  //       {
  //         id: (Date.now() + 2).toString(),
  //         type: 'assistant',
  //         content: 'Sorry, something went wrong while fetching questions.',
  //         timestamp: new Date().toISOString(),
  //       },
  //     ]);
  //   }

  //   setLoading(false);
  // };

  const handleSendMessage = async (message) => {
    if (!message.trim()) return;

    const newUserMessage = {
      id: Date.now().toString(),
      type: "user",
      content: message,
      timestamp: new Date().toISOString(),
    };

    setMessages((prev) => [...prev, newUserMessage]);
    setLoading(true);
    setNoConnection(false);

    const { hasMCQ, hasTF } = detectQuestionType(message);
    const needMCQ = hasMCQ || (!hasMCQ && !hasTF); // fallback to both if nothing detected
    const needTF = hasTF || (!hasMCQ && !hasTF);

    try {
      const promises = [];

      if (needMCQ) {
        promises.push(
          fetch(`${API_BASE_URL}/ai/generate_mcq`, {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${localStorage.getItem("access")}`,
              Accept: "application/json",
            },
            body: JSON.stringify({ topic: message, numberOfQuestions: 10 }),
          }).then((res) => res.json())
        );
      }

      if (needTF) {
        promises.push(
          fetch(`${API_BASE_URL}/ai/generate_tf`, {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${localStorage.getItem("access")}`,
              Accept: "application/json",
            },
            body: JSON.stringify({ topic: message, numberOfQuestions: 10 }),
          }).then((res) => res.json())
        );
      }

      const results = await Promise.all(promises);
      let mcqData = null;
      let tfData = null;

      if (needMCQ && needTF) {
        mcqData = results[0];
        tfData = results[1];
      } else if (needMCQ) {
        mcqData = results[0];
      } else if (needTF) {
        tfData = results[0];
      }

      let questionType = "chat";
      let questionFound = false;

      if (
        mcqData?.message === "MCQ_QUESTIONS_GENERATION_SUCCESS" &&
        mcqData.body?.length
      ) {
        setMcqQuestions(mcqData.body);
        questionType = "mcq";
        questionFound = true;
        setActiveTab("mcq");
      }

      if (
        tfData?.message === "TF_QUESTIONS_GENERATION_SUCCESS" &&
        tfData.body?.length
      ) {
        setTfQuestions(tfData.body);
        questionType = questionType === "mcq" ? "chat" : "tf";
        questionFound = true;
        setActiveTab("tf");
      }

      const responseMessage = {
        id: (Date.now() + 1).toString(),
        type: "assistant",
        content: questionFound
          ? "Here are your questions."
          : "Sorry, no questions could be generated.",
        timestamp: new Date().toISOString(),
        hasQuestions: questionFound,
        questionType: questionType,
      };

      if (!questionFound) {
        setNoConnection(true);
      }

      setMessages((prev) => [...prev, responseMessage]);
    } catch (error) {
      console.error("Fetch error:", error);
      setMessages((prev) => [
        ...prev,
        {
          id: (Date.now() + 2).toString(),
          type: "assistant",
          content: "Sorry, something went wrong while fetching questions.",
          timestamp: new Date().toISOString(),
        },
      ]);
    }

    setLoading(false);
  };

  const handleDeleteTFQuestion = (id) => {
    setTfQuestions((prev) => prev.filter((_, index) => index !== id));
  };

  const handleEditTFQuestion = (id, updatedQuestion) => {
    setTfQuestions((prev) =>
      prev.map((q, index) => (index === id ? updatedQuestion : q))
    );
  };

  const handleDeleteMCQQuestion = (id) => {
    setMcqQuestions((prev) => prev.filter((_, index) => index !== id));
  };

  const handleEditMCQQuestion = (id, updatedQuestion) => {
    setMcqQuestions((prev) =>
      prev.map((q, index) => (index === id ? updatedQuestion : q))
    );
  };

  return (
    <div className="flex flex-col h-screen bg-grad font-display ">
      {/* Header */}
      <header className="bg-white dark:bg-gray-800 shadow-sm border-b border-gray-200 dark:border-gray-700 transition-colors duration-300 bg-grad">
        <div className="container mx-auto px-4 py-3 flex justify-between items-center">
          <div className="flex items-center gap-2">
            <Bot className="h-10 w-10 text-primary-600 animate animate-pulse duration-500" />
            {/* <img src={aiImage} className="w-16 h-16 " /> */}
            <h1 className="text-xl font-semibold text-gray-800 dark:text-white">
              AssessMint AI Question Generator
            </h1>
          </div>
          {/* <button
            onClick={toggleTheme}
            className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors duration-200"
            aria-label={theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode'}
          >
            {theme === 'dark' ? (
              <Sun className="h-5 w-5 text-yellow-400" />
            ) : (
              <Moon className="h-5 w-5 text-gray-600" />
            )}
          </button> */}
        </div>
      </header>

      {/* Tabs */}
      <div className="bg-bg-light dark:bg-gray-800 shadow-sm transition-colors duration-300">
        <div className="container mx-auto px-4">
          <div className="tabs tabs-bordered p-1">
            <button
              className={`tab  ${activeTab === "chat" ? "bg-accent-teal-dark font-bold text-white rounded-full " : ""}`}
              onClick={() => setActiveTab("chat")}
            >
              Chat
            </button>
            <button
              className={`tab  ${activeTab === "tf" ? "bg-accent-teal-dark font-bold text-white rounded-full " : ""}`}
              onClick={() => setActiveTab("tf")}
            >
              T/F Questions{" "}
              {tfQuestions?.length > 0 && `(${tfQuestions?.length})`}
            </button>
            <button
              className={`tab  ${activeTab === "mcq" ? "bg-accent-teal-dark font-bold text-white rounded-full " : ""}`}
              onClick={() => setActiveTab("mcq")}
            >
              MCQ Questions{" "}
              {mcqQuestions?.length > 0 && `(${mcqQuestions?.length})`}
            </button>
          </div>
        </div>
      </div>

      {/* Main content */}
      <div className="flex-1 overflow-hidden">
        <div className="container mx-auto px-4 h-full">
          <div className="h-full flex flex-col pb-4">
            {activeTab === "chat" && (
              <div className="flex-1 overflow-y-auto py-4 space-y-4">
                {Noconnection ? (
                  <div>
                    <NoInternetPage status={true} />
                  </div>
                ) : (
                  <>
                    {messages.map((message) => (
                      <div
                        key={message.id}
                        className={`flex ${
                          message.type === "user"
                            ? "justify-end"
                            : message.type === "assistant"
                              ? "justify-start"
                              : "justify-center my-10 text-white"
                        } animate-fade-in`}
                      >
                        <div
                          className={`max-w-4xl rounded-lg px-4 py-3 font-display  ${
                            message.type === "user"
                              ? "bg-btn-primary text-white"
                              : message.type === "system"
                                ? "bg-bg-light border border-btn-primary rounded-xl p-2 dark:bg-gray-700 text-gray-800 dark:text-gray-200 text-lg"
                                : "bg-white dark:bg-gray-800 shadow border border-gray-200 dark:border-gray-700 text-gray-800 dark:text-gray-200"
                          }`}
                        >
                          <div className="flex items-start gap-2">
                            {message.type === "assistant" && (
                              <Bot className="h-5 w-5 text-primary-500 mt-1 flex-shrink-0" />
                            )}
                            <div>
                              <p>{message.content}</p>
                              {message.hasQuestions && (
                                <div className="mt-2 flex items-center text-sm text-gray-500 dark:text-gray-400">
                                  <CornerDownLeft className="h-4 w-4 mr-1" />
                                  <span>
                                    View in the{" "}
                                    {message.questionType === "tf"
                                      ? "T/F Questions"
                                      : "MCQ Questions"}{" "}
                                    tab
                                  </span>
                                </div>
                              )}
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </>
                )}
                {loading && (
                  <div className="flex justify-start animate-fade-in">
                    <div className="max-w-3xl rounded-lg px-4 py-3 bg-white dark:bg-gray-800 shadow border border-gray-200 dark:border-gray-700">
                      <div className="flex items-center gap-2">
                        {/* <Bot className="h-5 w-5 text-primary-500" /> */}
                        <img
                          src={aiImage}
                          className="h-5 w-5 animate-spin duration-1000"
                        />

                        <div className="flex space-x-2">
                          <div className="h-2 w-2 bg-gray-400 rounded-full animate-pulse"></div>
                          <div className="h-2 w-2 bg-gray-400 rounded-full animate-pulse delay-100"></div>
                          <div className="h-2 w-2 bg-gray-400 rounded-full animate-pulse delay-200"></div>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            )}

            {activeTab === "tf" && (
              <div className="flex-1 overflow-y-auto py-4">
                <ResponseDisplay
                  tfQuestions={tfQuestions}
                  onDeleteTF={handleDeleteTFQuestion}
                  onEditTF={handleEditTFQuestion}
                />
              </div>
            )}

            {activeTab === "mcq" && (
              <div className="flex-1 overflow-y-auto py-4">
                <ResponseDisplay
                  mcqQuestions={mcqQuestions}
                  onDeleteMCQ={handleDeleteMCQQuestion}
                  onEditMCQ={handleEditMCQQuestion}
                />
              </div>
            )}

            {/* Input area (only show in chat tab) */}
            {activeTab === "chat" && (
              <div className="pt-4 border-t border-gray-200 dark:border-gray-700 mb-8">
                <ChatInput
                  onSendMessage={handleSendMessage}
                  isLoading={loading}
                />
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
