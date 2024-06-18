document.getElementById('appointment-form').addEventListener('submit', async (event) => {
    event.preventDefault();
  
    const doctorId = document.getElementById('doctorId').value;
    const userId = document.getElementById('userId').value;
    const date = document.getElementById('date').value;
  
    const appointmentDetails = {
      doctorId: doctorId,
      userId: userId,
      date: date,
    };
  
    try {
      const response = await fetch('http://localhost:8080/api/appointments', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(appointmentDetails),
      });
  
      if (response.ok) {
        const result = await response.json();
        alert('Appointment created successfully!');
      } else {
        const error = await response.json();
        alert(`Failed to create appointment: ${error.message}`);
      }
    } catch (error) {
      console.error('Error:', error);
      alert('An error occurred while creating the appointment');
    }
  });
  

// פונקציה להביא את המידע של המשתמש מהשרת על פי מזהה
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