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
  full_name: String,
  id_number: Number,
  imgSrc: String,
  contact_information: Object,
  appointments: [Object],
  
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
  deleteDoctor,
};
