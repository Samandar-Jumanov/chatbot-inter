

// This is for querying each string of data



export const data = async ( message : string ) : Promise<string> =>{

    try {


        return " SOme kind of movies yeah"

    }catch( error : any ) {
        console.log({
              queringError : error.message
        })


        throw new Error(error.message)
    }
}