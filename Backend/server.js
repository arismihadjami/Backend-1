const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const db = require('./app/model/');

const app = express();

const corsOptions = {
    origin: 'http://localhost:5000',
}

app.use(cors(corsOptions));

// parse requests of content-type - application/json
app.use(bodyParser.json());

// parse requests of content-type - application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));

// Database Model Configuration
db.sequelize.sync();

/* Dev Mode */
// db.sequelize.sync({ force: 1 }).then(() => {
//     console.log("Drop and re-sync db.");
// });

// simple route
app.get("/", (req, res) => {
    res.json({ message: "Welcome to Go ATV Adventure" });
});

// set port, listen for requests
require("./app/routes/admin.routes")(app);
require("./app/routes/booking.routes")(app);
require("./app/routes/pelanggan.routes")(app);
require("./app/routes/statusbooking.routes")(app);

const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}.`);
});

