
export const extractPdf = async (  file : File ) : Promise<string > =>{

    try {

          return "File read"

    } catch (error : any ) {
        console.log({
              pdfErrror : error.message
        })
        throw new Error("Error working with pdf")
    }
};




export const extractDoc = async (  file : File ) : Promise<string> =>{

    try {

        console.log(file.text())
        const docText : string  = "I am a doc text"
        return docText

    } catch (error : any ) {
        console.log({
              pdfErrror : error.message
        })
        throw new Error("Error working with doc file")
    }
}

