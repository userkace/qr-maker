let divQR = document.getElementById("divQR");
let bg = document.getElementById("bg");
let color = document.getElementById("color");
let inQR = document.getElementById("inQR");
let outQR = document.getElementById("outQR");

function genQR(){
     if (color.value && bg.value){
          outQR.src = "https://api.qrserver.com/v1/create-qr-code/?size=285x285&data=" + inQR.value + "&bgcolor=" + bg.value + "&color=" + color.value;
     } else if (color.value) {
          outQR.src = "https://api.qrserver.com/v1/create-qr-code/?size=285x285&data=" + inQR.value + "&bgcolor=262626&color=" + color.value;
     } else if (bg.value) {
          outQR.src = "https://api.qrserver.com/v1/create-qr-code/?size=285x285&data=" + inQR.value + "&bgcolor=" + bg.value + "&color=f0f0f0";
     } else {
          outQR.src = "https://api.qrserver.com/v1/create-qr-code/?size=285x285&data=" + inQR.value + "&bgcolor=262626&color=f0f0f0";
     };
};