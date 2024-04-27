

import { ChatPromptTemplate } from "@langchain/core/prompts";
// import anthontropic from "./anthontropic"
import { OpenAI } from "@langchain/openai"
import { config } from "dotenv"
import { StringOutputParser } from "@langchain/core/output_parsers"

config();


const openAiApiKey : string = process.env.OPEN_AI_KEY as string 
const parser = new StringOutputParser();



const openAi = new OpenAI({
   openAIApiKey  : openAiApiKey,
   temperature : 0.7,
   modelName : "gpt-3.5-turbo"
})

const prompt = ChatPromptTemplate.fromMessages([
  ["ai", ` You are a  super bot that helps me to find a correct movie . Please dont send me an object send something better  .
        Do not send me object . 
   `],
  ["human", "{input}"],
]);

const chain  = prompt.pipe(openAi).pipe(parser)

export default chain
