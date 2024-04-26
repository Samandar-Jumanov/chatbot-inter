

// This is for querying each string of data



export const queryPinecone = async ( message : string ) : Promise<string> =>{

    try {

        console.log({
             queryPineconeMessage : message 
        });

        return " Some kind of movies yeah"

    }catch( error : any ) {
        console.log({
              queringError : error.message
        })


        throw new Error(error.message)
    }
}