import pinecone from "./pinecone";
import OpenAi from "./open-ai";
import chain from "./langchain"

export const queryPinecone = async (message: string): Promise<any> => {
  try {
    // Query Pinecone index

    const index = await pinecone.index("sample-movies");
    const queryEmbedding = await OpenAi.embedQuery(message);

    const queryResponse = await index.query({
      topK: 1,
      vector: queryEmbedding,
      includeMetadata: true,
      includeValues: true,
    });

    const bestMatch = queryResponse.matches[0]?.metadata;
        
    const aiPrompt = await  chain.invoke( {
         input : `Do not send me objects  . Generate me good 
         response from this data ${bestMatch} for this message  ${message} 
         . I need to use it for chat app`
    });

    return aiPrompt;
  } catch (error: any) {
    console.log({ queryingError: error.message });
    throw new Error(error.message);
  }
};


