const inputOpt = document.getElementById("inputOpt")

const divQR = document.getElementById("divQR");

let color = document.getElementById("color");
let bg = document.getElementById("bg");

let inLink = document.getElementById("inLink");
let inSSID = document.getElementById("inSSID");
let inPass = document.getElementById("inPass");
let inMail = document.getElementById("inMail");

const inputLink = document.getElementById("inputLink");
const inputWifi = document.getElementById("inputWifi");
const inputMail = document.getElementById("inputMail");

const gen = document.getElementById("gen")
const outQR = document.getElementById("outQR");

const footer = document.getElementById("footer");

const hexRegex = /^([A-Fa-f0-9]{6})$/;

const defaultOptions = {
     size: '1000x1000',
     bg: '262626',
     color: 'f0f0f0',
};

const inputFields = [
     inLink,
     inSSID,
     inPass,
     inMail
];

inputOpt.addEventListener('change', () => {
     inputFields.forEach(field => field.value = '');
});

/* Event listener to each input field in the `inputFields` array. */
inputFields.forEach(inputField => {
     inputField.addEventListener('keydown', (event) => {
          if (event.key === 'Enter') {
               genQR({
                    bg: bg.value,
                    color: color.value
               });
          }
     });
});

/* Event listener to the `inputOpt` element. */
inputOpt.addEventListener('change', (event) => {
     const selectedValue = event.target.value;
     toggleInputVisibility(selectedValue);
});

/* Event listener to the `inMail` input field. */
inMail.addEventListener('keyup', () => {
     const submit = document.getElementById("submit");
     const download = document.getElementById("download");
     const email = inMail.value;
     const isValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email); // Basic email regex
     submit.disabled = !isValid;
     download.disabled = !isValid;
});

/**
 * The function `toggleInputVisibility` hides all input elements and shows the selected input based on
 * the provided value.
 */
function toggleInputVisibility(selectedValue) {
     const inputElements = {
          gen: gen,
          qr: divQR,
          link: inputLink,
          wifi: inputWifi,
          mail: inputMail,
     };
     // Hide all inputs by default
     for (const input of Object.values(inputElements)) {
          input.classList.add('hidden');
     }
     // Show the selected input
     if (inputElements[selectedValue]) {
          inputElements[selectedValue].classList.remove('hidden');
          gen.classList.remove('hidden');
     } else {
          // Handle cases where selectedValue doesn't match any option (optional)
          console.warn("Invalid selected value. Please choose a valid input type.");
     }
}

/* The function `genQR` generates a QR code based on user input for different types. */
function genQR(options = {}) {
     outQR.src = "./src/asset/478.gif";

     if ((options.color).startsWith("#", 0)){
          options.color = (options.color).substring(1)
     }
     if ((options.bg).startsWith("#", 0)){
          options.bg = (options.bg).substring(1)
     }

     const qrOpt = {
          size: options.size || defaultOptions.size,
          bg: options.bg || defaultOptions.bg,
          color: options.color || defaultOptions.color,
     };

     if(!hexRegex.test(qrOpt.color) || !hexRegex.test(qrOpt.bg)){
          alert("Invalid hex code format! Please enter a valid hex code (e.g., #FFFFFF, FFFFFF).")
          return;
     } else if(hexRegex.test(qrOpt.color) || hexRegex.test(qrOpt.bg)){
          switch (inputOpt.value) {
               case 'link':
                    if (inLink.value !== '') {
                         outQR.src = `https://api.qrserver.com/v1/create-qr-code/?size=${qrOpt.size}&data=${inLink.value}&bgcolor=${qrOpt.bg}&color=${qrOpt.color}`;
                         divQR.classList.remove('hidden');
                    }
                    break;
               case 'wifi':
                    if (inSSID.value !== '' && inPass.value !== '') {
                         outQR.src = `https://api.qrserver.com/v1/create-qr-code/?size=${qrOpt.size}&data=WIFI:S:${inSSID.value};T:WPA;P:${inPass.value};;&bgcolor=${qrOpt.bg}&color=${qrOpt.color}`;
                         divQR.classList.remove('hidden');
                    }
                    break;
               case 'mail':
                    if (inMail.value !== '') {
                         outQR.src = `https://api.qrserver.com/v1/create-qr-code/?size=${qrOpt.size}&data=mailto:${inMail.value}?subject=Let's%20connect!%26body=Hi!%20I%20would%20like%20connect%20with%20you!%0A%0AMade%20with%20https%3A%2F%2Fqr.kace.dev&bgcolor=${qrOpt.bg}&color=${qrOpt.color}`;
                         divQR.classList.remove('hidden');
                    }
                    break;
               default:
                    // Handle cases where inputOpt.value doesn't match any option (optional)
                    console.warn("Invalid input option. Please choose a valid input type.");
          }
     }
}

/* The function `download` downloads a QR code image with customizable options based on user input. */
function download(options = {}) {
     const image = document.getElementById("outQR");
     const imageUrl = image.src;

     const qrOpt = {
          size: options.size || defaultOptions.size,
          bg: options.bg || defaultOptions.bg,
          color: options.color || defaultOptions.color,
     };

     if (options.color.startsWith("#", 0)){
          options.color = options.color.substring(1)
     } else if (options.bg.startsWith("#", 0)){
          options.bg = options.bg.substring(1)
     }

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
                         if (inLink.value !== '') {
                              link.download = inLink.value + `_${qrOpt.color}_${qrOpt.bg}.png`;
                              link.click();
                         }
                         break;
                    case 'wifi':
                         if (inSSID.value !== '' || inPass.value !== '') {
                              link.download = inSSID.value + `_${qrOpt.color}_${qrOpt.bg}.png`;
                              link.click();
                         }
                         break;
                    case 'mail':
                         if (inMail.value !== '') {
                              link.download = inMail.value + `_${qrOpt.color}_${qrOpt.bg}.png`;
                              link.click();
                         }
                    default:
                         console.warn('No generated QR code!')
                         break;
               }
               // Revoke the temporary URL after download
               window.URL.revokeObjectURL(url);
          })
          .catch(error => console.error(error));
}

function easterEgg(){
     const pill = document.getElementById("pill");
     const logo = document.getElementById("logo");
     logo.src = "./src/asset/favicon-p.png";
     pill.style.backgroundColor = "rgb(249 168 212 / var(--tw-bg-opacity))";
     submit.style.backgroundColor = "rgb(249 168 212 / var(--tw-bg-opacity))";
     footer.innerHTML = "Made with 🩷";
}
