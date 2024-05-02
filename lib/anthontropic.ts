import { ChatAnthropic } from "@langchain/anthropic";
import { config } from "dotenv";

config();


const anthropicApiKey = process.env.ANTHROPIC_AI_KEY;


if (!anthropicApiKey) {
  throw new Error('ANTHROPIC_AI_KEY is not defined');
}


const anthontropic = new ChatAnthropic({
  anthropicApiKey: anthropicApiKey,
  model: "claude-3-haiku-20240307",
  maxTokens: 1000,
  temperature: 0.2,
});


export default anthontropic 