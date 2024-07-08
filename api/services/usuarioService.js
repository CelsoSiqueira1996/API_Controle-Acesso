const database = require('../models');
const { hash } = require('bcryptjs');
const uuid = require('uuid');

class UsuarioService {
    
    async cadastrar(dto) {       
        try{
            const usuario = await database.usuarios.findOne({
                where: {
                    email: dto.email
                }
            });
    
            if(usuario) {
                throw new Error('Usuario já cadastrado!')
            }
            const senhaHash = await hash(dto.senha, 8);
            const novoUsuario = await database.usuarios.create({
                id: uuid.v4(),
                nome: dto.nome,
                email: dto.email,
                senha: senhaHash
            });
                
            return novoUsuario;
        } catch(error) {
            throw error;
        }
    }

    async buscarPorId(id) {
        try{
            const usuario = await database.usuarios.findOne({
                where: {
                    id: id
                }
            });
    
            if(!usuario) {
                throw new Error("Usuário não encontrado.")
            }

            return usuario;

        } catch(error) {
            throw error;
        }
    }

    async buscarTodosUsuarios() {
        try{
            const usuarios = await database.usuarios.findAll();
            return usuarios;
        } catch(error) {
            throw new Error('Falha no servidor');
        }
    }

    async deletarUsuarioPorId(id) {
        await this.buscarPorId(id);
        try{
            await database.usuarios.destroy({
                where: {
                    id: id
                }
            })
        } catch(error) {
            throw new Error('Falha no servidor');
        }
    }

    async editarUsuario(dto) {
        const usuario = await this.buscarPorId(dto.id);
        try{
             usuario.nome = dto.nome;
             usuario.email = dto.email;
            
            await usuario.save();
            return await usuario.reload();
        }catch (error) {
            throw new Error('Erro ao editar usuário!')
        }

    }

}

module.exports = UsuarioService;