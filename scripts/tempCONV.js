//get the input elements
const tempInput = document.getElementById("input_temp");
const tempSelect = document.getElementById("select_temp");
const convertButton = document.getElementById("button_convert");

//get the output display elements
const celsiusDisplay = document.getElementById("celsius_display");
const fahrenheitDisplay = document.getElementById("fahrenheit_display");
const kelvinDisplay = document.getElementById("kelvin_display");

//this class hold the temperature in kelvin
class Temperature {
    //initialize the temperature to absolute 0
    constructor() {
        this.temp = 0;
    }

    //this method set the temp by converting x to kelvin
    //there are three type:
    //0 - Celsius
    //1 - Fahrenheit
    //2 - Kelvin
    setTemp(x, type) {
        switch (type) {
            case 0: //convert C to K
                var ans = x + 273.15;
                //check for invalid temperature
                if (ans >= 0) {
                    this.temp = ans;
                } else {
                    throw "Invalid Temperature!"
                }
                break;
            case 1: //convert F to K
                var ans = (x - 32) * (5 / 9) + 273.15;
                //check for invalid temperature
                if (ans >= 0) {
                    this.temp = ans;
                } else {
                    throw "Invalid Temperature!";
                }
                break;
            case 2: //store K directly
                //check for invalid temperature
                if (x >= 0) {
                    this.temp = x;
                } else {
                    throw "Invalid Temperature!";
                }
                break;
        }
    }

    //this method allows the user to get the stored temp with following type
    //0 - Celsius
    //1 - Fahrenheit
    //2 - Kelvin
    getTemp(type) {
        switch (type) {
            case 0: //convert K to C
                return this.temp - 273.15;
            case 1: //convert K to F
                return (this.temp - 273.15) * (9 / 5) + 32;
            case 2: //return K directly
                return this.temp;
        }
    }
}

//instantiate the temperature object
var temperature = new Temperature();

//this function deal with the button input
function convertTemp() {
    try {
        //get user inputs
        var userInput = eval(tempInput.value);
        //set the temperature
        temperature.setTemp(userInput, tempSelect.selectedIndex);
        //display to the temperature
        celsiusDisplay.innerHTML = temperature.getTemp(0);
        fahrenheitDisplay.innerHTML = temperature.getTemp(1);
        kelvinDisplay.innerHTML = temperature.getTemp(2);
    } catch (err) {
        alert("Please enter a valid temperature!");
    }

}
//add the event listener
convertButton.addEventListener("click", convertTemp);