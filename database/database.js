const Sequelize = require('sequelize')

const connection = new Sequelize('perguntas','root','12345678',{
    host: 'localhost',
    dialect: 'mysql'
});

module.exports = connection