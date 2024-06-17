const express = require('express');
const cors = require('cors');
const app = express();

// Middleware to parse incoming JSON requests
app.use(express.json());

// Use CORS middleware
app.use(cors());

const teslas = [
    { id: 1, name: "Model S", imgSrc: "https://digitalassets.tesla.com/tesla-contents/image/upload/f_auto,q_auto/Mega-Menu-Vehicles-Model-S.png" },
    { id: 2, name: "Model 3", imgSrc: "https://digitalassets.tesla.com/tesla-contents/image/upload/f_auto,q_auto/Mega-Menu-Vehicles-Model-3-Performance-LHD.png" },
    { id: 3, name: "Model X", imgSrc: "https://digitalassets.tesla.com/tesla-contents/image/upload/f_auto,q_auto/Mega-Menu-Vehicles-Model-X.png" },
    { id: 4, name: "Model S", imgSrc: "https://digitalassets.tesla.com/tesla-contents/image/upload/f_auto,q_auto/Mega-Menu-Vehicles-Model-S.png" },
    { id: 5, name: "Model 3", imgSrc: "https://digitalassets.tesla.com/tesla-contents/image/upload/f_auto,q_auto/Mega-Menu-Vehicles-Model-3-Performance-LHD.png" },
    { id: 6, name: "Model X", imgSrc: "https://digitalassets.tesla.com/tesla-contents/image/upload/f_auto,q_auto/Mega-Menu-Vehicles-Model-X.png" },
    { id: 7, name: "Model S", imgSrc: "https://digitalassets.tesla.com/tesla-contents/image/upload/f_auto,q_auto/Mega-Menu-Vehicles-Model-S.png" },
    { id: 8, name: "Model 3", imgSrc: "https://digitalassets.tesla.com/tesla-contents/image/upload/f_auto,q_auto/Mega-Menu-Vehicles-Model-3-Performance-LHD.png" },
    { id: 9, name: "Model X", imgSrc: "https://digitalassets.tesla.com/tesla-contents/image/upload/f_auto,q_auto/Mega-Menu-Vehicles-Model-X.png" },
    { id: 10, name: "Model S", imgSrc: "https://digitalassets.tesla.com/tesla-contents/image/upload/f_auto,q_auto/Mega-Menu-Vehicles-Model-S.png" },
    { id: 11, name: "Model 3", imgSrc: "https://digitalassets.tesla.com/tesla-contents/image/upload/f_auto,q_auto/Mega-Menu-Vehicles-Model-3-Performance-LHD.png" },
    { id: 12, name: "Model X", imgSrc: "https://digitalassets.tesla.com/tesla-contents/image/upload/f_auto,q_auto/Mega-Menu-Vehicles-Model-X.png" },
    { id: 13, name: "Model S", imgSrc: "https://digitalassets.tesla.com/tesla-contents/image/upload/f_auto,q_auto/Mega-Menu-Vehicles-Model-S.png" },
    { id: 14, name: "Model 3", imgSrc: "https://digitalassets.tesla.com/tesla-contents/image/upload/f_auto,q_auto/Mega-Menu-Vehicles-Model-3-Performance-LHD.png" },
    { id: 15, name: "Model X", imgSrc: "https://digitalassets.tesla.com/tesla-contents/image/upload/f_auto,q_auto/Mega-Menu-Vehicles-Model-X.png" },
    { id: 16, name: "Model S", imgSrc: "https://digitalassets.tesla.com/tesla-contents/image/upload/f_auto,q_auto/Mega-Menu-Vehicles-Model-S.png" },
    { id: 17, name: "Model 3", imgSrc: "https://digitalassets.tesla.com/tesla-contents/image/upload/f_auto,q_auto/Mega-Menu-Vehicles-Model-3-Performance-LHD.png" },
    { id: 18, name: "Model X", imgSrc: "https://digitalassets.tesla.com/tesla-contents/image/upload/f_auto,q_auto/Mega-Menu-Vehicles-Model-X.png" },
];

// GET all cars
app.get('/api/teslas', (req, res) => {
    res.send(teslas);
});

// GET car by id
app.get('/api/teslas/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const car = teslas.find(c => c.id === id);
    if (!car) return res.status(404).send('Car not found');
    res.send(car);
});

// POST a new car
app.post('/api/teslas', (req, res) => {
    const car = {
        id: teslas.length + 1,
        name: req.body.name,
        imgSrc: req.body.imgSrc
    };
    teslas.push(car);
    res.send(car);
});

// PUT (update) a car by id
app.put('/api/teslas/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const car = teslas.find(c => c.id === id);
    if (!car) return res.status(404).send('Car not found');

    car.name = req.body.name;
    console.log(car);
    res.send(car);
});

// DELETE a car by id
app.delete('/api/teslas/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const carIndex = teslas.findIndex(c => c.id === id);
    if (carIndex === -1) return res.status(404).send('Car not found');

    const deletedCars = teslas.splice(carIndex, 1);
    if (deletedCars) console.log(deletedCars);
    res.send(deletedCars[0]);
});

const port = process.env.PORT || 8080;
app.listen(port, () => console.log(`Listening on port ${port}...`));
