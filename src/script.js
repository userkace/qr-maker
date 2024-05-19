let divQR = document.getElementById("divQR");
let color = document.getElementById("color");
let bg = document.getElementById("bg");
let inQR = document.getElementById("inQR");
let outQR = document.getElementById("outQR");

function genQR(){
     if (color.value && bg.value){
          outQR.src = "https://api.qrserver.com/v1/create-qr-code/?size=1080x1080&data=" + inQR.value + "&bgcolor=" + bg.value + "&color=" + color.value;
     } else if (color.value) {
          outQR.src = "https://api.qrserver.com/v1/create-qr-code/?size=1080x1080&data=" + inQR.value + "&bgcolor=262626&color=" + color.value;
     } else if (bg.value) {
          outQR.src = "https://api.qrserver.com/v1/create-qr-code/?size=1080x1080&data=" + inQR.value + "&bgcolor=" + bg.value + "&color=f0f0f0";
     } else {
          outQR.src = "https://api.qrserver.com/v1/create-qr-code/?size=1080x1080&data=" + inQR.value + "&bgcolor=262626&color=f0f0f0";
     };
};

function download() {
     const image = document.getElementById("outQR");
     const imageUrl = image.src;

     // Create a Blob object with the image data
     fetch(imageUrl)
       .then(response => response.blob())
       .then(blob => {
         // Create a temporary URL for the downloaded image
         const url = window.URL.createObjectURL(blob);

         // Create an anchor element (a link)
         const link = document.createElement("a");

         // Set the href attribute to the temporary URL
         link.href = url;

         // Set the download attribute to a desired filename
         link.download = inQR.value + "_" + color.value + "_" + bg.value + ".png";

         // Simulate a click on the link to trigger download
         link.click();
   
         // Revoke the temporary URL after download
         window.URL.revokeObjectURL(url);
       })
       .catch(error => console.error(error));
   }