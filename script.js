let runningTotal = 0;
let buffer = "0";
let previousOperator;


const screen = document.querySelector('.screen');

function buttonClick(value){
    /**
     * This function will evaluate what happens
     * whenever a button is clicked. If the value
     * in the button is not a number, then it will
     * execurte the handleSymbol function, while
     * if it is a number, it will execute the 
     * handleNumber function. Both are referenced
     * bellow.
     */
    if(isNaN(value)){
        handleSymbol(value);
    }
    else{
        handleNumber(value);
    }
    screen.innerText = buffer;
}


function handleSymbol(symbol){
    //In case the symbol is 'C', it will return the
    //running total back to 0
    switch(symbol){
        case 'C':
            buffer = '0';
            runningTotal = 0;
            break;
    //If the button pressed is '=', it must return the value.
    //After showing the value, the previous operator and the running
    //total will be back at 0 again for the next operation.
        case '=':
            if(previousOperator === null) {
                return
            }
            flushOperation(parseInt(buffer));
            previousOperator = null;
            buffer = runningTotal;
            runningTotal = 0;
            break;
        case '←':
            if(buffer.length === 1){
                buffer = '0';
            }else{
                //substring removes the items in the string
                //in the opposite order in which they were
                //added.
                buffer = buffer.substring(0, buffer.length - 1);
            }
            break;
        case '+':
            //note that we had to copy the exact same value for minus 
            //from the website, since there was a bug in which the regular
            //'-' sign wasn't recognized as the same in the flushOperation
            //function.
        case '−':
        case '×':
        case '÷':
            handleMath(symbol);
            break;
    }
}

function handleMath(symbol){
    if(buffer === '0'){
        return;
    }

    const intBuffer = parseInt(buffer);

    if(runningTotal === 0){
        runningTotal = intBuffer;
    }else{
        flushOperation(intBuffer);
    }

    previousOperator = symbol,
    buffer = '0'
}

function flushOperation(intBuffer){
    if(previousOperator === '+') {
        runningTotal += intBuffer;
    }else if(previousOperator === '−'){
        runningTotal -= intBuffer;
    }else if(previousOperator === '×'){
        runningTotal *= intBuffer;
    }else if(previousOperator === "÷"){
        runningTotal /= intBuffer;
    }
}


function handleNumber(numberString) {
    if(buffer === '0'){
        buffer = numberString;
    }else{
        buffer += numberString;
    }
}


function init(){
    document.querySelector('.calc-buttons').addEventListener('click', function(event){
        buttonClick(event.target.innerText);
    })
}

init();