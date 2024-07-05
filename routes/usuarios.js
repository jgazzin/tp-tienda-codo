const express = require('express');

const router_usuarios = express.Router();
const userController = require('../controller/user_controller.js');

router_usuarios.get('/', userController.obtenerUsuarios)
router_usuarios.get("/:id", userController.obtenerUserID);
router_usuarios.post("/", userController.creatUser);
router_usuarios.put("/:id", userController.modificarUser);
router_usuarios.delete("/:id", userController.borrarUser);

module.exports = router_usuarios;