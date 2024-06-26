import pinecone from "./pinecone";
import embeddingsCohere from "./embeddings";
import { chain , chat_history} from "./langchain"
import { processResponse } from "./utils";
import {  AIMessage , HumanMessage} from "@langchain/core/messages"


export const queryPinecone = async (message: string): Promise<any> => {
  try {


    const index = await pinecone.index("sample-movies");
    const queryEmbedding = await embeddingsCohere.embedQuery(message);

    const queryResponse = await index.query({
      topK: 1,
      vector: queryEmbedding,
      includeMetadata: true,
      includeValues: true,
    });

    const bestMatchMetadata = queryResponse.matches[0]?.metadata;
        
    const prompt = `Menga object jo'natmagan holda  javob ber 
      foydalanuvchining shu   "${message}" ga  shu data orqali
    : 
    ${JSON.stringify(bestMatchMetadata)} Va bu u ${message}
  `;

  const aiPrompt = await chain.invoke({
        input : prompt,
        chat_history : chat_history
  });


  const humanMessage = new HumanMessage(message.trim())
  const aiResponse = new AIMessage(aiPrompt.trim())

  chat_history.push(humanMessage)
  chat_history.push(aiResponse)

    return aiPrompt === "" ? "Savolingizga tushunmadin qaytadan savol  bera olasizmi" : aiPrompt

  } catch (error: any) {
    console.log({ queryingError: error.message });
    throw new Error(error.message);
  }
};


