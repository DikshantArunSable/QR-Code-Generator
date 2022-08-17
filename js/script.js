const form = document.getElementById('generate-form');
const qr = document.getElementById('qrcode');

// Button submit
const onGenerateSubmit = (e) => {
  e.preventDefault();

  clearUI();

  const url = document.getElementById('url').value;
  const size = document.getElementById('size').value;
  const cDark = document.getElementById('color-dark').value;
  const cLight = document.getElementById('color-light').value;
  const fileName = document.getElementById('filename').value;

  // Validate url
  if (url === '') {
    alert('Please enter a URL');
  } else {
    showSpinner();
    // Show spinner for 1 sec
    setTimeout(() => {
      hideSpinner();
      generateQRCode(url, size, cDark, cLight);

      // Generate the save button after the qr code image src is ready
      setTimeout(() => {
        // Get save url
        const saveUrl = qr.querySelector('img').src;
        // Create save button
        createSaveBtn(saveUrl, fileName);
      }, 50);
    }, 1000);
  }
};


// Generate QR code
const generateQRCode = (url, size, colorDark, colorLight) => {
  return (qrcode = new QRCode('qrcode', {
    text: url,
    width: size,
    height: size,
    colorDark: colorDark,
    colorLight: colorLight,
  }));
};

// Clear QR code and save button
const clearUI = () => {
  qr.innerHTML = '';
  const saveBtn = document.getElementById('save-link');
  if (saveBtn) {
    saveBtn.remove();
  }
};

// Show spinner
const showSpinner = () => {
  const spinner = document.getElementById('spinner');
  spinner.style.display = 'block';
};

// Hide spinner
const hideSpinner = () => {
  const spinner = document.getElementById('spinner');
  spinner.style.display = 'none';
};

// Create save button to download QR code as image
const createSaveBtn = (saveUrl, fileName) => {
  //filename validation
  if (fileName === '') {
    fileName = 'qrcode';
  }

  const link = document.createElement('a');
  link.id = 'save-link';
  link.classList =
    'bg-cyan-500 hover:bg-blue-700 text-white font-bold py-2 rounded w-1/3 m-auto my-5';
  link.href = saveUrl;
  link.download = fileName;
  link.innerHTML = 'Save Image';
  document.getElementById('generated').appendChild(link);
};

hideSpinner();

form.addEventListener('submit', onGenerateSubmit);
