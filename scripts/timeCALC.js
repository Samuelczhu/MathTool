//find all the input elements
const startHour = document.getElementById("start_hour");
const startMin = document.getElementById("start_min");
const endHour = document.getElementById("end_hour");
const endMin = document.getElementById("end_min");
const deductedHour = document.getElementById("deducted_hour");
const calculateButton = document.getElementById("button_calculate");

//find the display element
const answerDisplay = document.getElementById("answer_display");

//this class model a time with hour and minute
class Time {
    //reset the time when created
    constructor() {
        this.hour = 0;
        this.minute = 0;
    }

    //set the time
    setTime(hour, minute) {
        //prevent invalid time
        if ((Number.isInteger(hour) && hour >= 0) && (Number.isInteger(minute) && minute >= 0 && minute < 60)) {
            this.hour = hour;
            this.minute = minute;
        } else {
            throw "Invalid Time!";
        }
    }

    //get the time in hour
    getTime() {
        return this.hour + (this.minute / 60)
    }
}

//instantiate the start and end time objects
var startTime = new Time();
var endTime = new Time();

//this function deal with the calculate button click
function calculateTime() {
    try {
        //get the inputs
        startTime.setTime(parseInt(startHour.value), parseInt(startMin.value));
        endTime.setTime(parseInt(endHour.value), parseInt(endMin.value));
        var deductedH = deductedHour.value;
        var ans = endTime.getTime() - startTime.getTime() - deductedH;
        answerDisplay.innerHTML = ans;
    } catch (err) {
        alert("Please enter valid times!");
    }
}
//add the event listener 
calculateButton.addEventListener("click", calculateTime);