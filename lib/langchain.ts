

import { ChatPromptTemplate } from "@langchain/core/prompts";
import anthontropic from "./anthontropic"

const prompt = ChatPromptTemplate.fromMessages([
  ["system", "You are a helpful  doctor  "],
  ["human", "{input}"],
]);

const chain  = prompt.pipe(anthontropic)


export default chain
