

import pdfToText from 'react-pdftotext'

function preprocessText(text : string ) : string  {
    return text.replace(/\s+/g, ' ');
}


export const extractPdf = async (  file : File ) : Promise<string > =>{

    try {

        const content : string  = await pdfToText(file)

        console.log({
               content : content.length
        });

        console.log(preprocessText(content).length);

        return preprocessText(content);

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

