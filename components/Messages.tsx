
import {  IMessageProps } from "@/types/chat-bot"

export const Messages : React.FC<IMessageProps> = (  {
      chatBoxRef,
      messages,
}) =>{
      return (
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
      )
}

