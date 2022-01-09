module.exports = app => {
    const bookings = require('../controllers/booking.controller');

    const router = require('express').Router();

    // Create a new Booking
    router.post("/add", bookings.create);

    // Retrieve all Bookings
    router.get("/", bookings.findAll);

    // Retrieve a single Booking with id
    router.get("/:id", bookings.findOne);

    // Update a Booking with id
    router.put("/update/:id", bookings.update);

    // Delete a Booking with id
    router.delete("/delete/:id", bookings.delete);

    app.use('/api/booking', router);
};