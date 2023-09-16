const express = require('express');
const rotas = express();

rotas.get('/', (req, res) => {
    res.json({ mensagem: 'ok' });
});

// Cadastrar Usuário
// Fazer Login
// Detalhar Perfil do Usuário Logado
// Editar Perfil do Usuário Logado
// Listar categorias
// Listar transações
// Detalhar transação
// Cadastrar transação
// Editar transação
// Remover transação
// Obter extrato de transações
// [Extra] Filtrar transações por categoria

module.exports = rotas;
