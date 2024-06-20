const { log } = require("console");


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

async function getPageUserId() {
  const params = await getQueryParams();
  if (!(params.userId === null)) {
    return params.userId;
  } else {
    console.error("User ID not found in URL parameters");
    return null;
  }
}


document.addEventListener("DOMContentLoaded", function() {
    const appointments = [
      {
        date: "2024-06-25",
        time: "10:00 AM",
        doctor: "Dr. John Doe",
        type: "Consultation"
      }
      // Add more appointments as needed
    ];
  
    const appointmentsList = document.getElementById('appointments-list');
    appointments.forEach(appointment => {
      const listItem = document.createElement('li');
      listItem.innerHTML = `
        <p><strong>Date:</strong> ${appointment.date}</p>
        <p><strong>Time:</strong> ${appointment.time}</p>
        <p><strong>Doctor:</strong> ${appointment.doctor}</p>
        <p><strong>Type:</strong> ${appointment.type}</p>
      `;
      appointmentsList.appendChild(listItem);
    });
  });
  
  async function getUserInformationById(userId){
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

async function sendInfoUser(userid){
  const info = getUserInformationById(userid)
  console.log('test');
}
sendInfoUser(getPageUserId())