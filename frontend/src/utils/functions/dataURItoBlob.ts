export default function dataURItoBlob(dataURI: string): Blob {
    // Convert base64/URLEncoded data component to raw binary data held in a string
    let byteString: string;
    if (dataURI.split(",")[0].includes("base64")) {
      byteString = atob(dataURI.split(",")[1]);
    } else {
      byteString = decodeURIComponent(dataURI.split(",")[1]);
    }
  
    // Extract the MIME type
    const mimeString = dataURI.split(",")[0].split(":")[1].split(";")[0];
  
    // Write the bytes of the string to a typed array
    const byteArray = new Uint8Array(byteString.length);
    for (let i = 0; i < byteString.length; i++) {
      byteArray[i] = byteString.charCodeAt(i);
    }
  
    return new Blob([byteArray], { type: mimeString });
  }
  