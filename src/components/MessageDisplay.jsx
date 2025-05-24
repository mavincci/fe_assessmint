import { useEffect, useRef } from 'react';
import QuestionTable from './QuestionTable';

export default function MessageDisplay({ messages, onDeleteQuestion, onEditQuestion }) {
  const messagesEndRef = useRef(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  return (
    <div className="flex-1 overflow-y-auto p-4 space-y-4">
      {messages.map((message) => (
        <div
          key={message.id}
          className={`chat ${message.sender === 'user' ? 'chat-end' : 'chat-start'}`}
        >
          <div
            className={`chat-bubble ${
              message.sender === 'user' ? 'chat-bubble-primary' : 'chat-bubble-secondary'
            }`}
          >
            <p className="mb-2">{message.text}</p>
            {message.response && (
              <QuestionTable
                response={message.response}
                onDelete={(index) => onDeleteQuestion(message.id, index)}
                onEdit={(index, newText) => onEditQuestion(message.id, index, newText)}
              />
            )}
          </div>
        </div>
      ))}
      <div ref={messagesEndRef} />
    </div>
  );
}   