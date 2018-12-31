/*
 * Generate random HKID
 * @return	{string}
 */
var randomHKID = function() {
	// Generate a random number between 1 - 10
	var hkidMode = getRandomInt(1, 10);
	
	// Generate A - Z from ASCII code 65 - 90
	var randomAlphabet = String.fromCharCode(getRandomInt(65, 90));
	if(hkidMode == 10) {
		randomAlphabet += String.fromCharCode(getRandomInt(65, 90));
	}
	
	// Generate 6 Number
	var randomNumber = '';
	for(var i = 0; i < 6; i++) {
		randomNumber += String(getRandomInt(0, 9));
	}
	
	// Calculate check digit
	var checkdigit = calculateCheckDigit(randomAlphabet, randomNumber);
	
	// Debug Message
	if(window.console) {
		//console.log("HKID Mode: " + hkidMode);
		console.log("Generating HKID...\n\nAlphabet: \t\t" + randomAlphabet + "\nNumber: \t\t" + randomNumber  + "\nResult: \t\t" + checkdigit);
	}
	
	return randomAlphabet + randomNumber + checkdigit;
}

/*
 * Check if HKID contains 1 or 2 alphabet, 6 number and 1 check digit and return them in 4 parts: [full hkid, char, num, check digit]
 * @param	{string}	str - Full HKID number
 * @return	{boolean}
 */
var processHKID = function(str) {
	// Check if HKID contains 1 or 2 alphabet, 6 number and 1 check digit
	var hkidRegex = new RegExp(/^([a-zA-Z]{1,2})([0-9]{6})([aA0-9])$/);
	return str.toUpperCase().match(hkidRegex);
}

/*
 * Generate random integer between specific range
 * @param	{number}	min - Minimum value
 * @param	{number}	max - Maximum value
 * @return	{number}
 */
var getRandomInt = function(min, max) {
	return Math.floor(Math.random() * (max - min + 1)) + min;
}

/*
 * Check string is valid hkid
 * @param	{string}	str - Full HKID number
 * @return	{boolean}
 */
var isHKID = function(str) {
	// Empty HKID
	if (!str) {
		return false;
	}

	// Remove brackets and convert HKID to uppercase
	str = str.replace(/[\(\)]/g, '').toUpperCase();

	// HKID length must be 8 or 9
	if (str.length < 8 || str.length > 9) {
		return false;
	}
	
	// Check if HKID contains 1 or 2 alphabet, 6 number and 1 check digit
	var hkidRegex = new RegExp(/^([a-zA-Z]{1,2})([0-9]{6})([aA0-9])$/);
	var matchArray = processHKID(str);
	
	// Return if doesn't match with regex
	if (!matchArray) {
		return false;
	}

	//Calculate check digit
	var verify = calculateCheckDigit(matchArray[1], matchArray[2])
	
	// Debug Message
	if(window.console) {
		console.log("Valid check digit: \t" + verify);
	}
	
	return verify == matchArray[3];
};

/*
 * Calculate check digit
 * @param	{string}	charPart - Alphabet in HKID
 * @param	{string}	numPart - First 6 numerber in HKID
 * @return	{(number|string)}
 */
var calculateCheckDigit = function(charPart, numPart) {
	// Maximum alphabet should be 2
	if (charPart.length > 3) {
		return false;
	}
	
	// 6 number for a valid HKID
	if (numPart.length != 6) {
		return false;
	}
	
	// Calculate checksum for character part
	var strValidChars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
	var checkSum = 0;
	if (charPart.length == 2) {
		checkSum += 9 * (10 + strValidChars.indexOf(charPart.charAt(0)));
		checkSum += 8 * (10 + strValidChars.indexOf(charPart.charAt(1)));
	} else {
		checkSum += 9 * 36;
		checkSum += 8 * (10 + strValidChars.indexOf(charPart));
	}

	// Calculate checksum for numeric part
	for (var i = 0, j = 7; i < numPart.length; i++, j--) {
		checkSum += j * numPart.charAt(i);
	}

	// Verify the check digit
	var remaining = checkSum % 11;
	var verify = remaining == 0 ? 0 : (11 - remaining == 10 ? "A" : 11 - remaining);
	
	return verify;
}