const express = require('express');

const router_productos = express.Router();
productosController = require('../controller/productos_controller');


router_productos.get("/", productosController.obtenerProductos);
//agregue este get
router_productos.get('/:id', productosController.obtenerUserID);
//router_productos.get("/:nombre", productosController.obtenerProductoNombre);
//router_productos.get("/:categoria", productosController.obtenerProductoCategoria);
router_productos.post("/", productosController.creatProducto);
router_productos.put("/:id", productosController.modificarProducto);
router_productos.delete("/:id", productosController.borrarProducto);

module.exports = router_productos;