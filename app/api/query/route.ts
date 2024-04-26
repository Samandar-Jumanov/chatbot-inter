
// querying pinecone 

import { queryPinecone } from "@/lib/queryData";


export const POST = async ( request : Request , response : Response ) =>{
    const data = await request.json();


    const { message } : { message : string } = data ;

    try {

        if(!message) {
                return new Response(JSON.stringify({
                      message : "Invalid request",
                      success : false 
                }) , { status  : 400})
        }


        const response = await queryPinecone(message)

        return new Response(JSON.stringify(response) , { status : 200})
    } catch (error : any ) {
        console.log({
              queryDataApiError : error.message
        })

        throw new Error(error.message )
    }
}