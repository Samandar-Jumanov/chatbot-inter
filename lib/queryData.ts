import pinecone from "./pinecone";
import embeddingsCohere from "./embeddings";
import { chain , chat_history} from "./langchain"
import { processResponse } from "./utils";
import {  AIMessage , HumanMessage} from "@langchain/core/messages"


export const queryPinecone = async (message: string): Promise<any> => {
  try {


    // if(message === "Hey" || message.trim() == "Howareyou") {
    //   const aiPrompt = await  chat.call( {
    //     input : `Introduce yourself . And ask them what to server`
    //    });

    //    return aiPrompt
    // };



    const index = await pinecone.index("sample-movies");
    const queryEmbedding = await embeddingsCohere.embedQuery(message);

    const queryResponse = await index.query({
      topK: 1,
      vector: queryEmbedding,
      includeMetadata: true,
      includeValues: true,
    });

    const bestMatchMetadata = queryResponse.matches[0]?.metadata;
        
const prompt = `Do not send me objects.
 Generate a good response using this data: 
 ${JSON.stringify(bestMatchMetadata)} for this message:
"${message}". I need to use it for a chat app.`;



  const aiPrompt = await chain.invoke({
        input : prompt,
        chat_history : chat_history
  });


  const humanMessage = new HumanMessage(message)
  const aiResponse = new AIMessage(aiPrompt)

  chat_history.push(humanMessage)
  chat_history.push(aiResponse)

    return processResponse(aiPrompt)
  } catch (error: any) {
    console.log({ queryingError: error.message });
    throw new Error(error.message);
  }
};


