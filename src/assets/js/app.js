import { randomHKID, isHKID, processHKID, calculateCheckDigit } from '@js/hkid';
import $ from 'jquery';
import 'fullpage.js/dist/jquery.fullpage.min';
import ClipboardJS from 'clipboard';

window.dataLayer = window.dataLayer || [];

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
  $('#hkid').on('keyup blur', function validateInput() {
    const str = $(this).val();
    let msg = '';
    if (str.length > 7) {
      if (isHKID(str)) { // Yes!!!
        msg = 'This is a correct HKID.';

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
          msg = `The correct check digit should be ${calculateCheckDigit(splitHKID[1], splitHKID[2])}.`;

          // GTM event tracking
          if (typeof dataLayer !== 'undefined') {
            window.dataLayer.push({
              event: 'validateHKIDFail',
              userInput: str
            });
          }
        } else { // For length > 7 but not in HKID format
          msg = 'This is not a correct HKID format.';
        }
      }

      // Show me the answer
      $('.validationResult').text(msg);
    } else {
      // More info needed
      $('.validationResult').text('');
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
