const { pelanggans } = require('../models');
const db = require('../models');
const Pelanggan = db.pelanggans;
const Op = db.Sequelize.Op;

// Create and Save a new Pelanggan
exports.create = (req, res) => {
    if (!req.body.id || !req.body.full_name || !req.body.username || !req.body.password) {
        res.status(500).send({
            message: 'Please fill all forms'
        });
        return;
    }

    const pelanggans = {
        id: req.body.id,
        full_name: req.body.full_name,
        username: req.body.username,
        password: req.body.password
    };

    Pelanggan.create(pelanggans)
        .then(data => {
            res.send({ status: 'success', data: data });
        })
        .catch(error => {
            res.status(500).send({ status: error.message });
        });
};

// Retrieve all pelanggans from the database.
exports.findAll = (req, res) => {
    const full_name = req.query.full_name;
    const condition = full_name ? {
        nama: {
            [Op.like]: `%${full_name}%`
        }
    } : null;

    Pelanggan.findAll({ where: condition })
        .then(data => {
            res.send(data);
        })
        .catch(error => {
            res.status(500).send({ status: error.message });
        });
};

// Find a single Pelanggan with an id
exports.findOne = (req, res) => {
    const id = req.params.id;

    Pelanggan.findOne({ where: { id: id } })
        .then(data => {
            res.send(data)
        })
        .catch(error => {
            res.status(404).send({ status: error.message || 'Note not found' });
        })
};

// Update a Pelanggan by the id in the request
exports.update = (req, res) => {
    const id = req.params.id;

    Pelanggan.update(req.body, {
            where: { id: id }
        })
        .then(num => {
            if (num == 1) {
                res.send({
                    message: "Pelanggan was updated successfully."
                });
            } else {
                res.send({
                    message: `Cannot update Pelanggan with id=${id}. Maybe Pelanggan was not found or req.body is empty!`
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: "Error updating Pelanggan with id=" + id
            });
        });
};

// Delete a Pelanggan with the specified id in the request
exports.delete = (req, res) => {
    const id = req.params.id;

    Pelanggan.destroy({
            where: { id: id }
        })
        .then(num => {
            if (num == 1) {
                res.send({
                    message: "Pelanggan was deleted successfully!"
                });
            } else {
                res.send({
                    message: `Cannot delete Pelanggan with id=${id}. Maybe Pelanggan was not found!`
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: "Could not delete Pelanggan with id=" + id
            });
        });
};