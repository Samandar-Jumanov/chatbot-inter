"use client"

import { useState, useRef, useEffect } from 'react';
import MessageInput  from  "@/components/message-input"
import { IMessageType } from "@/types/chat-bot"
import { Messages } from '@/components/Messages';

export default function Home() {

  const [messages, setMessages] = useState<IMessageType[]>([
    { type: 'ai', text: 'Bugun sizga qanday yordam berishim mumkin ?' },
  ]);


  const addMessages =  (  aiResponse : IMessageType) =>{
       setMessages(prevMessages => [...prevMessages, aiResponse]);
  }

  const [inputValue, setInputValue] = useState<string>('');
  const [selectedFile, setSelectedFile] = useState<File | null>(null);

  const chatBoxRef = useRef<HTMLDivElement>(null);

  const handleRemoveFile = () => {
    setSelectedFile(null);
    setInputValue(''); 
  };

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

    setInputValue('');
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setSelectedFile(file);
    }
    handleSendMessage()
  };


  
  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-4 bg-black text-white">
      <h1 className='text-4xl font-bold, text-center, text-gray-800 mb-2'>  Movie find bot  </h1>
      <div className="flex flex-col w-full max-w-xl h-[80vh] p-6 bg-gray-800 rounded-lg shadow-lg">
        
        <Messages  
           chatBoxRef={chatBoxRef}
           messages={messages}
        />

       <MessageInput 
        inputValue={inputValue}
        setInputValue={setInputValue}
        handleFileUpload={handleFileUpload}
        handleSendMessage={handleSendMessage}
        selectedFile={selectedFile}
        handleRemoveFile={handleRemoveFile}
        addMessages={addMessages}
        />

      </div>
    </main>
  );
}
