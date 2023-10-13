const express = require("express")
const app = express()
const bodyParser = require("body-parser")
const connection = require("./database/database")
const Pergunta = require("./database/pergunta")
const Resposta = require("./database/Resposta")


connection.authenticate().then(() =>{
   console.log('conexão feita com o banco de dados')
})
.catch((msgErro)=>{
    console.log(msgErro)
})


// Estou dizendo pro express usar o ejs como view engine!!
app.set('view engine', 'ejs')
app.use(express.static('public'))

app.use(bodyParser.urlencoded({extended:false}))
app.use(bodyParser.json())

app.get("/", (request, response) =>{
    // Select * all from perguntas
    Pergunta.findAll({raw: true, order:[
        ['id','DESC']
    ]}).then((perguntas) =>{
        response.render('index', { 
            perguntas: perguntas
        });
    })
    
});

app.get("/perguntar", (request, response) =>{
    response.render('perguntar');
});

app.post("/salvarpergunta", (request, response) =>{
    var titulo = request.body.titulo
    var descricao = request.body.descricao
    Pergunta.create({
        titulo,
        descricao
    }).then(() =>{
        response.redirect("/")
    });
});

app.get("/pergunta/:id", (request, response) =>{
    var id = request.params.id
    Pergunta.findOne({
        where: {id: id}
    }).then(pergunta =>{
        if(pergunta != undefined){

            Resposta.findAll({
                where: {perguntaId: pergunta.id},
                order: [
                    ['id','DESC']
                ]
            }).then(respostas => {
                response.render("pergunta",{
                    pergunta: pergunta,
                    respostas: respostas
                 });
            });
        }else{ // não encontrada
            response.redirect("/")
        }
    })
});

app.post("/responder", (request, response) =>{
    var corpo = request.body.corpo
    var perguntaId = request.body.pergunta
    Resposta.create({
        corpo,
        perguntaId
    }).then(() =>{
        response.redirect("/pergunta/"+ perguntaId)
    })
});


app.listen(3333, () =>{
    console.log('App rodando!')
});