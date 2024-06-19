const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const dbName = "healthy_mind";
async function main() {
  try {
    await mongoose.connect("mongodb://127.0.0.1:27017/" + dbName);
    // use the operations here to test
  } catch (error) {
    console.error(error);
  }
}

const doctorSchema = new Schema({
  full_name: { type: String, required: true },
  gender: { type: String, required: true },
  image: { type: String, required: true },
  specialty: { type: [String], required: true },
  working_time: {
    days: { type: [String], required: true },
    hours: {
      from: { type: String, required: true },
      to: { type: String, required: true },
    },
  },
  contact_information: {
    phone: { type: String, required: true },
    email: { type: String, required: true },
    address: {
      city: { type: String, required: true },
      street: { type: String, required: true },
      zipcode: { type: String, required: true },
    },
  },
  additional_details: {
    languages: { type: [String], required: true },
    education: [
      {
        degree: { type: String, required: true },
        university: { type: String, required: true },
        year: { type: Number, required: true },
      },
    ],
    certifications: { type: [String], required: true },
    experience: { type: String, required: true },
  },
  appointments: [
    {
      patientId: { type: mongoose.Schema.Types.ObjectId, required: true },
      date: { type: Date, required: true },
    },
  ],
});

const Doctor = mongoose.model("doctors", doctorSchema);

async function getDoctors() {
  const result = await Doctor.find();
  return result;
}

async function getDoctorById(doctorId) {
  const result = await Doctor.findOne({ _id: doctorId });
  return result;
}

async function createDoctor(newDoctor) {
  const result = await Doctor.create(newDoctor);
  return result;
}

async function updateDoctorName(doctorId, newName) {
  const result = await Doctor.updateOne(
    { _id: doctorId },
    { $set: { name: newName } }
  );
  return result.modifiedCount === 1;
}

const { ObjectId } = require('mongoose').Types;
async function newDoctorAppointment(doctorId, appointmentDetails) {
  try {
    const ids = new ObjectId(appointmentDetails.patientId)
    const newOb = {
      patientId: ids,
      date: new Date(appointmentDetails.date),
    }
    
    console.log(newOb);
    const result = await Doctor.updateOne(
      { _id: doctorId },
      { $push: { appointments: newOb } }
    );

    console.log("Result:", result);
    
    return result.modifiedCount === 1;
  } catch (error) {
    console.error("Error adding new appointment:", error);
    return false;
  }
}

async function updateDoctor234(){
  const appointmentDetails = {
    patientId: new mongoose.Types.ObjectId("60d5ec49f3d2b2a5f0a12345"), // מזהה המטופל
    date: new Date("2024-07-01T14:00:00Z") // תאריך ושעה של הפגישה
  };
//   const appointmentDetails = {
//     patientId: '6671b6c22848454301c551ea',
//     date: '2024-06-14T06:00:00.000Z'
//   };
  const doctorId = "6671b6c22848454301c551e4"; // מזהה הרופא
  
  const success = await newDoctorAppointment(doctorId, appointmentDetails);
  if (success) {
    console.log("הפגישה נוספה בהצלחה!");
  } else {
    console.log("אירעה שגיאה בעת הוספת הפגישה.");
  }
}
updateDoctor234();











async function deleteDoctor(doctorId) {
  const result = await Doctor.deleteOne({ _id: doctorId });
  return result.deletedCount === 1;
}

main();

module.exports = {
  getDoctors,
  getDoctorById,
  createDoctor,
  updateDoctorName,
  newDoctorAppointment,
  deleteDoctor,
};
