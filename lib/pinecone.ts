import {  Pinecone } from "@pinecone-database/pinecone"
import { config } from "dotenv"

config();


const pineConeAPIKey : string  = process.env.PINECONE_API_KEY as string 

console.log({
    pinecone : pineConeAPIKey
});

const pinecone = new Pinecone({
      apiKey :  pineConeAPIKey
})


export default pinecone 