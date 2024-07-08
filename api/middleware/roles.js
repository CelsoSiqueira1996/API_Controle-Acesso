const database = require('../models');

function roles(ListaRoles) {
    return async (req, res, next) => {
        const { usuarioId } = req;

        const usuario = await database.usuarios.findOne({
            include: [
                {
                    model: database.roles,
                    as: 'usuario_roles',
                    attributes: ['id', 'nome']
                }
            ],
            where: {
                id: usuarioId
            }
        });

        if(!usuario) {
            return res.status(401).send({message: 'Usuário não cadastrado'});
        }

        const rolesCadastradas = usuario.usuario_roles
            .map((role) => role.nome)
            .some((role) => ListaRoles.includes(role))

        if(!rolesCadastradas) {
            return res.status(401).send({message: 'Usuário não possui acesso a essa rota'})
        }

        next();
    }
}

module.exports = roles;