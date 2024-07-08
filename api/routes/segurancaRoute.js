const express = require('express');
const SegurancaController = require('../controllers/segurancaController');

const router = express.Router();

router
    .post('/seguranca/acl', SegurancaController.cadastrarAcl)
    .post('/seguranca/permissoes-roles', SegurancaController.cadastrarPermissoesRoles);

module.exports = router;