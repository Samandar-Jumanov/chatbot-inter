"use client"
import { useState, useRef, useEffect } from 'react';
import { FiSend } from 'react-icons/fi';

export default function Home() {
  const [messages, setMessages] = useState([
    { type: 'ai', text: 'Hello! How can I assist you today?' },
  ]);
  const [inputValue, setInputValue] = useState('');
  const chatBoxRef: React.MutableRefObject<any> = useRef(null);

  const scrollToBottom = () => {
    chatBoxRef.current?.scrollTo(0, chatBoxRef.current?.scrollHeight);
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSendMessage = () => {
    if (inputValue.trim() === '') return;

    const newUserMessage = { type: 'user', text: inputValue };
    setMessages([...messages, newUserMessage]);

    // Simulating AI response after a short delay
    setTimeout(() => {
      const aiResponse = { type: 'ai', text: 'I am just a demo bot. Please implement real AI logic.' };
      setMessages([...messages, newUserMessage, aiResponse]);
    }, 1000);

    setInputValue('');
  };

  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-4 bg-black text-white">
      <div className="flex flex-col w-full max-w-lg h-[70vh] p-6 bg-gray-800 rounded-lg shadow-lg">
        <div 
          ref={chatBoxRef}
          className="flex-1 overflow-y-auto"
        >
          {messages.map((message, index) => (
            <div
              key={index}
              className={`flex mb-2 ${message.type === 'ai' ? 'justify-start' : 'justify-end'}`}
            >
              <span
                className={`px-4 py-2 rounded-lg ${
                  message.type === 'ai' ? 'bg-gray-700 text-left' : 'bg-blue-500 text-right'
                }`}
              >
                {message.text}
              </span>
            </div>
          ))}
        </div>
        <div className="flex mt-4">
          <input
            type="text"
            placeholder="Type your message..."
            className="flex-1 px-4 py-2 rounded-l-lg bg-gray-700 focus:outline-none text-white text-lg"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
          />
          <button
            className="px-4 py-2 bg-blue-500 rounded-r-lg hover:bg-blue-600 focus:outline-none"
            onClick={handleSendMessage}
          >
            <FiSend className="text-white text-lg" />
          </button>
        </div>
      </div>
    </main>
  );
}
