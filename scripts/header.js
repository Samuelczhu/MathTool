//this script deal with the header responsive design for mobile
const dropdownButton = document.getElementById("dropdown"); //get the drop down button
const header_ul = dropdownButton.parentElement; //get the parent element

//this function change the class for the header_ul when the drop down button is clicked
function dropdownClicked() {
    header_ul.className = (header_ul.className === "mobile") ? ("") : ("mobile");
}
dropdownButton.addEventListener("click", dropdownClicked);