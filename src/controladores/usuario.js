const pool = require('../conexao.js');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const senhaJwt = require('../senhaJwt.js');

const cadastrarUsuario = async (req, res) => {
    const { nome, email, senha } = req.body;

    if (!nome || !email || !senha) {
        return res.status(400).json({ mensagem: 'Os campos nome, email e senha são obrigátorios' });
    }

    try {
        const emailExiste = await pool.query(`select * from usuarios where email = $1`, [email]);

        if (emailExiste.rowCount > 0) {
            return res.status(400).json({ mensagem: 'Já existe usuário cadastrado com o e-mail informado.' })
        }

        const senhaCriptografada = await bcrypt.hash(senha, 10);
        const query = "insert into usuarios (nome, email, senha) values ($1, $2, $3) returning *"
        const values = [nome, email, senhaCriptografada];
        const { rows } = await pool.query(query, values);

        const novoUsuario = {
            id: rows[0].id,
            nome: rows[0].nome,
            email: rows[0].email
        };
        return res.status(201).json(novoUsuario);
    } catch (error) {
        console.log(error);
        return res.status(500).json({ mensagem: `Erro interno do Servidor. ${error}` });
    }

};

const login = async (req, res) => {
    const { email, senha } = req.body;

    if (!email || !senha) {
        return res.status(400).json({ mensagem: 'Os campos email e senha são obrigátorios' });
    }

    try {
        const { rows } = await pool.query(`select * from usuarios where email = $1`, [email]);

        if (rows.length === 0) {
            return res.status(401).json({ mensagem: 'Usuário e/ou senha inválido(s).' });
        }

        const { senha: senhaDigitada, ...usuario } = rows[0];

        const senhaValida = await bcrypt.compare(senha, senhaDigitada);

        if (!senhaValida) {
            return res.status(401).json({ mensagem: 'Usuário e/ou senha inválido(s).' });
        }

        const token = jwt.sign(
            { id: usuario.id },
            senhaJwt,
            { expiresIn: '8h' }
        )

        return res.json({
            usuario,
            token,
        })


    } catch (error) {
        return res.status(500).json({ mensagem: `Erro interno do Servidor. ${error}` });
    }
};

const detalharPerfil = (req, res) => {

};

const editarPerfil = (req, res) => {

};

const listarCategorias = (req, res) => {

};


module.exports = {
    cadastrarUsuario,
    login,
    detalharPerfil,
    editarPerfil,
    listarCategorias
}