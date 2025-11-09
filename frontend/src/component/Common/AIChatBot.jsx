// src/components/Common/AIChatBot.jsx
import React, { useState } from 'react';
import './AIChatBot.css';
import { FiSend, FiX, FiMessageCircle } from 'react-icons/fi';

const AIChatBot = () => {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');

  const toggleChat = () => setOpen(!open);

  // Prebuilt Q&A
  const qaPairs = [
    {
      question: 'How to create a new task?',
      answer: 'Click on "+ New Task" button in your dashboard, fill in details, and save.'
    },
    {
      question: 'How to mark a task as completed?',
      answer: 'Click the edit button on the task and change its status to Completed.'
    },
    {
      question: 'Can I filter tasks by priority?',
      answer: 'Yes! Use the priority dropdown above the task list to filter tasks.'
    },
    {
      question: 'How to delete a task?',
      answer: 'Click the trash icon on the task you want to remove and confirm deletion.'
    },
    {
      question: 'Can I switch between light and dark mode?',
      answer: 'Yes! Use the toggle button in the navbar to switch themes.'
    }
  ];

  const handleSend = () => {
    if (!input.trim()) return;

    const userMessage = { type: 'user', text: input };
    setMessages(prev => [...prev, userMessage]);
    setInput('');

    // Find prebuilt answer
    const matched = qaPairs.find(q =>
      input.toLowerCase().includes(q.question.toLowerCase())
    );

    const botMessage = {
      type: 'bot',
      text: matched ? matched.answer : "Sorry, I don't understand. Try one of the suggested questions."
    };

    setTimeout(() => {
      setMessages(prev => [...prev, botMessage]);
    }, 500);
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') handleSend();
  };

  const suggestedQuestions = qaPairs.map(q => q.question);

  return (
    <div className={`chatbot-wrapper ${open ? 'open' : ''}`}>
      {open ? (
        <div className="chatbot-container">
          <div className="chatbot-header">
            Technical Support
            <button className="close-btn" onClick={toggleChat}><FiX /></button>
          </div>

          <div className="chatbot-messages">
            {messages.map((msg, idx) => (
              <div
                key={idx}
                className={`chatbot-message ${msg.type === 'bot' ? 'bot' : 'user'}`}
              >
                {msg.text}
              </div>
            ))}

            {/* Suggested questions */}
            {messages.length === 0 && (
              <div className="chatbot-suggestions">
                <p>Try these questions:</p>
                {suggestedQuestions.map((q, idx) => (
                  <button
                    key={idx}
                    className="chatbot-suggestion-btn"
                    onClick={() => {
                      setInput(q);
                      handleSend();
                    }}
                  >
                    {q}
                  </button>
                ))}
              </div>
            )}
          </div>

          <div className="chatbot-input">
            <input
              type="text"
              placeholder="Type a message..."
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyPress={handleKeyPress}
            />
            <button onClick={handleSend}><FiSend /></button>
          </div>
        </div>
      ) : (
        <button className="chatbot-toggle-btn" onClick={toggleChat}>
          <FiMessageCircle size={28} />
        </button>
      )}
    </div>
  );
};

export default AIChatBot;
