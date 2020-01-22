

const resultingPass = document.getElementById('password');
const createBtn = document.getElementById('create');
const copyClipboard = document.getElementById('copy');
const lengthPass = document.getElementById('length');
const upperCheck = document.getElementById('uppercaseChar');
const lowerCheck = document.getElementById('lowercaseChar');
const numCheck = document.getElementById('numbers');
const symbolCheck = document.getElementById('symbolChar');

const randomFunction = {
    lower: getLowerCaseChar,
    upper: getUpperCaseChar,
    number: getRandNumber,
    symbol: getRandSymbol
};

// creates event listener for create button
createBtn.addEventListener('click', () => {

    const length = +lengthPass.value;
    const hasLower = lowerCheck.checked;
    const hasUpper = upperCheck.checked;
    const hasNum = numCheck.checked;
    const hasSymbol = symbolCheck.checked;
    
    resultingPass.innerText = createPassword(hasLower, hasUpper, hasNum, hasSymbol, length);
    //console.log(hasLower, hasUpper, hasNum, hasSymbol, length);
});

//create password function
function createPassword (lower, upper, number, symbol, length){

    // 1. init password variable
    // 2. filter unchecked parameters
    // 3. loop length of password and call function for each type
    // 4. add password variable to the resulting span

    var createdPassword = '';

    const count = lower + upper + number + symbol;
    //console.log('count: ', count);

    const typeArray = [ { lower }, { upper }, { number }, { symbol }].filter(
        item => Object.values(item)[0]
    );
    console.log(typeArray)

    if(count === 0){
        return '';
    }

    for(var i = 0; i < length; i += count){

        typeArray.forEach(type =>{
            const functionName = Object.keys(type)[0];
            // console.log('funcName = ' , functionName);
            createdPassword += randomFunction[functionName]();
        });
    }

    const finalPass = createdPassword.slice(0, length);

    return finalPass;
}

// copy to clipboard function
copyClipboard.addEventListener('click', () => {
    
    const textArea = document.createElement('textarea');
    const pass = resultingPass.innerText;

    if(!pass){
        return;
    } 

    textArea.value = pass;
    document.body.appendChild(textArea);
    textArea.select();
    document.execCommand('copy');
    textArea.remove();
    alert('Password Copied');
})

// parameter functions
//get random lower Case letter
function getLowerCaseChar() {
    var letter = Math.floor(Math.random() * 26) + 97;
    return String.fromCharCode(letter)
}

//get random upper case letter
function getUpperCaseChar() {
    var letter = Math.floor(Math.random() * 26) + 65;
    return String.fromCharCode(letter)
}

//get random number
function getRandNumber() {
    var num = Math.floor(Math.random() * 10) + 48;
    return +String.fromCharCode(num)
}

//get random symbol
function getRandSymbol() {
    const symbols = '!@#$%^&*(){}[]=<>/,.';
    return symbols[Math.floor(Math.random() * symbols.length)];
}





