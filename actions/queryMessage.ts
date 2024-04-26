

import { queryPinecone } from "@/lib/queryData";
import { extractDoc, extractPdf } from "@/lib/extractQuestions";

export const queryData = async (data:  File |  string) => {
    try {
        let extractedText: string;
        
        if (typeof data === "string") {
            extractedText = data;
        } else if (data.type === "pdf") {
            extractedText =   await  extractPdf(data)
        } else if (data.type === "doc" || "docx") {
            extractedText = await extractDoc(data)
        }else {
            return "Unsupported file format"
        };
        
        console.log({
             extractedText : extractedText
        })

        const response = await queryPinecone(extractedText);
        return response;

    } catch (error: any) {

        console.log({
            queryingAction: error.message
        });

        throw new Error(error.message);
    }
};
