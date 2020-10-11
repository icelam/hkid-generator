import { randomHKID, isHKID, processHKID, calculateCheckDigit } from '@js/hkid';
import $ from 'jquery';
import 'fullpage.js/dist/jquery.fullpage.min';
import ClipboardJS from 'clipboard';

window.dataLayer = window.dataLayer || [];

let validationDebounce = null;

// print HKID
const printHKID = () => {
  const generatedHKID = randomHKID();
  document.getElementById('randomHKID').innerHTML = generatedHKID;

  // GTM event tracking
  if (typeof dataLayer !== 'undefined') {
    window.dataLayer.push({
      event: 'generateHKID',
      generatedHKID
    });
  }
};

// validate input
const validateInput = (str) => {
  let message = '';
  if (!str) {
    message = '';
  } else if (isHKID(str)) { // Yes!!!
    message = 'This is a correct HKID.';

    // GTM event tracking
    if (typeof dataLayer !== 'undefined') {
      window.dataLayer.push({
        event: 'validateHKIDPass',
        userInput: str
      });
    }
  } else { // No...
    const splitHKID = processHKID(str); // For calculating check digit
    if (splitHKID) {
      message = `The correct check digit should be ${calculateCheckDigit(splitHKID[1], splitHKID[2])}.`;

      // GTM event tracking
      if (typeof dataLayer !== 'undefined') {
        window.dataLayer.push({
          event: 'validateHKIDFail',
          userInput: str
        });
      }
    } else { // For length > 7 but not in HKID format
      message = 'This is not a correct HKID format.';
    }
  }

  // Show me the answer
  $('.validationResult').text(message);
};

$(() => {
  // jquery.fullpage
  $('#fullpage').fullpage({
    anchors: ['generate', 'validate'],
    menu: '#menu',
    css3: false
  });

  // Give me a random HKID first!!
  printHKID();

  // Copy to Clipboard
  const clipboard = new ClipboardJS('#randomHKID');
  clipboard.on('success', (event) => {
    event.clearSelection();
    $('#copiedMessage')
      .stop()
      .fadeIn('fast')
      .delay(500)
      .fadeOut('fast');
  });

  // Show me the page when ready
  $('#fullpage').fadeIn();

  $('#generateBtn').on('click', printHKID);

  // Check HKID on keyboard release and input blur
  // Debounce when input length is not empty and length is less than 7
  $('#hkid').on('keyup blur', (event) => {
    const str = event.target.value;
    clearTimeout(validationDebounce);
    if (!str || str.length > 7) {
      validateInput(str);
    } else {
      validationDebounce = setTimeout(() => {
        validateInput(str);
      }, 500);
    }
  });
});

// Register service worker
if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('./service-worker.js').then((registration) => {
      console.log('SW registered: ', registration);
    }).catch((registrationError) => {
      console.error('SW registration failed: ', registrationError);
    });
  });
}
