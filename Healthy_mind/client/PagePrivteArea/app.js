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
  