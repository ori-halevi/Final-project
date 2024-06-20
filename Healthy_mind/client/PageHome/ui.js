// קישורי אלמנטים לדוקטורים
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

// קישורי אלמנטים להתמחויות
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

// קישורי אלמנטים לערים
const citiesDropdownSuggestionsDiv = document.getElementById(
  "city-dropdown-suggestions-div"
);
const citiesList = document.getElementById("doctors-city-list");
const citiesDropdownButton = document.getElementById("city-dropdown-button");
const citiesSearchBoxInput = document.getElementById("city-searchBox-input");
const citiesDropdownMainDiv = document.getElementById("city-dropdown-main-div");

// קישורי אלמנטים לשפות
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

// קישורי אלמנטים למגדרים
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

const allDropdownButtons = [
  doctorsNamesDropdownButton,
  specialtiesDropdownButton,
  citiesDropdownButton,
  languageDropdownButton,
  genderDropdownButton,
];

// פונקציות כלליות לסינון רשימות
function filterList(searchBoxInput, list) {
  let filter = searchBoxInput.value.toLowerCase();
  let items = list.getElementsByTagName("li");

  for (let i = 0; i < items.length; i++) {
    let itemText = items[i].textContent;
    items[i].style.display =
      itemText.toLowerCase().indexOf(filter) > -1 ? "" : "none";
  }
}

function selectItemFromList(list, button, suggestionsDiv) {
  list.addEventListener("click", function (e) {
    flashBtn(searchButton);
    if (e.target && e.target.nodeName == "LI") {
      button.style.backgroundColor = "lightgreen";
      button.textContent = e.target.outerText;
      suggestionsDiv.style.display = "none";
    }
  });
}

function toggleDropdown(suggestionsDiv) {
  suggestionsDiv.style.display =
    suggestionsDiv.style.display === "block" ? "none" : "block";
}

function closeDropdownOutsideClick(mainDiv, suggestionsDiv) {
  document.addEventListener("click", function (e) {
    if (!mainDiv.contains(e.target)) {
      suggestionsDiv.style.display = "none";
    }
  });
}
function resetButtonColors() {
  allDropdownButtons.forEach((button) => {
    button.style.backgroundColor = "#f4f4f4";
  });
}

// הפעלת הפונקציות עבור דוקטורים
doctorsNamesSearchBoxInput.addEventListener("input", function () {
  filterList(doctorsNamesSearchBoxInput, doctorsNamesList);
});
selectItemFromList(
  doctorsNamesList,
  doctorsNamesDropdownButton,
  doctorsNamesDropdownSuggestionsDiv
);
doctorsNamesDropdownButton.addEventListener("click", function () {
  toggleDropdown(doctorsNamesDropdownSuggestionsDiv);
});
closeDropdownOutsideClick(
  doctorsNamesDropdownMainDiv,
  doctorsNamesDropdownSuggestionsDiv
);

// הפעלת הפונקציות עבור התמחויות
specialtiesSearchBoxInput.addEventListener("input", function () {
  filterList(specialtiesSearchBoxInput, specialtiesList);
});
selectItemFromList(
  specialtiesList,
  specialtiesDropdownButton,
  specialtiesDropdownSuggestionsDiv
);
specialtiesDropdownButton.addEventListener("click", function () {
  toggleDropdown(specialtiesDropdownSuggestionsDiv);
});
closeDropdownOutsideClick(
  specialtiesDropdownMainDiv,
  specialtiesDropdownSuggestionsDiv
);

// הפעלת הפונקציות עבור ערים
citiesSearchBoxInput.addEventListener("input", function () {
  filterList(citiesSearchBoxInput, citiesList);
});
selectItemFromList(
  citiesList,
  citiesDropdownButton,
  citiesDropdownSuggestionsDiv
);
citiesDropdownButton.addEventListener("click", function () {
  toggleDropdown(citiesDropdownSuggestionsDiv);
});
closeDropdownOutsideClick(citiesDropdownMainDiv, citiesDropdownSuggestionsDiv);

// הפעלת הפונקציות עבור שפות
languageSearchBoxInput.addEventListener("input", function () {
  filterList(languageSearchBoxInput, languageList);
});
selectItemFromList(
  languageList,
  languageDropdownButton,
  languageDropdownSuggestionsDiv
);
languageDropdownButton.addEventListener("click", function () {
  toggleDropdown(languageDropdownSuggestionsDiv);
});
closeDropdownOutsideClick(
  languageDropdownMainDiv,
  languageDropdownSuggestionsDiv
);

// הפעלת הפונקציות עבור מגדרים
selectItemFromList(
  genderList,
  genderDropdownButton,
  genderDropdownSuggestionsDiv
);
genderDropdownButton.addEventListener("click", function () {
  toggleDropdown(genderDropdownSuggestionsDiv);
});
closeDropdownOutsideClick(genderDropdownMainDiv, genderDropdownSuggestionsDiv);

searchButton.addEventListener("click", resetButtonColors);

function flashBtn(button) {
  if (button) {
    // הוספת מחלקת הגדילה
    button.classList.add("growing");

    setTimeout(function () {
      // הסרת מחלקת הגדילה לאחר זמן האנימציה
      button.classList.remove("growing");
    }, 1000); // זמן האנימציה באלפיות שניה
  }
}
