const express = require("./npm/node_modules/express/lib/express");
const cors = require("cors");
const app = express();
const dbUsers = require("./db_users");
const dbDoctors = require("./db_doctors");
const port = 8080;

// Middleware to parse incoming JSON requests
app.use(express.json());

// Use CORS middleware
app.use(cors());

// GET all Doctors name
app.get("/api/doctorsName", async (req, res) => {
  console.log("test");

  try {
    const doctersInfo = [];
    let doctors = await dbDoctors.getDoctors();
    doctors.forEach(function (doctor) {
      nameDocters.push(doctor.full_name);
    });
    res.send(nameDocters);
  } catch (error) {
    res.status(500).send();
  }
});

// GET car by id
app.get("/api/teslas/:id", async (req, res) => {
  try {
    const car = await db.getCarById(req.params.id);
    if (!car) return res.status(404).send();
    res.send(car);
    res.send(car);
  } catch (error) {
    res.status(500).send();
  }
});

// POST a new car
app.post("/api/teslas", async (req, res) => {
  try {
    const car = await db.createCar(req.body);
    res.status(201).send(car);
  } catch (error) {
    res.status(500).send();
  }
});

// PUT (update) a car by id
app.put("/api/teslas/:id", async (req, res) => {
  try {
    const result = await db.updateCarName(req.params.id, req.body.name);
    if (!result) return res.status(404).send();
    res.status(204).send();
  } catch (error) {
    console.log(error);
    res.status(500).send();
  }
});

// DELETE a car by id
app.delete("/api/teslas/:id", async (req, res) => {
  try {
    const result = await db.deleteCar(req.params.id);
    if (!result) return res.status(404).send();
    res.status(204).send();
  } catch (error) {
    console.log(error);
    res.status(500).send();
  }
});

const listContacts = [
  { Ori: "0543351321" },
  { Moshe: "0543265143" },
  { David: "0553348745" },
];

app.get("/", (req, res) => {
  res.send();
  res.send(listContacts);
  res.send("Welcome to our JSON server!");
});

app.get("/contacts", (req, res) => {
  res.json(listContacts);
});

app.get("/contacts/:n", (req, res) => {
  const n = req.params.n;
  if (n >= listContacts.length) {
    res.send("Contact out of range!");
  } else {
    res.send(listContacts[n]);
  }
});

app.post("/contacts", (res, req) => {
  const name = req.params.name;
  const number = req.params.number;
  if (!(number.length === 10)) {
    res.send("This number is not valid!");
  } else {
    listContacts[name] = number;
    res.json(listContacts);
  }
});

app.listen(port, () => console.log(`Listening on port ${port}...`));
