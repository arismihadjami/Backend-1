const { bookings } = require('../models');
const db = require('../models');
const Booking = db.bookings;
const Op = db.Sequelize.Op;

// Create and Save a new Booking
exports.create = (req, res) => {
    if (!req.body.id || !req.body.nama || !req.body.single_tandem || !req.body.tanggal || !req.body.jumlahATV) {
        res.status(500).send({
            message: 'Please fill all forms'
        });
        return;
    }

    const bookings = {
        id: req.body.id,
        nama: req.body.nama,
        single_tandem: req.body.single_tandem,
        tanggal: req.body.tanggal,
        jumlahATV: req.body.jumlahATV
    };

    Booking.create(bookings)
        .then(data => {
            res.send({ status: 'success', data: data });
        })
        .catch(error => {
            res.status(500).send({ status: error.message });
        });
};

// Retrieve all bookings from the database.
exports.findAll = (req, res) => {
    const nama = req.query.nama;
    const condition = nama ? {
        nama: {
            [Op.like]: `%${nama}%`
        }
    } : null;

    Booking.findAll({ where: condition })
        .then(data => {
            res.send(data);
        })
        .catch(error => {
            res.status(500).send({ status: error.message });
        });
};

// Find a single Booking with an id
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

    Booking.update(req.body, {
            where: { id: id }
        })
        .then(num => {
            if (num == 1) {
                res.send({
                    message: "Booking was updated successfully."
                });
            } else {
                res.send({
                    message: `Cannot update Booking with id=${id}. Maybe Booking was not found or req.body is empty!`
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: "Error updating Booking with id=" + id
            });
        });
};

// Delete a Booking with the specified id in the request
exports.delete = (req, res) => {
    const id = req.params.id;

    Booking.destroy({
            where: { id: id }
        })
        .then(num => {
            if (num == 1) {
                res.send({
                    message: "Booking was deleted successfully!"
                });
            } else {
                res.send({
                    message: `Cannot delete Booking with id=${id}. Maybe Admin was not found!`
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: "Could not delete Booking with id=" + id
            });
        });
};