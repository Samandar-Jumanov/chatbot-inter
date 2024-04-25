

// How to query 

/*
 1 : Start with taking question
 2  : Create 2 functions . One for text one for file
 3 : Both functions should have an quering function ( create a lib folder for it )
 4 : When i am using i need to use some kind of lib function to queryData for me based on 
   the message o recieved 
*/


"use server"
import { queryPinecone } from "@/lib/queryData";
import { extractDoc, extractPdf } from "@/lib/extractQuestions";

export const queryData = async (data: File | string) => {
    try {
        let extractedText: string;
        
        if (typeof data === "string") {
            extractedText = data;
        } else if (data.type === "pdf") {
            extractedText = await extractPdf(data);
        } else {
            extractedText = await extractDoc(data);
        }

        const response = await queryPinecone(extractedText);
        return response;

    } catch (error: any) {
        console.log({
            queryingAction: error.message
        });
        throw new Error(error.message);
    }
};
