module.exports = (sequelize, Sequelize) => {
    const Cargo = sequelize.define("cargo", {
        id: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        descricao: {
            type: Sequelize.STRING(50),
            allowNull: false
        },
    });

    return Cargo;
};


