module.exports = app => {
    const pelanggans = require('../controllers/pelanggan.controller');

    const router = require('express').Router();

    // Create a new Pelanggan
    router.post("/add", pelanggans.create);

    // Retrieve all Pelanggans
    router.get("/", pelanggans.findAll);

    // Retrieve a single Pelanggan with id
    router.get("/:id", pelanggans.findOne);

    // Update a Pelanggan with id
    router.put("/update/:id", pelanggans.update);

    // Delete a Pelanggan with id
    router.delete("/delete/:id", pelanggans.delete);

    app.use('/api/pelanggan', router);
};