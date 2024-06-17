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

const doctorSchema = new mongoose.Schema({
    full_name: { type: String, required: true },
    image: {type: String, required: true},
    specialty: { type: String, required: true },
    working_time: {
        days: { type: [String], required: true },
        hours: {
            from: { type: String, required: true },
            to: { type: String, required: true }
        }
    },
    contact_information: {
        phone: { type: String, required: true },
        email: { type: String, required: true },
        address: {
            city: { type: String, required: true },
            street: { type: String, required: true },
            zipcode: { type: String, required: true }
        }
    },
    additional_details: {
        languages: { type: [String], required: true },
        education: [
            {
                degree: { type: String, required: true },
                university: { type: String, required: true },
                year: { type: Number, required: true }
            }
        ],
        certifications: { type: [String], required: true },
        experience: { type: String, required: true }
    },
    appointments: { type: [String], default: [] }
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

async function newDoctorApointment(doctorId, apointmentDetails) {
  const result = await Doctor.updateOne(
    { _id: doctorId },
    { $set: { appointments: {
      patienId : apointmentDetails.patienId,
      date : apointmentDetails.date
    } } }
  );
  return result.modifiedCount === 1;
}

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
  newDoctorApointment,
  deleteDoctor,
};
