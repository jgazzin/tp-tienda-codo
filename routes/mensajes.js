const express = require('express');

const router_mensajes = express.Router();
mensajesController = require('../controller/mensajes_controller');


router_mensajes.get("/", mensajesController.obtenerMensajes);
router_mensajes.post("/", mensajesController.crearMensaje);
router_mensajes.delete("/:id", mensajesController.borrarMensaje);

module.exports = router_mensajes;