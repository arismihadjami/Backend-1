const { statusbookings } = require('../models');
const db = require('../models');
const Statusbooking = db.statusbookings;
const Op = db.Sequelize.Op;

// Create and Save a new Statusbooking
exports.create = (req, res) => {
    if (!req.body.id || !req.body.kode_booking || !req.body.total_harga ||  !req.body.id_booking) {
        res.status(500).send({
            message: 'Please fill all forms'
        });
        return;
    }

    const statusbookings = {
        id: req.body.id,
        kode_booking: req.body.kode_booking,
        total_harga: req.body.total_harga,
        id_booking: req.body.id_booking
    };

    Statusbooking.create(statusbookings)
        .then(data => {
            res.send({ status: 'success', data: data });
        })
        .catch(error => {
            res.status(500).send({ status: error.message });
        });
};

// Retrieve all statusbookings from the database.
exports.findAll = (req, res) => {
    const kode_booking = req.query.kode_booking;
    const condition = kode_booking ? {
        kode_booking: {
            [Op.like]: `%${kode_booking}%`
        }
    } : null;

    Statusbooking.findAll({ where: condition })
        .then(data => {
            res.send(data);
        })
        .catch(error => {
            res.status(500).send({ status: error.message });
        });
};

// Find a single Statusooking with an id
exports.findOne = (req, res) => {
    const id = req.params.id;

    Booking.findOne({ where: { id: id } })
        .then(data => {
            res.send(data)
        })
        .catch(error => {
            res.status(404).send({ status: error.message || 'Note not found' });
        })
};

// Update a Booking by the id in the request
exports.update = (req, res) => {
    const id = req.params.id;

    Statusbooking.update(req.body, {
            where: { id: id }
        })
        .then(num => {
            if (num == 1) {
                res.send({
                    message: "Statusbooking was updated successfully."
                });
            } else {
                res.send({
                    message: `Cannot update Statusbooking with id=${id}. Maybe Statusbooking was not found or req.body is empty!`
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: "Error updating Statusbooking with id=" + id
            });
        });
};

// Delete a Statusbooking with the specified id in the request
exports.delete = (req, res) => {
    const id = req.params.id;

    Statusbooking.destroy({
            where: { id: id }
        })
        .then(num => {
            if (num == 1) {
                res.send({
                    message: "Statusbooking was deleted successfully!"
                });
            } else {
                res.send({
                    message: `Cannot delete Statusbooking with id=${id}. Maybe Statusbooking was not found!`
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: "Could not delete Statusbooking with id=" + id
            });
        });
};