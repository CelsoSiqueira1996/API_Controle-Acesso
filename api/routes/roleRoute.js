const express = require('express');
const RoleController = require('../controllers/roleController');

const router = express.Router();

router
    .post('/role', RoleController.cadastrar)
    .get('/role', RoleController.buscarTodosRoles)
    .get('/role/id/:id', RoleController.buscarPorId)
    .delete('/role/id/:id', RoleController.deletarRolePorId)
    .put('/role/id/:id', RoleController.editarRole)

module.exports = router;