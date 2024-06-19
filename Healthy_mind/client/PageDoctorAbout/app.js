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
const doctorEducation1 = document.getElementById("doctor-education-1");
const doctorEducation2 = document.getElementById("doctor-education-2");

// this function get prams from the url
function getQueryParams() {
  const params = {};
  const queryString = window.location.search;
  const urlParams = new URLSearchParams(queryString);
  for (const [key, value] of urlParams) {
    params[key] = value;
    console.log( 'key: ' + key + ' value: ' + value);
  }
  console.log(params);
  return params;
}

// this function will be called when the page is loaded
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

// this function will get all the doctor info from the server
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


// this function will reveal all the doctor info on the page
async function revealDoctorInfo(doctorId) {
  const doctorInfo = await fetchDoctorInfo(doctorId);
  // reveal MEET DR.
  meetDr.innerHTML = `MEET ${doctorInfo.full_name}`;
  // reveal doctor name
  doctorName.innerHTML = doctorInfo.full_name;
  // reveal doctor picture
  doctorPicture.src = doctorInfo.image;
  // reveal doctor specializations
  doctorSpecialization.innerHTML =
    " <strong>" + "Specialization: " + "</strong>";
  doctorInfo.specialty.forEach((specialty) => {
    doctorSpecialization.innerHTML += " " + specialty + ",";
  });
  // reveal doctor languages
  doctorLanguages.innerHTML = " <strong>" + "Languages: " + "</strong>";
  doctorInfo.additional_details.languages.forEach((language) => {
    doctorLanguages.innerHTML += " " + language + ",";
  });
  // reveal doctor experience
  doctorExperience.innerHTML = " <strong>" + "Experience: " + "</strong>";
  doctorExperience.innerHTML += doctorInfo.additional_details.experience;
  // reveal doctor working hours
  MonFriWorkingHours.innerHTML =
    " <strong>" + "Monday - Friday: " + "</strong>";
  MonFriWorkingHours.innerHTML += `${doctorInfo.working_hours.Monday_Friday.from} - ${doctorInfo.working_hours.Monday_Friday.to}`;

  saturdayWorkingHours.innerHTML =
    " <strong>" + "Saturday Working Hours: " + "</strong>";
  saturdayWorkingHours.innerHTML += `${doctorInfo.working_hours.Saturday.from} - ${doctorInfo.working_hours.Saturday.to}`;
  // reveal doctor location
  doctorLocation.innerHTML = "";
  doctorLocation.innerHTML = `
  <h2>Our Location</h2>
  <p>${doctorInfo.contact_information.address.street}</p>
  <p>${doctorInfo.contact_information.address.city}</p>
  <p><strong>Phone:</strong> ${doctorInfo.contact_information.phone}</p>
  <p><strong>Email:</strong> ${doctorInfo.contact_information.email}</p>
`;
  // reveal doctor education
  doctorEducation1.innerHTML = `
<strong>degree: </strong> ${doctorInfo.additional_details.education[0].degree} <br>
<strong>university: </strong>${doctorInfo.additional_details.education[0].university} <br>
<strong>year: </strong>${doctorInfo.additional_details.education[0].year}
`;
  doctorEducation2.innerHTML = `
   <strong>degree: </strong> ${doctorInfo.additional_details.education[1].degree} <br>
  <strong>university: </strong>${doctorInfo.additional_details.education[1].university} <br>
  <strong>year: </strong>${doctorInfo.additional_details.education[1].year}
`;
}


async function sendAppointmentData(date) {
  try {
      const patientId = await getPageDoctorId();
      const doctorId = await getPageUserId();
      
      const data = {
          patientId,
          doctorId,
          date
      };

      const response = await fetch('http://localhost:8080/updataAppointments', {
          method: 'POST',
          headers: {
              'Content-Type': 'application/json'
          },
          body: JSON.stringify(data)
      });

      const result = await response.json();
      console.log('Success:', result);
  } catch (error) {
      console.error('Error:', error);
  }
}
async function getPageDoctorId() {
  const params = getQueryParams();
  if (params.doctorId) {
    return params.doctorId;
  } else {
    console.error("Doctor ID not found in URL parameters");
    return null;
  }
}


async function getPageUserId() {
  const params = getQueryParams();
  if (params.userId) {
    return params.userId;
  } else {
    console.error("User ID not found in URL parameters");
    return null;
  }
}
