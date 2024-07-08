const database = require('../models');
const uuid = require('uuid');

class RoleService {

    async cadastrar(dto) {
        const role = await database.roles.findOne({
            where: {
                nome: dto.nome
            }
        });

        if(role) {
            throw new Error("Role já cadastrado!");
        }

        try{
            const roleCriado = await database.roles.create({
                ...dto,
                id: uuid.v4()
            });
    
            return roleCriado;
        } catch(error) {
            throw new Error('Erro ao cadastrar role');
        }

    }

    async buscarTodosRoles() {
        try {
            const roles = await database.roles.findAll();
    
            return roles;
        } catch(error) {
            throw new Error('Falha no servidor');
        }
    }

    async buscarPorId(id) {
        try {
            const role = await database.roles.findOne({
                where: {
                    id: id
                }
            });
            if(!role) {
                throw new Error('Role não cadastrado');
            }

            return role;
        } catch(error) {
            throw error;
        }
    }

    async editarRole(dto) {
        const role = await this.buscarPorId(dto.id);
        try {
            role.nome = dto.nome;
            role.descricao = dto.descricao;

            await role.save();
            return await role.reload();
        } catch(error) {
            throw new Error('Erro ao editar role!')
        }
    }

    async deletarRolePorId(id) {
        await this.buscarPorId(id)
        try {
            await database.roles.destroy({
                where: {
                    id: id
                }
            })
        } catch(error) {
            throw new Error('Falha no servidor');
        }
    }

}

module.exports = RoleService;