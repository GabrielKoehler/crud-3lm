module.exports = (sequelize, Sequelize) => {
    const Funcionario = sequelize.define(
        "funcionario", {
        id: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        nome: {
            type: Sequelize.STRING(50),
            allowNull: false
        },
        sobrenome: {
            type: Sequelize.STRING(50),
            allowNull: false
        },
        dataNascimento: {
            type: Sequelize.DATE,
            allowNull: false
        },
        salario: {
            type: Sequelize.DECIMAL(10, 2),
            allowNull: false
        }
    });
    
    return Funcionario;
};