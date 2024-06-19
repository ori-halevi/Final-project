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

const userSchema = new Schema({
  full_name: { type: String, required: true },
  id_number: { type: Number, required: true, unique: true },
  password: { type: String, required: true },
  payment_method: { type: String, required: true },
  health_insurance: { type: String, required: true },
  age: { type: Number, required: true },
  contact_information: {
    phone: { type: String, required: true },
    email: { type: String, required: true },
  },
  appointments: [
    {
      doctorId: { type: mongoose.Schema.Types.ObjectId, required: true },
      date: { type: Date, required: true },
    },
  ],
});

const User = mongoose.model("users", userSchema);

async function newUserAppointment(userId, appointmentDetails) {
  const result = await User.updateOne(
    { _id: userId },
    {
      $push: {
        appointments: {
          doctorId: appointmentDetails.doctorId,
          date: appointmentDetails.date,
        },
      },
    }
  );
  return result.modifiedCount === 1;
}

async function getUsers() {
  const result = await User.find();
  return result;
}

async function getUserById(userId) {
  const result = await User.findOne({ _id: userId });
  return result;
}

async function createUser(newUser) {
  const result = await User.create(newUser);
  return result;
}

async function updateUserName(userId, newName) {
  const result = await User.updateOne(
    { _id: userId },
    { $set: { name: newName } }
  );
  return result.modifiedCount === 1;
}

async function deleteUser(userId) {
  const result = await User.deleteOne({ _id: userId });
  return result.deletedCount === 1;
}

main();

module.exports = {
  getUsers,
  getUserById,
  createUser,
  updateUserName,
  deleteUser,
  newUserAppointment,
};
