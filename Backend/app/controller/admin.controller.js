const { admins } = require('../models');
const db = require('../models');
const Admin = db.admins;
const Op = db.Sequelize.Op;

// Create and Save a new Admin
exports.create = (req, res) => {
    if (!req.body.id || !req.body.full_name || !req.body.username || !req.body.password) {
        res.status(500).send({
            message: 'Please fill all forms'
        });
        return;
    }

    const admins = {
        id: req.body.id,
        full_name: req.body.full_name,
        username: req.body.username,
        password: req.body.password
    };

    Admin.create(admins)
        .then(data => {
            res.send({ status: 'success', data: data });
        })
        .catch(error => {
            res.status(500).send({ status: error.message });
        });
};

// Retrieve all admins from the database.
exports.findAll = (req, res) => {
    const full_name = req.query.full_name;
    const condition = full_name ? {
        nama: {
            [Op.like]: `%${full_name}%`
        }
    } : null;

    Admin.findAll({ where: condition })
        .then(data => {
            res.send(data);
        })
        .catch(error => {
            res.status(500).send({ status: error.message });
        });
};

// Find a single Admin with an id
exports.findOne = (req, res) => {
    const id = req.params.id;

    Admin.findOne({ where: { id: id } })
        .then(data => {
            res.send(data)
        })
        .catch(error => {
            res.status(404).send({ status: error.message || 'Note not found' });
        })
};

// Update a Admin by the id in the request
exports.update = (req, res) => {
    const id = req.params.id;

    Admin.update(req.body, {
            where: { id: id }
        })
        .then(num => {
            if (num == 1) {
                res.send({
                    message: "Admin was updated successfully."
                });
            } else {
                res.send({
                    message: `Cannot update Admin with id=${id}. Maybe Admin was not found or req.body is empty!`
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: "Error updating Admin with id=" + id
            });
        });
};

// Delete a Admin with the specified id in the request
exports.delete = (req, res) => {
    const id = req.params.id;

    Admin.destroy({
            where: { id: id }
        })
        .then(num => {
            if (num == 1) {
                res.send({
                    message: "Admin was deleted successfully!"
                });
            } else {
                res.send({
                    message: `Cannot delete Admin with id=${id}. Maybe Admin was not found!`
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: "Could not delete Admin with id=" + id
            });
        });
};