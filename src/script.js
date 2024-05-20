let inputOpt = document.getElementById("inputOpt")

let divQR = document.getElementById("divQR");

let color = document.getElementById("color");
let bg = document.getElementById("bg");

let inLink = document.getElementById("inLink");
let inSSID = document.getElementById("inSSID");
let inPass = document.getElementById("inPass");

let inputLink = document.getElementById("inputLink");
let inputWifi = document.getElementById("inputWifi");

let outQR = document.getElementById("outQR");

const defaultOptions = {
     size: '1080x1080',
     bg: '262626',
     color: 'f0f0f0',
   };


// inputOpt.addEventListener('change', function() {
//      const selectedValue = this.value;

//      if (selectedValue === 'link') {
//           inputLink.classList.remove('hidden');
//           inputWifi.classList.add('hidden');
//      } else if (selectedValue === 'wifi') {
//           inputLink.classList.add('hidden');
//           inputWifi.classList.remove('hidden');
//      }
//  });

inputOpt.addEventListener('change', (event) => {
     const selectedValue = event.target.value;
     toggleInputVisibility(selectedValue);
   });


function toggleInputVisibility(selectedValue) {
     const inputElements = {
       link: inputLink,
       wifi: inputWifi,
     };
     // Hide all inputs by default
     for (const input of Object.values(inputElements)) {
       input.classList.add('hidden');
     }
     // Show the selected input
     if (inputElements[selectedValue]) {
       inputElements[selectedValue].classList.remove('hidden');
     } else {
       // Handle cases where selectedValue doesn't match any option (optional)
       console.warn("Invalid selected value. Please choose a valid input type.");
     }
   }

function genQR(options = {}) {
  const qrOpt = {
     size: options.size || defaultOptions.size,
     bg: options.bg || defaultOptions.bg,
     color: options.color || defaultOptions.color,
   };

   switch (inputOpt.value) {
     case 'link':
       outQR.src = `https://api.qrserver.com/v1/create-qr-code/?size=${qrOpt.size}&data=${inLink.value}&bgcolor=${qrOpt.bg}&color=${qrOpt.color}`;
       break;
     case 'wifi':
       outQR.src = `https://api.qrserver.com/v1/create-qr-code/?size=${qrOpt.size}&data=WIFI:S:${inSSID.value};T:WPA;P:${inPass.value};;&bgcolor=${qrOpt.bg}&color=${qrOpt.color}`;
       break;
     default:
       // Handle cases where inputOpt.value doesn't match any option (optional)
       console.warn("Invalid input option. Please choose a valid input type.");
   }
}

function download(options = {}) {
     const image = document.getElementById("outQR");
     const imageUrl = image.src;
     const qrOpt = {
          size: options.size || defaultOptions.size,
          bg: options.bg || defaultOptions.bg,
          color: options.color || defaultOptions.color,
        };

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
         switch (inputOpt.value) {
          case 'link':
          link.download = inLink.value + `_${qrOpt.color}_${qrOpt.bg}.png`;
          link.click();
          break;
          case 'wifi':
          link.download = inSSID.value + `_${qrOpt.color}_${qrOpt.bg}.png`;
          link.click();
          break;
          default:
          console.warn('No generated QR code!')
          break;
         }

         // Revoke the temporary URL after download
         window.URL.revokeObjectURL(url);
       })
       .catch(error => console.error(error));
   }