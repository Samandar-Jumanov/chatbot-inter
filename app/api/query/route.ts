
// querying pinecone 

import { queryPinecone } from "@/lib/queryData";



type Data = {
     message : string 
}


export const POST = async ( request : Request , response : Response ) =>{
    
    const data : Data  = await request.json()
    try {
        const message = data.message 

        if(!message) {
                return new Response(JSON.stringify({
                      message : "Invalid request",
                      success : false 
                }) , { status  : 400})
        };
        
        const response = await queryPinecone(message)

        return new Response(JSON.stringify(response) , { status : 200})
    } catch (error : any ) {
        console.log({
              queryDataApiError : error.message
        })

        throw new Error(error.message )
    }
}