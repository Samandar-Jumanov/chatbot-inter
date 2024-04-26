"use client";

import React, { useState } from 'react';
import { FiSend, FiFile, FiX } from 'react-icons/fi';
import { IMessageInputProps, IMessageType } from "@/types/chat-bot";
import axios from "axios";
import { extractPdf } from '@/lib/extractQuestions';

const MessageInput: React.FC<IMessageInputProps> = ({ 
  inputValue, 
  setInputValue, 
  handleSendMessage, 
  handleFileUpload, 
  selectedFile,
  handleRemoveFile,
  addMessages
}) => {
  const [loading, setLoading] = useState(false);

  const inputPlaceholder = selectedFile ? `File: ${selectedFile.name}` : 'Type your message...';

  const sendQueryData = async () => {
    try {
      setLoading(true);
      handleSendMessage();

      let data: File | string = selectedFile ? selectedFile : inputValue;

      if (typeof data !== "string") {
        data = await extractPdf(data);
      }

      const response = await axios.post("/api/query", {
        message: JSON.stringify(data)
      });

      const aiResponse: IMessageType = {
        text: response.data,
        type: "ai"
      };

      addMessages(aiResponse);
      setInputValue(''); 
    } catch (error : any ) {
      console.error(error.message);
      addMessages({ text: "Failed to send query. Please try again.", type: "ai" });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex mt-4 relative">
      <input
        type="text"
        placeholder={inputPlaceholder}
        className="flex-1 px-4 py-2 rounded-l-lg bg-gray-700 focus:outline-none text-white text-lg"
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
        onKeyPress={(e) => e.key === 'Enter' && sendQueryData()}
        disabled={loading}
      />

      <button
        className={`px-4 py-2 ${(!inputValue && !selectedFile) || loading ? 'bg-gray-500 cursor-not-allowed' : 'bg-blue-500 hover:bg-blue-600'} rounded-l-none focus:outline-none`}
        onClick={() => sendQueryData()}
        disabled={!inputValue && !selectedFile}
      >
        {loading ? <Spinner /> : <FiSend className="text-white text-lg" />}
      </button>

      {selectedFile && (
        <button
          className="ml-2 px-3 py-2 flex items-center justify-center bg-red-500 rounded-full"
          onClick={handleRemoveFile}
        >
          <FiX className="text-white text-lg" />
        </button>
      )}

      {!selectedFile && (
        <label htmlFor="file-upload" className="ml-2 px-3 py-2 flex items-center justify-center bg-gray-700 rounded-r-lg cursor-pointer">
          <FiFile className="mr-2" />
          <input
            id="file-upload"
            type="file"
            className="hidden"
            onChange={handleFileUpload}
            accept='application/pdf'
            disabled={loading}
          />
        </label>
      )}
    </div>
  );
}

const Spinner = () => (
  <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 4.418 3.582 8 8 8v-4zm12-1.674A7.962 7.962 0 0120 12h4c0 4.418-3.582 8-8 8v-4zm-1.674-12A7.962 7.962 0 0112 4V0c4.418 0 8 3.582 8 8h-4z"></path>
  </svg>
);

export default MessageInput;
