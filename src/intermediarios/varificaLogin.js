const jwt = require('jsonwebtoken');
const pool = require('../conexao');
const senhaJwt = require('../senhaJwt');

const verificaLogin = async (req, res, next) => {

    try {
        const token = req.headers.authorization.split(' ')[1];

        if (!token) {
            return res.status(400).json({ mensagem: 'Para acessar este recurso um token de autenticação válido deve ser enviado.' });
        }

        const { id } = jwt.verify(token, senhaJwt);
        const { rows } = await pool.query("select * from usuarios where id = $1", [id]);

        if (rows.length === 0) {
            return res.status(401).json({ mensagem: 'Para acessar este recurso um token de autenticação válido deve ser enviado.' });
        }

        const usuario = {
            id: rows[0].id,
            nome: rows[0].nome,
            email: rows[0].email
        };

        req.usuario = usuario;
        next()

    } catch (error) {
        return res.status(400).json({ mensagem: 'Para acessar este recurso um token de autenticação válido deve ser enviado.' });

    }
}

module.exports = verificaLogin;