//get the display element
const inputDisplay = document.getElementById("input_display");
const answerDisplay = document.getElementById("answer_display");
const modeDisplay = document.getElementById("mode_display");

//hold the answer to the previous valid answer
var ans = 0;
//hold the math mode for angle
var angleMode = "Radian";

//this function add a text to the cursor position on the inputDisplay
function addText(str) {
    //get the index for the selection
    var selectStart = inputDisplay.selectionStart;
    //manipulate the string in the input
    var displayStr = inputDisplay.value;
    inputDisplay.value = displayStr.slice(0, selectStart) + str + displayStr.slice(selectStart);
    //foucs and move the cursor to the position
    moveCursor(selectStart + str.length);
}

//this is a helper function to set the cursor to the specified position
function moveCursor(pos) {
    if (inputDisplay.createTextRange) {
        var range = inputDisplay.createTextRange();
        range.move("character", pos);
        range.select();
    } else {
        inputDisplay.focus();
        inputDisplay.setSelectionRange(pos, pos);
    }
}

//this function clear the text in the input display
function clearDisplay() {
    inputDisplay.value = "";
    answerDisplay.innerHTML = "";
}

//this function delete one character in the input display
function deleteDisplay() {
    //get the index for the selection
    var selectStart = inputDisplay.selectionStart;
    if (selectStart != 0) {
        //manipulate the string in the input
        var displayStr = inputDisplay.value;
        inputDisplay.value = displayStr.slice(0, selectStart - 1) + displayStr.slice(selectStart);
        //move the cursor
        moveCursor(--selectStart);
    }
}

//this function move the cursor left or right
//input x: -1 to move left, 1 to move right
function cursorLeftRight(x) {
    //get the index for the selection
    var selectStart = inputDisplay.selectionStart;
    if (x === -1) {
        moveCursor(--selectStart);
    } else if (x === 1) {
        if (++selectStart > inputDisplay.value.length) {
            moveCursor(0);
        } else {
            moveCursor(selectStart);
        }
    }
}

//this is a helper function for log base n
function logn(n, x) {
    return Math.log(x) / Math.log(n);
}
//this is a helper function for sqrtn(n,x) for n√x
function sqrtn(n, x) {
    return x ** (1 / n);
}
//this is a helper function for factorial
function fact(x) {
    if (!Number.isInteger(x)) {
        throw "Math Error";
    }
    if (x <= 0) {
        return 1;
    } else {
        return x * fact(x - 1);
    }
}
//this is a helper function for permutation
function P(n, r) {
    return fact(n) / fact(n - r);
}
//this is a helper function for combination
function C(n, r) {
    return fact(n) / (fact(n - r) * fact(r));
}

//this function change the mode to radian 
function radianMode() {
    angleMode = "Radian";
    modeDisplay.innerHTML = angleMode;
}
//this function change the mode to angle
function degreeMode() {
    angleMode = "Degree";
    modeDisplay.innerHTML = angleMode;
}

//this function convert degree to radian
function toRadian(degree) {
    return degree * (Math.PI / 180);
}
//this functio convert radian to degree
function toDegree(radian) {
    return radian * (180 / Math.PI);
}

//the following function are for trignometry
function sin(x) {
    if (angleMode == "Degree") {
        x = toRadian(x); //convert to Radian if expressed in degree
    }
    return Math.sin(x);
}

function cos(x) {
    if (angleMode == "Degree") {
        x = toRadian(x);
    }
    return Math.cos(x);
}

function tan(x) {
    if (angleMode == "Degree") {
        x = toRadian(x);
    }
    return Math.tan(x);
}

function asin(x) {
    y = Math.asin(x);
    if (angleMode == "Degree") {
        y = toDegree(y);
    }
    return y;
}

function acos(x) {
    y = Math.acos(x);
    if (angleMode == "Degree") {
        y = toDegree(y);
    }
    return y;
}

function atan(x) {
    y = Math.atan(x);
    if (angleMode == "Degree") {
        y = toDegree(y);
    }
    return y;
}

function sinh(x) {
    return Math.sinh(x);
}

function cosh(x) {
    return Math.cosh(x);
}

function tanh(x) {
    return Math.tanh(x);
}


//this dictionary hold the convertion for javascript code
var mathDict = {
    "e": "Math.E",
    "π": "Math.PI",
    "×": "*",
    "÷": "/",
    "^": "**",
    "abs(": "Math.abs(",
    "log(": "Math.log10(",
    "ln(": "Math.log(",
    "asinh(": "Math.asinh(",
    "acosh(": "Math.acosh(",
    "atanh(": "Math.atanh(",
    "√(": "Math.sqrt("
};

//this function calculate the expression in input display and show the result in the answer display
function equal() {
    //get the raw math expression
    var mathExpression = inputDisplay.value.toString();
    //convert it into javascript code
    mathExpression = mathExpression.split("Ans").join(ans.toString()); //replace Ans to previos evaluated answer
    for (var key in mathDict) {
        mathExpression = mathExpression.split(key).join(mathDict[key]);
    }
    console.log(mathExpression);
    var mathAnswer = 0; //hold the evaluation of the math expression
    try {
        mathAnswer = eval(mathExpression);
        answerDisplay.innerHTML = mathAnswer; //show the answer
        ans = mathAnswer; //store the valid answer
    } catch (err) {
        answerDisplay.innerHTML = "Syntax Error"; //show the syntax error
    }
}