const doctorsNamesDropdownSuggestionsDiv = document.getElementById(
  "doctors-names-dropdown-suggestions-div"
);
const doctorsNamesList = document.getElementById("doctors-names-list");
const doctorsNamesDropdownButton = document.getElementById(
  "doctors-names-dropdown-button"
);
const doctorsNamesSearchBoxInput = document.getElementById(
  "doctors-names-searchBox-input"
);
const doctorsNamesDropdownMainDiv = document.getElementById(
  "doctors-names-dropdown-main-div"
);

const specialtiesDropdownSuggestionsDiv = document.getElementById(
  "specialties-dropdown-suggestions-div"
);
const specialtiesList = document.getElementById("doctors-specialties-list");
const specialtiesDropdownButton = document.getElementById(
  "specialties-dropdown-button"
);
const specialtiesSearchBoxInput = document.getElementById(
  "specialties-searchBox-input"
);
const specialtiesDropdownMainDiv = document.getElementById(
  "specialties-dropdown-main-div"
);

// START OF DOCTORS NAMES DROPDOWN BUTTON

// By ori, this is the function that is called when the user enters a character in the search box.
doctorsNamesSearchBoxInput.addEventListener("input", function () {
  let filter = this.value.toLowerCase();
  let doctors = doctorsNamesList.getElementsByTagName("li");

  for (let i = 0; i < doctors.length; i++) {
    let doctorName = doctors[i].textContent;
    if (doctorName.toLowerCase().indexOf(filter) > -1) {
      doctors[i].style.display = "";
    } else {
      doctors[i].style.display = "none";
    }
  }
});

// By ori, this is the function that is called when the user clicks on a doctor name in the list.
doctorsNamesList.addEventListener("click", function (e) {
  if (e.target && e.target.nodeName == "LI") {
    doctorsNamesDropdownButton.textContent = e.target.outerText;
    doctorsNamesDropdownSuggestionsDiv.style.display = "none";
  }
});

// By ori, this is the function that is called when the user clicks on the dropdown button.
doctorsNamesDropdownButton.addEventListener("click", function () {
  if (doctorsNamesDropdownSuggestionsDiv.style.display === "block") {
    doctorsNamesDropdownSuggestionsDiv.style.display = "none";
  } else {
    doctorsNamesDropdownSuggestionsDiv.style.display = "block";
  }
});

// END OF DOCTORS DROPDOWN BUTTON

// START OF SPECIALTIES DROPDOWN BUTTON

// This is the function that is called when the user enters a character in the search box.
specialtiesSearchBoxInput.addEventListener("input", function () {
  let filter = this.value.toLowerCase();
  let specialties = specialtiesList.getElementsByTagName("li");

  for (let i = 0; i < specialties.length; i++) {
    let specialty = specialties[i].textContent;
    if (specialty.toLowerCase().indexOf(filter) > -1) {
      specialties[i].style.display = "";
    } else {
      specialties[i].style.display = "none";
    }
  }
});

// This is the function that is called when the user clicks on a specialty in the list.
specialtiesList.addEventListener("click", function (e) {
  if (e.target && e.target.nodeName == "LI") {
    specialtiesDropdownButton.textContent = e.target.outerText;
    specialtiesDropdownSuggestionsDiv.style.display = "none";
  }
});

// This is the function that is called when the user clicks on the dropdown button.
specialtiesDropdownButton.addEventListener("click", function () {
  if (specialtiesDropdownSuggestionsDiv.style.display === "block") {
    specialtiesDropdownSuggestionsDiv.style.display = "none";
  } else {
    specialtiesDropdownSuggestionsDiv.style.display = "block";
  }
});

// END OF SPECIALTIES DROPDOWN BUTTON

// This is the function that is called when the user clicks anywhere in the document.
document.addEventListener("click", function (e) {
  // This ensures that when you click somewhere outside the list box or the box button, the list will close
  if (!specialtiesDropdownMainDiv.contains(e.target)) {
    specialtiesDropdownSuggestionsDiv.style.display = "none";
  }
});

// END OF CATEGORIES DROPDOWN BUTTON

// By ori, this is the function that is called when the user clicks anywhere in the document.
document.addEventListener("click", function (e) {
  // This ensures that when you click somewhere outside the list box or the box button, the list will close.
  if (!doctorsNamesDropdownMainDiv.contains(e.target)) {
    doctorsNamesDropdownSuggestionsDiv.style.display = "none";
  }
});
