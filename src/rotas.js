const express = require('express');
const { cadastrarUsuario, login, detalharPerfil, editarPerfil, listarCategorias } = require('./controladores/usuario.js');
const { listarTransacoes, detalharTransacao, cadastrarTransacao, editarTransacao, removerTransacao, obterExtrato } = require('./controladores/transacoes.js');
const verificaLogin = require('./intermediarios/varificaLogin.js');

const rotas = express();

rotas.post('/usuario', cadastrarUsuario);
rotas.post('/login', login);

rotas.use(verificaLogin);

rotas.get('/usuario', detalharPerfil);
rotas.put('/usuario', editarPerfil);

rotas.get('/categoria', listarCategorias);

rotas.get('/transacao', listarTransacoes);//[Extra]Filtrar transações por categoria
rotas.get('/transacao/:id', detalharTransacao);
rotas.post('/transacao', cadastrarTransacao);
rotas.put('/transacao/:id', editarTransacao);
rotas.delete('/transacao/:id', removerTransacao);
rotas.get('/transacao/extrato', obterExtrato);

module.exports = rotas;
