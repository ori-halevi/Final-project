const express = require("express");
const cors = require("cors");
const app = express();
const dbUsers = require("./db_users");
const dbDoctors = require("./db_doctors");
const port = 8080;

// Middleware to parse incoming JSON requests
app.use(express.json());

// Use CORS middleware
app.use(cors());

// GET all Doctors Info
// By Eliyahu and Ori
app.get("/api/doctorsInfo", async (req, res) => {
  try {
    let finalReturen = [];
    let doctors = await dbDoctors.getDoctors();
    doctors.forEach(function (doctor) {
      let doctersInfo = {};
      doctersInfo["nameDoctor"] = doctor.full_name;
      doctersInfo["experienceDoctor"] = doctor.additional_details.experience;
      doctersInfo["imgDoctor"] = doctor.image;
      doctersInfo["idDoctor"] = doctor._id;
      doctersInfo["specialtyDoctor"] = doctor.specialty;
      doctersInfo["adrressDoctor"] = doctor.contact_information.address.city;
      doctersInfo["languagesDoctor"] = doctor.additional_details.languages;
      doctersInfo["genderDoctor"] = doctor.gender;
      finalReturen.push(doctersInfo);
    });
    // console.log(finalReturen.map(doctor => doctor.specialtyDoctor));
    // console.log(finalReturen);
    res.send(finalReturen);
  } catch (error) {
    res.status(500).send();
  }
});

// POST a new appointment
// By Ori
app.post("/api/appointments", async (req, res) => {
  try {
    const { doctorId, userId, date } = req.body;

    // Update doctor's appointments
    const doctorUpdated = await dbDoctors.newDoctorApointment(doctorId, {
      patientId: userId,
      date: date,
    });

    // Update user's appointments
    const userUpdated = await dbUsers.newUserAppointment(userId, {
      doctorId: doctorId,
      date: date,
    });

    if (doctorUpdated && userUpdated) {
      res.status(201).send({ message: "Appointment created successfully" });
    } else {
      res.status(500).send({ message: "Failed to create appointment" });
    }
  } catch (error) {
    console.error(error);
    res.status(500).send({ message: "Internal server error" });
  }
});

// GET doctor infomartion by id
// By Eliyahu and Ori
app.post("/api/getDoctorInfoById", async (req, res) => {
  try {
    const { doctorId } = req.body;
    const infod = await dbDoctors.getDoctorById(doctorId);
    if (!infod) return res.status(404).send();
    res.send(infod);
  } catch (error) {
    res.status(500).send();
  }
});

// GET user infomartion by id
// By Eliyahu and Ori
app.post("/api/getUserInfoById", async (req, res) => {
  try {
    const { userId } = req.body;
    const infou = await dbUsers.getUserById(userId);
    if (!infou) return res.status(404).send();
    res.send(infou);
  } catch (error) {
    res.status(500).send();
  }
});

// If user exists
// By Eliyahu
app.post("/api/isUserExists", async (req, res) => {
  try {
    const { username, password } = req.body;
    const users = await dbUsers.getUsers();

    let userExists = false;
    let userId = null;

    for (const user of users) {
      if (user.full_name === username && user.password === password) {
        userId = user._id;
        userExists = true;
        break;
      }
    }

    if (userExists) {
      res.status(200).send({ userId });
    } else {
      res.status(200).send({ userId: null });
    }
  } catch (error) {
    console.error("Error checking user existence:", error); // לוג שגיאה
    res.status(500).send({ error: "Internal Server Error" });
  }
});
// פונקציה זו מקבלת את הפרמטרים שנשלחו מהלקוח ומחזירה רשימת רופאים מעודכנת על פי החיפוש
// פונקציה זו מקבלת את רשימת הרופאים ואת הפרמטרים שנשלחו מהלקוח ומחזירה רשימת רופאים מעודכנת על פי החיפוש
// פונקציה זו מקבלת את רשימת הרופאים ואת הפרמטרים שנשלחו מהלקוח ומחזירה רשימת רופאים מעודכנת על פי החיפוש
async function filterDoctors(params) {
  const doctors = await dbDoctors.getDoctors();
  // אם רשימת הרופאים לא נמצאה או ריקה, תחזיר רשימה ריקה
  if (!doctors || doctors.length === 0) {
      return [];
  }

  // סנן את רשימת הרופאים על פי הפרמטרים שנשלחו מהלקוח
  const filteredDoctors = doctors.filter((doctor) => {
      return (
          (!params.name || doctor.full_name.toLowerCase().includes(params.name.toLowerCase())) &&
          (!params.specialty || doctor.specialty.toLowerCase().includes(params.specialty.toLowerCase())) &&
          (!params.city || doctor.contact_information.address.city.toLowerCase().includes(params.city.toLowerCase())) &&
          (!params.language || doctor.additional_details.languages.toLowerCase().includes(params.language.toLowerCase())) &&
          (!params.gender || doctor.gender.toLowerCase() === params.gender.toLowerCase())
      );
  });

  // החזר את רשימת הרופאים שעברו את הסינון
  return filteredDoctors;
}


// POST filtered doctors based on search parameters
// By [Your Name]
app.post("/api/filterDoctors", async (req, res) => {
  try {
    const { name, specialty, city, language, gender } = req.body;
    // Call the filterDoctors function with the provided parameters
    const filteredDoctors = await filterDoctors({
      name,
      specialty,
      city,
      language,
      gender,
    });
    // Return the filtered list of doctors to the client
    res.status(200).send(filteredDoctors);
  } catch (error) {
    console.error("Error filtering doctors:", error);
    res.status(500).send({ error: "Internal Server Error" });
  }
});

//update appointment
//by Elkana

app.post("/api/updateAppointments", async (req, res) => {
    const {date, doctorId, patientId} = req.body;
    try{
      const appointmentDocUpdate = dbDoctors.updateOne(
        { _id: doctorId }, // Filter doctor
        { $set: { appointments:{ patientId: patientId, date: date } } },// Update doctor
      );
      const appointmentUserUpdate = dbUsers.updateOne(
        { _id: patientId }, // Filter user
        { $set: { appointments:{ doctorId: doctorId, date: date } } },// Update user  
    );
    if (result.nModified > 0) {
      res.status(200).json({ message: 'Appointment updated successfully' });
    } 
    else {
      res.status(404).json({ message: 'Appointment not found or no changes made' });
    }
  } 
    catch (error) {
  res.status(500).send(error.message);
  }
}),


app.listen(port, () => console.log(`Listening on port ${port}...`));
