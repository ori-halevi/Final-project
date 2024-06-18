const userIdentification = document.getElementById("user-identification");

// פונקציה לקבלת פרמטרים מה-URL
async function getQueryParams() {
  const params = {};
  const queryString = window.location.search;
  const urlParams = new URLSearchParams(queryString);
  for (const [key, value] of urlParams) {
    params[key] = value;
  }
  return params;
}

// פונקציה זו תיקרא כאשר הדף נטען
document.addEventListener("DOMContentLoaded", async function () {
  const params = await getQueryParams();
  const contentDiv = document.getElementById("content");
  if (params.userId) {
    const userInfo = await fetchUserInfo(params.userId);
    updatePageToUser(params.userId, userInfo.full_name);
  } else {
    // פעולות נוספות אם אין מזהה משתמש
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
function updatePageToUser(userId, username) {
  const loginButton = userIdentification.querySelector("button");
  loginButton.textContent = username;
  loginButton.addEventListener("click", () => {
    window.location.href = `../PersonalArea/index.html?userId=${userId}`;
  });
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

async function updateSearchResult(listDoctorsIds) {
  const doctors = await fetchDoctorsInfo();

  const doctorsList = document.getElementById("search-result-list");
  doctorsList.innerHTML = ""; 

  listDoctorsIds.forEach((doctorId) => {
    const doctor = doctors.find((doctor) => doctor.idDoctor === doctorId);

    if (doctor) {
      const imgItem = document.createElement("img");
      imgItem.src = doctor.imgDoctor || "https://via.placeholder.com/150"; 
      imgItem.alt = doctor.nameDoctor + doctor.imgDoctor;
      const divItem = document.createElement("div"); 
      divItem.className = "imageDiv";
      divItem.appendChild(imgItem);
      const paragraphItem = document.createElement("p");
      paragraphItem.textContent = doctor.experienceDoctor;
      divItem.appendChild(paragraphItem);
      const listItem = document.createElement("li");
      listItem.appendChild(divItem);
      listItem.addEventListener("click", () => {
        window.location.href = `../PageDoctorAbout/index.html?doctorId=${doctor.idDoctor}`;
      });
      doctorsList.appendChild(listItem);
    } else {
      console.warn(`Doctor with ID ${doctorId} not found`);
    }
  });
}

async function showAllDoctors() {
  const doctors = await fetchDoctorsInfo();
  const allDoctorsList = doctors.map((doctor) => doctor.idDoctor);
  updateSearchResult(allDoctorsList);
}

document.addEventListener("DOMContentLoaded", updateDropdowns);
document.addEventListener("DOMContentLoaded", showAllDoctors);
