export type IMessageType = {
    type: 'ai' | 'user';
    text: string;
  };
  

  export type IMessageProps = {
    chatBoxRef : any ,
    messages : IMessageType[],
} 


export type IMessageInputProps = {
    inputValue : string ,
    setInputValue : ( arg : string ) => void ,
    handleFileUpload : ( e: React.ChangeEvent<HTMLInputElement>  ) => void ,
    handleSendMessage : (  ) => void ,
    selectedFile  : File | null,
    handleRemoveFile : ( ) => void 
}