const Sequelize = require("sequelize")
const connection = require("./database")

const Resposta = connection.define("respostas", {
    corpo:{
        type: Sequelize.TEXT,
        allowNUll: false
    },
    perguntaId:{
        type: Sequelize.INTEGER,
        allowNUll: false
    }
});

Resposta.sync({force:false})
module.exports = Resposta