

import pdfToText from 'react-pdftotext'



export const extractPdf = async (  file : File ) : Promise<string > =>{

    try {

        const content = await pdfToText(file)
         console.log(content)

        return  content
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

