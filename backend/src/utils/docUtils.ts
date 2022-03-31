import { Document } from "types/documentTypes";

export const documentDataTo3DResponse = (data: Document[], langCodes: string[]) => {
    for (let i = 0; i < data.length; i++) {
        // The language code is the 7th element when splitting the URL on forward slashes
        data[i]['language'] = data[i]['language'].split('/')[6];
      }
      
      // Documents are sorted into arrays of documents by celexID
      // The internal arrays are sorted by language, alphabetically (I think)
      
      let documentsArray: Document[][] = [];
      // To handle edge case that one or more queried language isnt present at all
      let celexIds = new Set(data.map(doc => doc.celexID));
  
      // Return array
      let langGroupedArray: Document[][][] = [];
     
      // Create celex-grouped temp array
      celexIds.forEach(id => {
        documentsArray.push(data.filter(doc => doc.celexID == id));
      });
      
      // Create prioritized language groupings within each celex group
      for (let celexIndex = 0; celexIndex < documentsArray.length; celexIndex++) {
        let celexGroup: Document[][] = [];
  
        // Create language groupings by filtering and pushing if the language exists for the given document
        for (let langIndex = 0; langIndex < langCodes.length; langIndex++) {
          let langMatches = documentsArray[celexIndex].filter(doc => doc.language == langCodes[langIndex]);
          if (langMatches.length != 0) celexGroup.push(langMatches);
        }
  
        // Build up the new array of arrays (of arrays)
        langGroupedArray.push(celexGroup)
    }
    return langGroupedArray;
};