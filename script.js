// the variables below are DOM elements. getelementID is getting user input via checkbox, 
//and the number entered in length.
const resultEl = document.getElementById('result');
const lengthEl = document.getElementById('length');
const lowercaseEl = document.getElementById('lowercase');
const uppercaseEl = document.getElementById('uppercase');
const numbersEl = document.getElementById('numbers');
const symbolsEl = document.getElementById('symbols');
const generateEl = document.getElementById('generate');

//here we have keys calling our functions that generate and return characters (lines 55-75)
const randomFunc = {
  lower: getRandomLower,
  upper: getRandomUpper,
  number: getRandomNumber,
  symbol: getRandomSymbol
};
// here is our generate function that is now an event that will run the function when clicked that will store
//the value of our DOM elements (length entered, and checkboxes checked)
generate.addEventListener('click', () => {
 
  const hasLower = lowercaseEl.checked;
  const hasUpper = uppercaseEl.checked;
  const hasNumber = numbersEl.checked;
  const hasSymbol = symbolsEl.checked;
  const length = +lengthEl.value;

//this function displays our generated password into the result element which then allows user to view password on screen.
  resultEl.innerText = generatePassword(
    hasLower,
    hasUpper,
    hasNumber,
    hasSymbol,
    length);
});

//generates the password function.
function generatePassword(lower, upper, number, symbol, length) {
  let generatedPassword = '';
// this variable counts the different boxes that were checked from our DOM elements.
  const typesCount = upper + lower + number + symbol;
// this is a function that has an array of our DOM elements value.  the .filter is going to filter out the DOM elements that are false.
  const typesArr = [{ upper }, { lower }, { number }, { symbol }].filter
    (item => Object.values(item)[0]);
//statement below is making sure that if you dont check any boxes, you will get nothing as a result(line 43)
  if (typesCount === 0) {
    return '';
  }
//this loop is looping through our boxes to see which ones are checked.   
  for (let i = 0; i < length; i += typesCount)
    typesArr.forEach(type => {
      const funcName = Object.keys(type)[0];
      generatedPassword += randomFunc[funcName]();
    });
//returns our end result
  const finalPassword = generatedPassword.slice(0, length);
  return finalPassword;
}
// functions that generate characters 
//this function generates a lowercase letter
function getRandomLower() {
  return String.fromCharCode(Math.floor(Math.random() * 26) + 97);
}

//this function generates an uppercase letter 
function getRandomUpper() {
  return String.fromCharCode(Math.floor(Math.random() * 26) + 65);
}

//this function generates a Number 
function getRandomNumber() {
  return String.fromCharCode(Math.floor(Math.random() * 10) + 48);
}

//this function generates a Symbol
function getRandomSymbol() {
  const symbols = "!@#$%^&*()?{}";
  return symbols[Math.floor(Math.random() * symbols.length)];
}