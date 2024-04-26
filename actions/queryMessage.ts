"use server"



import { queryPinecone } from "@/lib/queryData";
import { extractDoc, extractPdf } from "@/lib/extractQuestions";

export const queryData = async (data:  string) => {
    try {
        // let extractedText: string;
        
        // if (typeof data === "string") {
        //     extractedText = data;
        // } else if (data.type === "pdf") {
        //     extractedText = await extractPdf(data);
        // } else {
        //     extractedText = await extractDoc(data);
        // }

        const response = await queryPinecone(data);
        return response;

    } catch (error: any) {

        console.log({
            queryingAction: error.message
        });

        throw new Error(error.message);
    }
};
