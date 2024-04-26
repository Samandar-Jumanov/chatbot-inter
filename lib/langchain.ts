

import { ChatPromptTemplate } from "@langchain/core/prompts";
// import anthontropic from "./anthontropic"
import OpenAi from "./open-ai"
import { OpenAI } from "@langchain/openai"


const openAi = new OpenAI({
   apiKey  : "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"
})

const prompt = ChatPromptTemplate.fromMessages([
  ["system", " You are a  super bot that helps me to find a correct movie  "],
  ["human", "{input}"],
]);


const chain  = prompt.pipe(openAi)


export default chain
