// GET request to the server to get the list of doctors
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





async function updateSearchResult(listDoctorsIds) {
  console.log(listDoctorsIds);

  const doctors = await fetchDoctorsInfo();

  // Assuming doctors is the array of doctors received from the server
  const doctorsList = document.getElementById("search-result-list");
  doctorsList.innerHTML = ""; // Clear existing list

  listDoctorsIds.forEach((doctorId) => {
    const doctor = doctors.find((doctor) => doctor.idDoctor === doctorId);

    if (doctor) { // Check if doctor exists before accessing properties
      console.log(doctor.imgDoctor);

      const imgItem = document.createElement("img");
      // Handle missing image: Set a default or error image
      imgItem.src = doctor.imgDoctor || "https://via.placeholder.com/150"; // Placeholder image
      imgItem.alt = doctor.nameDoctor + " image";
      const divItem = document.createElement("div"); // Optional for styling
      divItem.className = "imageDiv"
      divItem.appendChild(imgItem);
      const paragraphItem = document.createElement("p");
      paragraphItem.textContent = doctor.experienceDoctor;
      divItem.appendChild(paragraphItem);
      const listItem = document.createElement("li");
      listItem.appendChild(divItem);


      doctorsList.appendChild(listItem);
    } else {
      console.warn(`Doctor with ID ${doctorId} not found`);
    }
  });
}





async function showAllDoctors() {
  const doctors = await fetchDoctorsInfo();
  let allDoctorsList = [];
  doctors.forEach((doctor) => {
    allDoctorsList.push(doctor.idDoctor);
  });
  updateSearchResult(allDoctorsList);
}

















// call the function immediately after the page is loaded
document.addEventListener("DOMContentLoaded", updateDropdowns);
document.addEventListener("DOMContentLoaded", showAllDoctors);
// document.addEventListener("DOMContentLoaded", updateSearchResult(["6670a64b72c0f7854f9832ce", "6670a64b72c0f7854f9832cf", "6670a64b72c0f7854f9832d0"]));
