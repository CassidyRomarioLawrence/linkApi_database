const express = require('express');
const cors = require('cors');

const app = express();

let corsOptions = {
    origin: "http://localhost:8081"
};

app.use(cors(corsOptions));

// parse request of content-type - application/json
app.use(express.json());

// parse request of content-type - application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true }));

// simple route
app.get("/", (req, res) => {
    res.json({ message: "Welcome to my application" });
});

require("./app/routes/players.routes.js")(app);

// set port, listen for requests
const PORT = process.env.PORT || 4321;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}.`);
});