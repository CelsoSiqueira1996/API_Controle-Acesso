const { verify, decode } = require('jsonwebtoken');
const jsonSecret = require('../config/jsonSecret');

module.exports = async (req, res, next) => {
    const token = req.headers.authorization;

    if(!token) {
        return res.status(401).send({message: 'Access token  não informado'});
    }

    const [, accessToken ] = token.split(' ');

    try{
        verify(accessToken, jsonSecret.secret);

        const { id, email } = decode(accessToken);

        req.usuarioId = id;
        req.usuarioEmail = email;
        next();
    } catch(error) {
        res.status(401).send({message: 'Usuário não autorizado'});
    }
}