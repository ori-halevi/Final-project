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
  