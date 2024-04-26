import pinecone from "./pinecone"
import OpenAi  from "./open-ai"


export const queryPinecone = async ( message : string ) : Promise<any > =>{
    
    try {
        const index = await  pinecone.index("sample-movies")
        const queryEmbedding = await OpenAi.embedQuery(message);
        let queryResponse = await index.query({
            topK: 10,
            vector: queryEmbedding,
            includeMetadata: true,
            includeValues: true,
         });


        return queryResponse

    }catch( error : any ) {
        console.log({
              queringError : error.message
        })
        
        throw new Error(error.message)
    }
};


