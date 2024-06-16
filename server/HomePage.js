const express = require("./npm/node_modules/express/lib/express");
const app = express();

const port = 5500;

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

app.listen(port, () => {
  console.log("Server started!");
});
