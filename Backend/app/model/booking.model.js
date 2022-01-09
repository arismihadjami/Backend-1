module.exports = (sequelize, Sequelize) => {
    const Booking = sequelize.define("booking", {
        id: {
            type: Sequelize.INTEGER
        },
        nama: {
            type: Sequelize.STRING
        },
        single_tandem: {
            type: Sequelize.STRING
        },
        tanggal: {
            type: Sequelize.DATE
        },
        jumlahATV: {
            type: Sequelize.INTEGER
        }
    });

    return Booking;
}