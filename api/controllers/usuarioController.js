const UsuarioService = require('../services/usuarioService');
const usuarioService = new UsuarioService();

class UsuarioController {

    static async cadastrar(req, res) {
        const { nome, email, senha } = req.body;

        try {
            const usuario = await usuarioService.cadastrar({ nome, email, senha });
            res.status(201).send(usuario);
        } catch(error) {
            res.status(400).send({message: error.message});
        }
    }

    static async buscarPorId(req, res) {
        const id = req.params.id;

        try{
            const usuario = await usuarioService.buscarPorId(id);
            res.status(200).send(usuario);
        } catch(error) {
            res.status(400).send({message: error.message});
        }
    }

    static async buscarTodosUsuarios(req, res) {
        try{
            const usuarios = await usuarioService.buscarTodosUsuarios();
            res.status(200).json(usuarios);
        } catch(error) {
            res.status(400).send({message: error.message});
        }
    }

    static async deletarUsuarioPorId(req, res) {
        try{
            const id = req.params.id;
            await usuarioService.deletarUsuarioPorId(id);
            res.status(200).send({ message: 'Usuário deletado com sucesso!' })
        } catch(error){
            res.status(400).send({message: error.message});        
        }
    }

    static async editarUsuario(req, res) {
        try{
            const id = req.params.id;
            const { nome, email } = req.body;
            const usuarioEditado = await usuarioService.editarUsuario({id, nome, email});
            res.status(200).send(usuarioEditado)
        } catch(error) {
            res.status(400).send({message: error.message});
        }

    }

}

module.exports = UsuarioController;