const express = require('express');
const app = express();
const morgan = require('morgan');
const bodyParser = require('body-parser');

const rotaProdutos = require('./routes/produtos');
const rotaPedidos = require('./routes/pedidos');
const rotaUsuarios = require('./routes/usuarios');

app.use(morgan('dev')); //MONITORA TODA EXECUÇÃO NO TERMINAL
app.use(bodyParser.urlencoded({ extended: false })); //APENAS DADOS SIMPLES
app.use(bodyParser.json()); //SÓ ACEITA .JSON DE ENTRADA

app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*') //* Quer dizer o nome do servidor, exemplo o http do serv, * qr dizer que esta disponivel para todos
    res.header('Access-Control-Allow-Header',
    'X-Requrested-With, Content-Type, Accept, Authorization,');

    if (req.method === 'OPTIONS') {
        res.header('Access-Control-Allow-Methods', 'PUT,POST, PATCH, DELETE, GET');
        return res.status(200).send({});
    }

    next();

});




app.use('/produtos', rotaProdutos);
app.use('/pedidos', rotaPedidos);
app.use('/cadastro', rotaUsuarios);

// QUANDO NÃO ENCONTRA A ROTA, ENTRA NO ERRO
app.use((req, res, next) => {
    const erro = new Error('Não encontrado');
    erro.status = 404;
    next(erro);
});
app.use((erro, req, res, next) => {
    res.status(erro.status || 500);
    return res.send({
        erro:{
            mensagem: erro.message
        }
    });
});



module.exports = app;