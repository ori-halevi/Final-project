const userIdentification = document.getElementById("user-identification");

// פונקציה לקבלת פרמטרים מה-URL
// async function getQueryParams() {
//   const params = {};
//   const queryString = window.location.search;
//   const urlParams = new URLSearchParams(queryString);
//   for (const [key, value] of urlParams) {
//     params[key] = value;
//   }
//   return params;
// }
function getQueryParams() {
  const params = {};
  const queryString = window.location.search;
  const urlParams = new URLSearchParams(queryString);
  for (const [key, value] of urlParams) {
    params[key] = value;
    // console.log("key: " + key + " value: " + value);
  }
  return params;
}
// פונקציה זו תיקרא כאשר הדף נטען
document.addEventListener("DOMContentLoaded", async function () {
  const params = await getQueryParams();
  const contentDiv = document.getElementById("content");
    // const userNameForPersonalArea = document.createElement("B");
  if (params.userId) {
    const userInfo = await fetchUserInfo(params.userId);
    updatePageToUser(params.userId, userInfo.full_name);
  } else {
    updatePageToGuest();
  }
});

// באיחוד פונקציה זו עושה בקשת fetch לשרת כדי לקבל מידע על המשתמש
async function fetchUserInfo(userId) {
  try {
    const response = await fetch("http://localhost:8080/api/getUserInfoById", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ userId }),
    });
    if (!response.ok) {
      throw new Error("Network response was not ok");
    }
    return await response.json();
  } catch (error) {
    console.error("Fetch failed:", error);
  }
}

// פונקציה זו מעדכנת את הדף למשתמש
// פונקציה זו מעדכנת את הדף למשתמש
function updatePageToUser(userId, username) {
  const loginImage = document.getElementById("loginImg")
  const personalArea = document.getElementById("PersonalAreaImg")
  const logOutImage = document.getElementById("logOutImg")
  loginImage.style.display = "none"
  logOutImage.src = "../RESOURCES/Images/Background/logOutButton.png"
  logOutImage.addEventListener("click",() => {
    showYouAreLoguot();
    window.location.href = "../PageHome/index.html"
    showAllDoctors(null)
  });
  showAllDoctors(userId) 
  personalArea.addEventListener("click", () => {
    window.location.href = `../PagePrivteArea/index.html?userId=${userId}`
    })
}



function updatePageToGuest(){
  const loginImage = document.getElementById("loginImg")
  const personalArea = document.getElementById("PersonalAreaImg")
  const logOutImage = document.getElementById("logOutImg")
  loginImage.src = "../RESOURCES/Images/Background/loginButton.png"
  loginImage.alt = "Sdgdkhgbidfsjh"
  loginImage.addEventListener("click", () => {
    window.location.href = "../PageLogin/index.html"
    showAllDoctors(null)
  });
  logOutImage.style.display = "none"
  personalArea.style.display = "none"

}



function showYouAreLoguot() {
  const popup = document.getElementById("You-are-loguot");
  popup.style.display = "block";

  // הסתרת הפופאפ אחרי 3 שניות
  setTimeout(() => {
    popup.style.display = "none";
  }, 5000);
}

// באיחוד פונקציה זו עושה בקשת fetch לשרת כדי לקבל את רשימת הרופאים
async function fetchDoctorsInfo() {
  try {
    const response = await fetch("http://localhost:8080/api/doctorsInfo");
    return await response.json();
  } catch (error) {
    console.error("Error fetching doctors info:", error);
    return [];
  }
}

// פונקציה זו מעדכנת את הרשימות בדף בהתאם למידע שהתקבל מהשרת
// A function that updates the dropdown list on the page with the information we received from the server
async function updateDropdowns() {
  const doctors = await fetchDoctorsInfo();

  // Updating the list of doctors in the doctor names dropdown
  const doctorsNamesList = document.getElementById("doctors-names-list");
  doctorsNamesList.innerHTML = ""; // ניקוי הרשימה הקיימת קודם
  doctors.forEach((doctor) => {
    const listItem = document.createElement("li");
    listItem.textContent = doctor.nameDoctor;
    doctorsNamesList.appendChild(listItem);
  });

  // Updating the list of specialties in the specialties dropdown
  const doctorsSpecialtiesList = document.getElementById(
    "doctors-specialties-list"
  );
  doctorsSpecialtiesList.innerHTML = ""; // ניקוי הרשימה הקיימת קודם

  // Assuming doctors is the array of doctors received from the server
  let specialtiesSet = new Set(); // Set to store unique specialties
  doctors.forEach(async (doctor) => {
    await doctor.specialtyDoctor.forEach((specialty) => {
      specialtiesSet.add(specialty);
    });
  });
  specialtiesSet.forEach((specialty) => {
    const listItem = document.createElement("li");
    listItem.textContent = specialty;
    doctorsSpecialtiesList.appendChild(listItem);
  });

  // Updating the list of cities in the cities dropdown
  const doctorsCityList = document.getElementById("doctors-city-list");
  doctorsCityList.innerHTML = ""; // ניקוי הרשימה הקיימת קודם
  let citiesSet = new Set(); // Set to store unique cities
  await doctors.forEach(async (doctor) => {
    citiesSet.add(doctor.adrressDoctor);
  });

  await citiesSet.forEach((city) => {
    const listItem = document.createElement("li");
    listItem.textContent = city;
    doctorsCityList.appendChild(listItem);
  });

  // Updating the list of languages in the languages dropdown
  const doctorsLanguageList = document.getElementById("doctors-language-list");
  doctorsLanguageList.innerHTML = ""; // ניקוי הרשימה הקיימת קודם

  // Assuming doctors is the array of doctors received from the server
  let languagesSet = new Set(); // Set to store unique specialties

  doctors.forEach((doctor) => {
    doctor.languagesDoctor.forEach((Language) => {
      languagesSet.add(Language);
    });
  });

  languagesSet.forEach((Language) => {
    const listItem = document.createElement("li");
    listItem.textContent = Language;
    listItem.value = Language;
    doctorsLanguageList.appendChild(listItem);
  });
}
const searchButton = document.getElementById("search-button");
const doctorsNamesDropdown = document.getElementById(
  "doctors-names-dropdown-button"
);
const specialtiesDropdown = document.getElementById(
  "specialties-dropdown-button"
);
const cityDropdown = document.getElementById("city-dropdown-button");
const languageDropdown = document.getElementById("language-dropdown-button");
const genderDropdown = document.getElementById(
  "doctors-gender-dropdown-button"
);

