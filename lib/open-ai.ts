import { OpenAIEmbeddings } from 'langchain/embeddings/openai'
import { config } from "dotenv"

config();


const openAiApiKey : string = process.env.OPEN_AI_KEY as string 


const OpenAi = new OpenAIEmbeddings({
       apiKey : openAiApiKey
})


export default OpenAi