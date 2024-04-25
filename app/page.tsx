"use client"

import { useState, useRef, useEffect } from 'react';
import { Buttons } from "@/components/Buttons"
import { IMessageType } from "@/types/chat-bot"
import { Messages } from '@/components/Messages';

export default function Home() {
  const [messages, setMessages] = useState<IMessageType[]>([
    { type: 'ai', text: 'Hello! How can I assist you today?' },
  ]);
  
  const [inputValue, setInputValue] = useState<string>('');
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const chatBoxRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    chatBoxRef.current?.scrollTo(0, chatBoxRef.current?.scrollHeight);
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSendMessage = () => {
    if (inputValue.trim() === '' && !selectedFile) return;

    if (inputValue.trim() !== '') {
      const newUserMessage: IMessageType = { type: 'user', text: inputValue };
      setMessages([...messages, newUserMessage]);
    }

    if (selectedFile) {
      const newUserMessage: IMessageType = { type: 'user', text: `File: ${selectedFile.name}` };
      setMessages([...messages, newUserMessage]);
      setSelectedFile(null);
    }

    setTimeout(() => {
      const aiResponse: IMessageType = { type: 'ai', text: 'I am just a demo bot. Please implement real AI logic.' };
      setMessages(prevMessages => [...prevMessages, aiResponse]);
    }, 1000);

    setInputValue('');
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setSelectedFile(file);
    }

  };

  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-4 bg-black text-white">
      <div className="flex flex-col w-full max-w-xl h-[80vh] p-6 bg-gray-800 rounded-lg shadow-lg">
        
        <Messages  
           chatBoxRef={chatBoxRef}
           messages={messages}
        />

       <Buttons 
        inputValue={inputValue}
        setInputValue={setInputValue}
        handleFileUpload={handleFileUpload}
        handleSendMessage={handleSendMessage}
        selectedFile={selectedFile}
        />

      </div>
    </main>
  );
}
