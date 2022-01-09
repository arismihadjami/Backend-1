module.exports = app => {
    const statusbookings = require('../controllers/statusbooking.controller');

    const router = require('express').Router();

    // Create a new Statusbooking
    router.post("/add", statusbookings.create);

    // Retrieve all Statusbooking
    router.get("/", statusbookings.findAll);

    // Retrieve a single Statusbooking with id
    router.get("/:id", statusbookings.findOne);

    // Update a Statusbooking with id
    router.put("/update/:id", statusbookings.update);

    // Delete a Statusbooking with id
    router.delete("/delete/:id", statusbookings.delete);

    app.use('/api/statusbooking', router);
};