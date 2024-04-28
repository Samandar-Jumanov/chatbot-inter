

import { ChatPromptTemplate } from "@langchain/core/prompts";
// import anthontropic from "./anthontropic"
import { OpenAI } from "@langchain/openai"
import { config } from "dotenv"
import { StringOutputParser } from "@langchain/core/output_parsers"
import {  AIMessage } from "@langchain/core/messages"
import { MessagesPlaceholder } from "@langchain/core/prompts";


config();


const openAiApiKey : string = process.env.OPEN_AI_KEY as string 
const parser = new StringOutputParser();

export const openAi = new OpenAI({
   openAIApiKey  : openAiApiKey,
   temperature : 0.7,
   modelName : "gpt-3.5-turbo"
})

 const prompt = ChatPromptTemplate.fromMessages([
  ["ai", ` You are a  super bot that helps me to find a correct movie . Please dont send me an object send something better  .
        Do not send me object . 
   `],
    new MessagesPlaceholder("chat_history"),
   ["human", "{input}"],
])

export const chat_history  = [
   new AIMessage("Hello! How can I assist you today?")
]

export const chain  = prompt.pipe(openAi).pipe(parser)



