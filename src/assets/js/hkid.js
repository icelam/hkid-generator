/*
 * Generate random integer between specific range
 * @param {number}  min - Minimum value
 * @param {number}  max - Maximum value
 * @return  {number}
 */
const getRandomInt = (min, max) => Math.floor(Math.random() * (max - min + 1)) + min;

/*
 * Check if HKID contains 1 or 2 alphabet, 6 number and 1 check digit and return them in 4 parts: [full hkid, char, num, check digit]
 * @param {string}  str - Full HKID number
 * @return  {boolean}
 */
const processHKID = (str) => {
  // Check if HKID contains 1 or 2 alphabet, 6 number and 1 check digit
  const hkidRegex = new RegExp(/^([a-zA-Z]{1,2})([0-9]{6})([aA0-9])$/);
  return str.toUpperCase().match(hkidRegex);
};

/*
 * Calculate check digit
 * @param {string}  charPart - Alphabet in HKID
 * @param {string}  numPart - First 6 numerber in HKID
 * @return  {(number|string)}
 */
const calculateCheckDigit = (charPart, numPart) => {
  // Maximum alphabet should be 2
  if (charPart.length > 3) {
    return false;
  }

  // 6 number for a valid HKID
  if (numPart.length !== 6) {
    return false;
  }

  // Calculate checksum for character part
  const strValidChars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
  let checkSum = 0;
  if (charPart.length === 2) {
    checkSum += 9 * (10 + strValidChars.indexOf(charPart.charAt(0)));
    checkSum += 8 * (10 + strValidChars.indexOf(charPart.charAt(1)));
  } else {
    checkSum += 9 * 36;
    checkSum += 8 * (10 + strValidChars.indexOf(charPart));
  }

  // Calculate checksum for numeric part
  for (let i = 0, j = 7; i < numPart.length; i++, j--) {
    checkSum += j * numPart.charAt(i);
  }

  // Verify the check digit
  const remaining = checkSum % 11;
  const verify = remaining === 0 ? 0 : (11 - remaining === 10 ? 'A' : 11 - remaining);

  return verify;
};

/*
 * Generate random HKID
 * @return  {string}
 */
const randomHKID = () => {
  // Generate a random number between 1 - 10
  const hkidMode = getRandomInt(1, 10);

  // Generate A - Z from ASCII code 65 - 90
  let randomAlphabet = String.fromCharCode(getRandomInt(65, 90));
  if (hkidMode === 10) {
    randomAlphabet += String.fromCharCode(getRandomInt(65, 90));
  }

  // Generate 6 Number
  let randomNumber = '';
  for (let i = 0; i < 6; i++) {
    randomNumber += String(getRandomInt(0, 9));
  }

  // Calculate check digit
  const checkdigit = calculateCheckDigit(randomAlphabet, randomNumber);

  // Debug Message
  if (window.console) {
    // console.log("HKID Mode: " + hkidMode);
    console.log(`Generating HKID...\n\nAlphabet: \t\t${randomAlphabet}\nNumber: \t\t${randomNumber}\nResult: \t\t${checkdigit}`);
  }

  return randomAlphabet + randomNumber + checkdigit;
};

/*
 * Check string is valid hkid
 * @param {string}  str - Full HKID number
 * @return  {boolean}
 */
const isHKID = (str) => {
  // Empty HKID
  if (!str) {
    return false;
  }

  // HKID length must be 8 or 9
  if (str.length < 8 || str.length > 9) {
    return false;
  }

  // Remove brackets and convert HKID to uppercase
  const uppercaseStr = str.replace(/[\(\)]/g, '').toUpperCase();

  // Check if HKID contains 1 or 2 alphabet, 6 number and 1 check digit
  // const hkidRegex = new RegExp(/^([a-zA-Z]{1,2})([0-9]{6})([aA0-9])$/);
  const matchArray = processHKID(uppercaseStr);

  // Return if doesn't match with regex
  if (!matchArray) {
    return false;
  }

  // Calculate check digit
  const verify = calculateCheckDigit(matchArray[1], matchArray[2]);

  // Debug Message
  if (window.console) {
    console.log(`Valid check digit: \t${verify}`);
  }

  console.log(typeof verify);
  console.log(typeof matchArray[3]);

  return verify == matchArray[3];
};

export { randomHKID, isHKID, processHKID, calculateCheckDigit };
