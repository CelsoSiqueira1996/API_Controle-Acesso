const RoleService = require('../services/roleService');
const roleService = new RoleService();

class RoleController {

    static async cadastrar(req, res) {
        const { nome, descricao } = req.body;

        try{
            const role = await roleService.cadastrar({nome, descricao});
            
            res.status(201).send(role);
        } catch(error) {
            res.status(400).send({message: error.message});
        }
    }

    static async buscarTodosRoles(req, res) {
        try {
            const roles = await roleService.buscarTodosRoles();
            res.status(200).send(roles);
        } catch (error) {
            res.status(400).send({message: error.message});
        }
    }

    static async buscarPorId(req, res) {
        const id = req.params.id;

        try {
            const role = await roleService.buscarPorId(id);
            res.status(200).send(role);
        } catch(error) {
            res.status(400).send({message: error.message});
        }
    }

    static async editarRole(req, res) {
        const id = req.params.id;
        const { nome, descricao } = req.body;
        try {
            const role = await roleService.editarRole({ id, nome, descricao });
            res.status(200).send(role);
        } catch(error) {
            res.status(400).send({message: error.message});
        }
    }

    static async deletarRolePorId(req, res) {
        const id = req.params.id;
        try {
            await roleService.deletarRolePorId(id);
            res.status(200).send({ message: 'Role deletado com sucesso!' })
        } catch(error){
            res.status(400).send({message: error.message});        
        }
    }

}

module.exports = RoleController;