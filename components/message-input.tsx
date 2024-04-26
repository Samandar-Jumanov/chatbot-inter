import React from 'react';
import { FiSend, FiFile, FiX } from 'react-icons/fi';
import { IMessageInputProps , IMessageType} from "@/types/chat-bot";
import { queryData } from '@/actions/queryMessage';


const MessageInput: React.FC<IMessageInputProps> = ({ 
  inputValue, 
  setInputValue, 
  handleSendMessage, 
  handleFileUpload, 
  selectedFile,
  handleRemoveFile,
  addMessages
}) => {



  const inputPlaceholder = selectedFile ? `File: ${selectedFile.name}` : 'Type your message...';
  const sendQueryData = async ( ) =>{

        try{

          handleSendMessage() 
          const data  : File | string = selectedFile ? selectedFile : inputValue
          const response = await queryData(data);
          const aiResponse : IMessageType = {
                 text : response,
                 type : "ai"
          };

          addMessages(aiResponse)
          console.log(response);

        }catch( error : any ){
          console.log(error.message)
           throw new Error(error.message)
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
      />

      <button
        className={`px-4 py-2 ${!inputValue && !selectedFile ? 'bg-gray-500 cursor-not-allowed' : 'bg-blue-500 hover:bg-blue-600'} rounded-l-none focus:outline-none`}
        onClick={() => sendQueryData()}
        disabled={!inputValue && !selectedFile}
      >
        <FiSend className="text-white text-lg" />
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
          />
        </label>
      )}
    </div>
  );
}

export default MessageInput;
