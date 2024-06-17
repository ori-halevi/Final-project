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
    document.getElementById("doctors-names-dropdown-button").textContent =
      e.target.textContent;
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


// START OF CATEGORIES DROPDOWN BUTTON



// END OF CATEGORIES DROPDOWN BUTTON




// By ori, this is the function that is called when the user clicks anywhere in the document.
document.addEventListener("click", function (e) {
  // This ensures that when you click somewhere outside the list box or the box button, the list will close.
  if (!doctorsNamesDropdownMainDiv.contains(e.target)) {
    doctorsNamesDropdownSuggestionsDiv.style.display = "none";
  }
});
