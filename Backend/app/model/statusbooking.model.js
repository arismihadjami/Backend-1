module.exports = (sequelize, Sequelize) => {
    const Statusbooking = sequelize.define("statusbooking", {
        id: {
            type: Sequelize.INTEGER
        },
        kode_booking: {
            type: Sequelize.VARCHAR
        },
        total_harga: {
            type: Sequelize.INTEGER
        },
        id_booking: {
            type: Sequelize.INTEGER
        }
    });

    return Statusbooking;
}