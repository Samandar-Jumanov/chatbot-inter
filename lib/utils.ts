export  function processResponse(response: string): string {
    if (response.includes("object")) {
        const objectIndex = response.indexOf("object");
        return response.substring(0, objectIndex-1);
    } else {
        return response;
    }

}