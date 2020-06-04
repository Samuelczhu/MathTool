//find all the input elements
const inputNumber = document.getElementById("input_number");
const selectType = document.getElementById("select_type");
const buttonConvert = document.getElementById("button_convert");
//find all the output elements
const decimalDisplay = document.getElementById("decimal_display");
const binaryDisplay = document.getElementById("binary_display");
const complementDisplay = document.getElementById("complement_display");
const octalDisplay = document.getElementById("octal_display");
const hexDisplay = document.getElementById("hex_display");

//this function allows to replace a char at a specified index of a string
String.prototype.replaceAt = function(index, replacement) {
    return this.substr(0, index) + replacement + this.substr(index + replacement.length);
}

//this number class is in decimal
class NumberDec {
    //set the number to 0 when created
    constructor() {
        this.number = 0;
    }

    //this method set the number (str) with type:
    //0 - Decimal
    //1 - Binary
    //2 - 2's complement
    //3 - Octal
    //4 - Hexadecimal
    setNumber(numberStr, type) {
        switch (type) {
            case 0:
                this.number = eval(numberStr);
                break;
            case 1: //convert binary to decimal
                //check for invalid number
                for (var i = 0; i < numberStr.length; i++) {
                    if (!("-01").includes(numberStr.charAt(i))) {
                        throw "Please enter a valid number!";
                    }
                }
                this.number = parseInt(numberStr, 2);
                break;
            case 2: //convert 2's complement to decimal
                this.number = 0;
                for (var i = 0; i < numberStr.length; i++) {
                    if (!("01").includes(numberStr.charAt(i))) { //check for invalid number
                        throw "Please enter a valid number!";
                    }
                    this.number += (eval(numberStr.charAt(i)) * 2) ** (numberStr.length - 1 - i);
                    if (i == 0) {
                        this.number = -this.number;
                    }
                }
                break;
            case 3: //convert octal to decimal
                //check for invalid number
                for (var i = 0; i < numberStr.length; i++) {
                    if (!("-01234567").includes(numberStr.charAt(i))) {
                        throw "Please enter a valid number!";
                    }
                }
                this.number = parseInt(numberStr, 8);
                break;
            case 4: //convert hex to decimal
                //check for invalid number
                for (var i = 0; i < numberStr.length; i++) {
                    if (!("-0123456789abcdef").includes(numberStr.charAt(i))) {
                        throw "Please enter a valid number!";
                    }
                }
                this.number = parseInt(numberStr, 16);
                break;
        }
    }

    //this function return the different number type representation for the number:
    //0 - Decimal
    //1 - Binary
    //2 - 2's complement
    //3 - Octal
    //4 - Hexadecimal
    getNumber(type) {
        switch (type) {
            case 0: //convert decimal to decimal
                return this.number.toString();
            case 1: //convert decimal to binary
                return this.number.toString(2);
            case 2: //convert decimal to 2's Complement
                if (this.number >= 0) {
                    return "0" + this.number.toString(2);
                } else {
                    //get the binary representation for the positive number
                    var ansStr = Math.abs(this.number).toString(2);
                    //hold the original length for the string
                    var originalLength = ansStr.length;
                    //invert every digit
                    for (var i = 0; i < ansStr.length; i++) {
                        if (ansStr.charAt(i) == "0") {
                            ansStr = ansStr.replaceAt(i, "1");
                        } else {
                            ansStr = ansStr.replaceAt(i, "0");
                        }
                    }
                    //increment 1
                    var ansVal = parseInt(ansStr, 2) + 1;
                    //convert back to binary
                    ansStr = ansVal.toString(2);
                    //making sure the string is original size with zero extended
                    var l = ansStr.length;
                    for (var i = 0; i < originalLength - l; i++) {
                        ansStr = "0" + ansStr;
                    }
                    //return the answer with sign extended
                    return "1" + ansStr;
                }
            case 3: //convert decimal to octal
                return this.number.toString(8);
            case 4: //convert decimal to hex
                return this.number.toString(16);
        }
    }
}

//create the number object
var number = new NumberDec();

//this function convert and display the number
function convertNumber() {
    //get the input number
    var numStr = inputNumber.value;
    //set the number
    try {
        number.setNumber(numStr, selectType.selectedIndex);
        //display the number
        decimalDisplay.innerHTML = number.getNumber(0);
        binaryDisplay.innerHTML = number.getNumber(1);
        complementDisplay.innerHTML = number.getNumber(2);
        octalDisplay.innerHTML = number.getNumber(3);
        hexDisplay.innerHTML = number.getNumber(4);
    } catch (err) {
        alert("please enter a valid number!");
    }
}
buttonConvert.addEventListener("click", convertNumber);