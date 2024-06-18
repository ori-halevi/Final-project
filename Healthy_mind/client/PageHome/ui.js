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
// By ori, this is the function that is called when the user clicks anywhere in the document.
document.addEventListener("click", function (e) {
  // This ensures that when you click somewhere outside the list box or the box button, the list will close.
  if (!doctorsNamesDropdownMainDiv.contains(e.target)) {
    doctorsNamesDropdownSuggestionsDiv.style.display = "none";
  }
});
// END OF DOCTORS NAMES DROPDOWN BUTTON

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


// This is the function that is called when the user clicks anywhere in the document.
document.addEventListener("click", function (e) {
  // This ensures that when you click somewhere outside the list box or the box button, the list will close
  if (!specialtiesDropdownMainDiv.contains(e.target)) {
    specialtiesDropdownSuggestionsDiv.style.display = "none";
  }
});

// END OF SPECIALTIES DROPDOWN BUTTON


// START OF DOCTORS CITY DROPDOWN BUTTON
const sitysDropdownSuggestionsDiv = document.getElementById(
  "city-dropdown-suggestions-div"
);
const sitysList = document.getElementById("doctors-city-list");
const sitysDropdownButton = document.getElementById(
  "city-dropdown-button"
);
const sitysSearchBoxInput = document.getElementById(
  "city-searchBox-input"
);
const sitysDropdownMainDiv = document.getElementById(
  "city-dropdown-main-div"
);
// This is the function that is called when the user enters a character in the search box.
sitysSearchBoxInput.addEventListener("input", function () {
  let filter = this.value.toLowerCase();
  let sitys = sitysList.getElementsByTagName("li");

  for (let i = 0; i < sitys.length; i++) {
    let specialty = sitys[i].textContent;
    if (specialty.toLowerCase().indexOf(filter) > -1) {
      sitys[i].style.display = "";
    } else {
      sitys[i].style.display = "none";
    }
  }
});

// This is the function that is called when the user clicks on a specialty in the list.
sitysList.addEventListener("click", function (e) {
  if (e.target && e.target.nodeName == "LI") {
    sitysDropdownButton.textContent = e.target.outerText;
    sitysDropdownSuggestionsDiv.style.display = "none";
  }
});

// This is the function that is called when the user clicks on the dropdown button.
sitysDropdownButton.addEventListener("click", function () {
  if (sitysDropdownSuggestionsDiv.style.display === "block") {
    sitysDropdownSuggestionsDiv.style.display = "none";
  } else {
    sitysDropdownSuggestionsDiv.style.display = "block";
  }
});


// This is the function that is called when the user clicks anywhere in the document.
document.addEventListener("click", function (e) {
  // This ensures that when you click somewhere outside the list box or the box button, the list will close
  if (!sitysDropdownMainDiv.contains(e.target)) {
    sitysDropdownSuggestionsDiv.style.display = "none";
  }
});

// END OF DOCTORS CITY DROPDOWN BUTTON


// START OF DOCTORS language DROPDOWN BUTTON


const languageDropdownSuggestionsDiv = document.getElementById(
  "language-dropdown-suggestions-div"
);
const languageList = document.getElementById("doctors-language-list");
const languageDropdownButton = document.getElementById(
  "language-dropdown-button"
);
const languageSearchBoxInput = document.getElementById(
  "language-searchBox-input"
);
const languageDropdownMainDiv = document.getElementById(
  "language-dropdown-main-div"
);
// This is the function that is called when the user enters a character in the search box.
languageSearchBoxInput.addEventListener("input", function () {
  let filter = this.value.toLowerCase();
  let language = languageList.getElementsByTagName("li");

  for (let i = 0; i < language.length; i++) {
    let specialty = language[i].textContent;
    if (specialty.toLowerCase().indexOf(filter) > -1) {
      language[i].style.display = "";
    } else {
      language[i].style.display = "none";
    }
  }
});

// This is the function that is called when the user clicks on a specialty in the list.
languageList.addEventListener("click", function (e) {
  if (e.target && e.target.nodeName == "LI") {
    languageDropdownButton.textContent = e.target.outerText;
    languageDropdownSuggestionsDiv.style.display = "none";
  }
});

// This is the function that is called when the user clicks on the dropdown button.
languageDropdownButton.addEventListener("click", function () {
  if (languageDropdownSuggestionsDiv.style.display === "block") {
    languageDropdownSuggestionsDiv.style.display = "none";
  } else {
    languageDropdownSuggestionsDiv.style.display = "block";
  }
});


// This is the function that is called when the user clicks anywhere in the document.
document.addEventListener("click", function (e) {
  // This ensures that when you click somewhere outside the list box or the box button, the list will close
  if (!languageDropdownMainDiv.contains(e.target)) {
    languageDropdownSuggestionsDiv.style.display = "none";
  }
});

// END OF DOCTORS language DROPDOWN BUTTON



// START OF DOCTORS gender DROPDOWN BUTTON


const genderDropdownSuggestionsDiv = document.getElementById(
  "gender-dropdown-suggestions-div"
);
const genderList = document.getElementById("doctors-gender-list");
const genderDropdownButton = document.getElementById(
  "doctors-gender-dropdown-button"
);

const genderDropdownMainDiv = document.getElementById(
  "gender-dropdown-main-div"
);


// This is the function that is called when the user clicks on a specialty in the list.
genderList.addEventListener("click", function (e) {
  if (e.target && e.target.nodeName == "LI") {
    genderDropdownButton.textContent = e.target.outerText;
    genderDropdownSuggestionsDiv.style.display = "none";
  }
});

// This is the function that is called when the user clicks on the dropdown button.
genderDropdownButton.addEventListener("click", function () {
  if (genderDropdownSuggestionsDiv.style.display === "block") {
    genderDropdownSuggestionsDiv.style.display = "none";
  } else {
    genderDropdownSuggestionsDiv.style.display = "block";
  }
});


// This is the function that is called when the user clicks anywhere in the document.
document.addEventListener("click", function (e) {
  // This ensures that when you click somewhere outside the list box or the box button, the list will close
  if (!genderDropdownMainDiv.contains(e.target)) {
    genderDropdownSuggestionsDiv.style.display = "none";
  }
});

// END OF DOCTORS gender DROPDOWN BUTTON