async function getSerchFieldesInfo () {
  const searchParams = {
    nameDoctor: doctorsNamesDropdown.textContent,
    specialtyDoctor: specialtiesDropdown.textContent,
    adrressDoctor: cityDropdown.textContent,
    languagesDoctor: languageDropdown.textContent,
    genderDoctor: genderDropdown.textContent,
  };
  for (const key in searchParams) {
    if (searchParams.hasOwnProperty(key)) {
      const value = searchParams[key];
      if (
        value === "Doctors names" ||
        value === "Specialties" ||
        value === "City" ||
        value === "Preferred language" ||
        value === "Gender"
      ) {
        searchParams[key] = null;
      }
    }
  }
  return searchParams;
};
// TODO: לתקן כך שבצד לקוח יהיה את החישוב להוצאת המזהה ולא בצד שרת כמו שזה עכשיו, צריך לגזור דברים מצד שרת


// By Ori, This function updates the list of doctors on the page ocording to the search parameters
async function filteredDoctors(filterParams) {
  const doctors = await fetchDoctorsInfo();
  return doctors
    .filter(doctor => {
      return Object.keys(filterParams).every(key => {
        if (filterParams[key] === null) {
          return true;}
        if (Array.isArray(doctor[key])) {
          return doctor[key].includes(filterParams[key]);
        }
        return filterParams[key] === doctor[key];
      });
    })
    .map(doctor => doctor.idDoctor);
}

async function getPageUserId() {
  const params = await getQueryParams();
  if (!(params.userId === null)) {
    return params.userId;
  } else {
    console.error("User ID not found in URL parameters");
    return null;
  }
}

searchButton.addEventListener("click", async () => {
  const params = getQueryParams();
  const filterParams = await getSerchFieldesInfo();
  const listDoctorsIds = await filteredDoctors(filterParams);
  
  updateSearchResult(listDoctorsIds, params.userId);
});

async function updateSearchResult(listDoctorsIds, userId) {
  const doctors = await fetchDoctorsInfo();

  const doctorsList = document.getElementById("search-result-list");
  doctorsList.innerHTML = "";

  listDoctorsIds.forEach((doctorId) => {
    const doctor = doctors.find((doctor) => doctor.idDoctor === doctorId);

    if (doctor) {
      const imgItem = document.createElement("img");
      imgItem.src = doctor.imgDoctor || "https://via.placeholder.com/150";
      imgItem.alt = doctor.nameDoctor + doctor.imgDoctor;
      imgItem.className = "doctor-img";

      const nameItem = document.createElement("h3");
      nameItem.textContent = doctor.nameDoctor;
      nameItem.className = "doctor-name";

      const experienceItem = document.createElement("p");
      experienceItem.textContent = "Experience: " + doctor.experienceDoctor;
      experienceItem.className = "doctor-experience";

      const cityItem = document.createElement("p");
      cityItem.textContent = "City: " + doctor.adrressDoctor;
      cityItem.className = "doctor-city";

      const languagesItem = document.createElement("p");
      languagesItem.textContent = "Languages: " + doctor.languagesDoctor.join(", ");
      languagesItem.className = "doctor-languages";

      const divItem = document.createElement("div");
      divItem.className = "doctor-info";
      divItem.appendChild(imgItem);
      divItem.appendChild(nameItem);
      divItem.appendChild(experienceItem);
      divItem.appendChild(cityItem);
      divItem.appendChild(languagesItem);

      const listItem = document.createElement("li");
      listItem.appendChild(divItem);
      listItem.addEventListener("click", () => {
        window.location.href = `../PageDoctorAbout/index.html?doctorId=${doctor.idDoctor}&userId=${userId}`;
      });
      doctorsList.appendChild(listItem);

      // Reset dropdowns
      doctorsNamesDropdownButton.innerHTML = "<strong>Doctors names</strong>";
      specialtiesDropdownButton.innerHTML = "<strong>Specialties</strong>";
      citiesDropdownButton.innerHTML = "<strong>City</strong>";
      languageDropdownButton.innerHTML = "<strong>Preferred language</strong>";
      genderDropdownButton.innerHTML = "<strong>Gender</strong>";
    } else {
      console.warn(`Doctor with ID ${doctorId} not found`);
    }
  });
}


async function showAllDoctors(userId) {
  const doctors = await fetchDoctorsInfo();
  const allDoctorsList = doctors.map((doctor) => doctor.idDoctor);
  updateSearchResult(allDoctorsList, userId);
}

document.addEventListener("DOMContentLoaded", updateDropdowns);
document.addEventListener("DOMContentLoaded", showAllDoctors(null));
