// בקשת GET לשרת כדי לקבל את רשימת הרופאים
async function fetchDoctorsInfo() {
  try {
    const response = await fetch("http://localhost:8080/api/doctorsInfo");
    const doctors = await response.json();
    return doctors;
  } catch (error) {
    console.error("Error fetching doctors info:", error);
    return [];
  }
}


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
  const doctorsSpecialtiesList = document.getElementById("doctors-specialties-list");
  doctorsSpecialtiesList.innerHTML = ""; // ניקוי הרשימה הקיימת קודם

  // Assuming doctors is the array of doctors received from the server
  let specialtiesSet = new Set(); // Set to store unique specialties

  doctors.forEach((doctor) => {
    doctor.specialtyDoctor.forEach((specialty) => {
      specialtiesSet.add(specialty);
    });
  });

  specialtiesSet.forEach((specialty) => {
    const option = document.createElement("option");
    option.textContent = specialty;
    option.value = specialty;
    doctorsSpecialtiesList.appendChild(option);
  });



  // Updating the list of cities in the cities dropdown
  const doctorsCityList = document.getElementById("doctors-city-list");
  doctorsCityList.innerHTML = ""; // ניקוי הרשימה הקיימת קודם
  doctors.forEach((doctor) => {
    const listItem = document.createElement("li");
    listItem.textContent = doctor.adrressDoctor;
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
    const option = document.createElement("option");
    option.textContent = Language;
    option.value = Language;
    doctorsLanguageList.appendChild(option);
  });
}


// call the function immediately after the page is loaded
document.addEventListener("DOMContentLoaded", updateDropdowns);
