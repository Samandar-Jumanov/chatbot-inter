

import { ChatPromptTemplate } from "@langchain/core/prompts";
// import anthontropic from "./anthontropic"
import { OpenAI } from "@langchain/openai"


const openAi = new OpenAI({
   apiKey  :  process.env.OPEN_AI_KEY
})

const prompt = ChatPromptTemplate.fromMessages([
  ["system", " You are a  super bot that helps me to find a correct movie . Please dont send me an object send something better  "],
  ["human", "{input}"],
]);


const chain  = prompt.pipe(openAi)


export default chain
