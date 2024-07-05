const express = require('express');

const router_vendidos = express.Router();
vendidosController = require('../controller/vendidos_controller');


router_vendidos.get("/", vendidosController.obtenerVendidos);
// router_productos.get("/:id", productosController.obtenerProductoID);
router_vendidos.post("/", vendidosController.crearVendido);
// router_vendidos.put("/:id", vendidosControllerController.modificarProducto);
router_vendidos.delete("/:id", vendidosController.borrarVendido);

module.exports = router_vendidos;