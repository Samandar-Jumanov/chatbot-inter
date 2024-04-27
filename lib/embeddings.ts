import { CohereEmbeddings } from "@langchain/cohere";
import { config } from "dotenv"


config();


const cohereAIApiKey  : string = process.env.COHERE_AI_SECRET_KEY as string 

if(!cohereAIApiKey){
       throw new Error("Cohere ai key not provided")
}

const embeddingsCohere = new CohereEmbeddings({
  apiKey: cohereAIApiKey, 
  batchSize: 96,
  verbose : true ,
});





export default embeddingsCohere 