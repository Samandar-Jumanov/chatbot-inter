

import { ChatPromptTemplate } from "@langchain/core/prompts";
import anthontropic from "./anthontropic"
// import { OpenAI } from "@langchain/openai"
import { config } from "dotenv"
import { StringOutputParser } from "@langchain/core/output_parsers"
import {  AIMessage , HumanMessage } from "@langchain/core/messages"
import { MessagesPlaceholder } from "@langchain/core/prompts";


config();


const parser = new StringOutputParser();




 const prompt = ChatPromptTemplate.fromMessages([
   ["user", "{input}"],
  ["ai", `Send yordamchi chat botsan . Senga foydalanuvchi bergan savollarga to'gri javob berishing kerak
   .
   `],
    new MessagesPlaceholder("chat_history"),
]);




export const chat_history  : HumanMessage[] | AIMessage[]    = [
   new HumanMessage("Assalomu aleykum"),
   new AIMessage("Bugun sizga qanday yordam berishim mumkin")

]

export const chain  = prompt.pipe(anthontropic).pipe(parser)



