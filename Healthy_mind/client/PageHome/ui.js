
const doctorsNamesDropdownSuggestionsDiv = document.getElementById("doctors-names-dropdown-suggestions-div")
const doctorsNamesList = document.getElementById("doctors-names-list")
const doctorsNamesDropdownButton = document.getElementById("doctors-names-dropdown-button")
const doctorsNamesSearchBoxInput = document.getElementById("doctors-names-searchBox-input")

doctorsNamesSearchBoxInput.addEventListener("input", function () {
  let filter = this.value.toLowerCase();
  let doctorsNamesList = document.getElementById("doctors-names-list");
  let doctors = doctorsNamesList.getElementsByTagName("li");

  for (let i = 0; i < doctors.length; i++) {
    let doctorName = doctors[i].textContent || doctors[i].innerText;
    if (doctorName.toLowerCase().indexOf(filter) > -1) {
      doctors[i].style.display = "";
    } else {
      doctors[i].style.display = "none";
    }
  }
});

doctorsNamesList.addEventListener("click", function (e) {
  if (e.target && e.target.nodeName == "LI") {
    document.getElementById("doctors-names-dropdown-button").textContent =
      e.target.textContent;
      doctorsNamesDropdownSuggestionsDiv.style.display = "none";
  }
});

doctorsNamesDropdownButton.addEventListener("click", function () {
    if (doctorsNamesDropdownSuggestionsDiv.style.display === "block") {
      doctorsNamesDropdownSuggestionsDiv.style.display = "none";
    } else {
      doctorsNamesDropdownSuggestionsDiv.style.display = "block";
    }
  });

document.addEventListener("click", function (e) {
  if (!document.getElementById("doctors-names-dropdown-main-div").contains(e.target)) {
    doctorsNamesDropdownSuggestionsDiv.style.display = "none";
  }
});
