import React from 'react';
import { FiSend, FiFile } from 'react-icons/fi';
import { IButtonsProps } from "@/types/chat-bot"

export const Buttons: React.FC<IButtonsProps> = ({ 
  inputValue, 
  setInputValue, 
  handleSendMessage, 
  handleFileUpload, 
  selectedFile 
}) => {

  return (
    <div className="flex mt-4">
      <input
        type="text"
        placeholder={selectedFile ? `File: ${selectedFile.name}` : "Type your message..."}
        className="flex-1 px-4 py-2 rounded-l-lg bg-gray-700 focus:outline-none text-white text-lg"
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
        onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
      />

      <button
        className="px-4 py-2 bg-blue-500 rounded-l-none hover:bg-blue-600 focus:outline-none"
        onClick={handleSendMessage}
      >
        <FiSend className="text-white text-lg" />
      </button>

      <label htmlFor="file-upload" className="px-4 py-2 bg-gray-700 rounded-r-lg cursor-pointer flex items-center">
        <FiFile className="mr-2" />
        <input
          id="file-upload"
          type="file"
          className="hidden"
          onChange={handleFileUpload}
        />
      </label>
    </div>
  );
}
