// פונקציה להוצאת פרמטרים מה-URL
function getQueryParams() {
  const params = {};
  const queryString = window.location.search;
  const urlParams = new URLSearchParams(queryString);
  for (const [key, value] of urlParams) {
    params[key] = value;
  }
  return params;
}

// this function will be called when the page is loaded and 
document.addEventListener("DOMContentLoaded", function () {
  const params = getQueryParams();
  const contentDiv = document.getElementById("content");
  if (params.doctorId) {
    console.log("Page been addressed");
    revealDoctorInfo(params.doctorId);
    contentDiv.innerHTML = `<h2>Welcome, User ${params.doctorId}</h2>`;
  } else {
    console.log("Page not addressed");
    contentDiv.innerHTML = `<h2>Welcome, Guest</h2>`;
  }
});

async function fetchDoctorInfo(doctorId) {
  try {
    const response = await fetch(
      "http://localhost:8080/api/getDoctorInfoById",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ doctorId }),
      }
    );

    if (!response.ok) {
      throw new Error("Network response was not ok");
    }

    const data = await response.json();
    console.log("Doctor Info:", data);
    return data;
  } catch (error) {
    console.error("Fetch failed:", error);
  }
}




const meetDr = document.getElementById("meet-dr");
const doctorName = document.getElementById("doctor-name");
const doctorPicture = document.getElementById("doctor-picture");
const doctorSpecialzation = document.getElementById("doctor-specialization");
const doctorExperience = document.getElementById("doctor-experience");
const doctorLanguages = document.getElementById("doctor-languages");
const MonFriWorkingHours = document.getElementById("mon-fri-working-hours");
const saturdayWorkingHours = document.getElementById("saturday-working-hours");
const doctorSpecialization = document.getElementById("doctor-specialization");
const doctorLocation = document.getElementById("doctor-location");

async function revealDoctorInfo(doctorId) {
  const doctorInfo = await fetchDoctorInfo(doctorId);
  doctorPicture.src = doctorInfo.image;
  
  

  doctorSpecialization.innerHTML = " <strong>" + "Specialization: " + "</strong>";
  doctorInfo.specialty.forEach((specialty) => {
    doctorSpecialization.innerHTML +=  " " + specialty + ",";
  });

  doctorLanguages.innerHTML = " <strong>" + "Languages: " + "</strong>";
  doctorInfo.additional_details.languages.forEach((language) => {
    doctorLanguages.innerHTML +=  " " + language + ",";
  });

  meetDr.innerHTML = `MEET ${doctorInfo.full_name}`
  
  doctorName.innerHTML = doctorInfo.full_name;

  doctorExperience.innerHTML = " <strong>" + "Experience: " + "</strong>";
  doctorExperience.innerHTML +=  doctorInfo.additional_details.experience ;


  MonFriWorkingHours.innerHTML = " <strong>" + "Monday - Friday: " + "</strong>";
  MonFriWorkingHours.innerHTML +=  `${doctorInfo.working_hours.Monday_Friday.from} - ${doctorInfo.working_hours.Monday_Friday.to}`;

  saturdayWorkingHours.innerHTML = " <strong>" + "Saturday Working Hours: " + "</strong>";
  saturdayWorkingHours.innerHTML += `${doctorInfo.working_hours.Saturday.from} - ${doctorInfo.working_hours.Saturday.to}`;
  
  doctorLocation.innerHTML = `
  <h2>Our Location</h2>
  <p>${doctorInfo.contact_information.address.street}</p>
  <p>Mindville, XY 45678</p>
  <p><strong>Phone:</strong> (123) 456-7890</p>
  <p><strong>Email:</strong> contact@serenityclinic.com</p>
`;






}
















async function fetchUserInfo(userId) {
  try {
    const response = await fetch("http://localhost:8080/api/getUserInfoById", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ userId }),
    });
    // console.log(response);
    if (!response.ok) {
      throw new Error("Network response was not ok");
    }

    const data = await response.json();
    // console.log("User Info:", data);
  } catch (error) {
    console.error("Fetch failed:", error);
  }
}

document.addEventListener(
  "DOMContentLoaded",
  fetchUserInfo("666eeb05340d469f58628571")
);
