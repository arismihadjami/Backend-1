module.exports = (sequelize, Sequelize) => {
    const Pelanggan = sequelize.define("pelanggan", {
        id: {
            type: Sequelize.INTEGER
        },
        full_name: {
            type: Sequelize.STRING
        },
        username: {
            type: Sequelize.STRING
        },
        password: {
            type: Sequelize.VARCHAR
        }
    });

    return Pelanggan;
}