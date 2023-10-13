const Sequelize = require("sequelize")
const connection = require("./database")

const Pergunta = connection.define('pergunta',{
    titulo:{
        type: Sequelize.STRING,
        allowNUll: false
    },
    descricao:{
        type: Sequelize.TEXT,
        allowNUll: false
    }
});

Pergunta.sync({force: false}).then(() =>{
    console.log('Criou a tabela!')
});

module.exports = Pergunta