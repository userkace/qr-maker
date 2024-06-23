// Element selectors
const elements = {
     inputOpt: document.getElementById("inputOpt"),
     divQR: document.getElementById("divQR"),
     color: document.getElementById("color"),
     bg: document.getElementById("bg"),
     inText: document.getElementById("inText"),
     inLink: document.getElementById("inLink"),
     inSSID: document.getElementById("inSSID"),
     inPass: document.getElementById("inPass"),
     inMail: document.getElementById("inMail"),
     inputText: document.getElementById("inputText"),
     inputLink: document.getElementById("inputLink"),
     inputWifi: document.getElementById("inputWifi"),
     inputMail: document.getElementById("inputMail"),
     gen: document.getElementById("gen"),
     outQR: document.getElementById("outQR"),
     footer: document.getElementById("footer")
};

const hexRegex = /^([A-Fa-f0-9]{6})$/;

const defaultOptions = {
     size: '1000x1000',
     bg: '262626',
     color: 'f0f0f0'
};

const inputFields = [
     elements.inText,
     elements.inLink,
     elements.inSSID,
     elements.inPass,
     elements.inMail
];

function resetInputFields() {
     inputFields.forEach(field => field.value = '');
}

function handleEnterKey(event) {
     if (event.key === 'Enter') {
          genQR({
               bg: elements.bg.value,
               color: elements.color.value
          });
     }
}

function validateEmail() {
     const email = elements.inMail.value;
     const isValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
     document.getElementById("submit").disabled = !isValid;
     document.getElementById("download").disabled = !isValid;
}

function toggleInputVisibility(selectedValue) {
     const inputElements = {
          gen: elements.gen,
          qr: elements.divQR,
          text: elements.inputText,
          link: elements.inputLink,
          wifi: elements.inputWifi,
          mail: elements.inputMail
     };

     Object.values(inputElements).forEach(input => input.classList.add('hidden'));
     if (inputElements[selectedValue]) {
          inputElements[selectedValue].classList.remove('hidden');
          elements.gen.classList.remove('hidden');
     } else {
          console.warn("Invalid selected value. Please choose a valid input type.");
     }
}

function cleanHexColor(color) {
     return color.startsWith("#") ? color.substring(1) : color;
}

function genQR(options = {}) {
     elements.outQR.src = "./src/asset/478.gif";

     const qrOpt = {
          size: options.size || defaultOptions.size,
          bg: cleanHexColor(options.bg || defaultOptions.bg),
          color: cleanHexColor(options.color || defaultOptions.color)
     };

     if (!hexRegex.test(qrOpt.color) || !hexRegex.test(qrOpt.bg)) {
          alert("Invalid hex code format! Please enter a valid hex code (e.g., #FFFFFF, FFFFFF).");
          return;
     }

     const dataMap = {
          text: elements.inText.value,
          link: elements.inLink.value,
          wifi: `WIFI:S:${elements.inSSID.value};T:WPA;P:${elements.inPass.value};;`,
          mail: `mailto:${elements.inMail.value}?subject=Let's%20connect!%26body=Hi!%20I%20would%20like%20connect%20with%20you!%0A%0AMade%20with%20https%3A%2F%2Fqr.kace.dev`
     };

     const inputType = elements.inputOpt.value;
     const data = dataMap[inputType];

     if (data) {
          elements.outQR.src = `https://api.qrserver.com/v1/create-qr-code/?size=${qrOpt.size}&data=${data}&bgcolor=${qrOpt.bg}&color=${qrOpt.color}`;
          elements.divQR.classList.remove('hidden');
     } else {
          console.warn("Invalid input option. Please choose a valid input type.");
     }
}

function dlQR(options = {}) {
     const imageUrl = elements.outQR.src;
     if (imageUrl.includes('api.qrserver.com')) {
          const qrOpt = {
               size: options.size || defaultOptions.size,
               bg: cleanHexColor(options.bg || defaultOptions.bg),
               color: cleanHexColor(options.color || defaultOptions.color)
          };

          fetch(imageUrl)
               .then(response => response.blob())
               .then(blob => {
                    const url = window.URL.createObjectURL(blob);
                    const link = document.createElement("a");
                    link.href = url;

                    const fileNameMap = {
                         text: elements.inText.value,
                         link: elements.inLink.value,
                         wifi: elements.inSSID.value,
                         mail: elements.inMail.value
                    };

                    const inputType = elements.inputOpt.value;
                    const fileName = fileNameMap[inputType];

                    if (fileName) {
                         link.download = `${fileName}_${qrOpt.color}_${qrOpt.bg}.png`;
                         link.click();
                    } else {
                         console.warn('No generated QR code!');
                    }

                    window.URL.revokeObjectURL(url);
               })
               .catch(error => console.error(error));
     } else {
          console.warn('No generated QR code!');
     }
}

function easterEgg() {
     const pill = document.getElementById("pill");
     const logo = document.getElementById("logo");
     logo.src = "./src/asset/favicon-p.png";
     pill.style.backgroundColor = "rgb(249 168 212 / var(--tw-bg-opacity))";
     document.getElementById("submit").style.backgroundColor = "rgb(249 168 212 / var(--tw-bg-opacity))";
     elements.footer.innerHTML = "Made with 🩷";
}

// Event listeners
elements.inputOpt.addEventListener('change', resetInputFields);
elements.inputOpt.addEventListener('change', (event) => toggleInputVisibility(event.target.value));
elements.inMail.addEventListener('keyup', validateEmail);
inputFields.forEach(inputField => inputField.addEventListener('keydown', handleEnterKey));