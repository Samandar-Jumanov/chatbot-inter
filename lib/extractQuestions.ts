import PDF from 'pdf-scraper';

export const extractPdf = async (  file : File ) : Promise<string > =>{

    try {

        const pdf : string   = await PDF(file.arrayBuffer())

        return pdf 

    } catch (error : any ) {
        console.log({
              pdfErrror : error.message
        })
        throw new Error("Error working with pdf")
    }
};




export const extractDoc = async (  file : File ) : Promise<string> =>{

    try {
        const docText : string  = (await file.text()).toString()
        return docText

    } catch (error : any ) {
        console.log({
              pdfErrror : error.message
        })
        throw new Error("Error working with doc file")
    }
}

