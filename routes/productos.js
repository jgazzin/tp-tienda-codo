const express = require('express');

const router_productos = express.Router();
productosController = require('../controller/productos_controller');


router_productos.get("/", productosController.obtenerProductos);
router_productos.get("/:id", productosController.obtenerProductoID);
router_productos.get("/:categoria", productosController.obtenerProductoCategoria);
router_productos.post("/", productosController.creatProducto);
router_productos.put("/:id", productosController.modificarProducto);
router_productos.delete("/:id", productosController.borrarProducto);

module.exports = router_productos;
