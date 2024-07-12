const db = require('../db/data_base');

const obtenerProductos = (req, res) => {
    const sql = 'SELECT * FROM tienda_productos';

    db.query(sql, (err, result) => {
        if(err) {
            throw err;
        }
        res.json(result);
    })
}


const obtenerProductoID = (req, res) => {
    const {id} = req.params;
    const sql = 'SELECT * FROM tienda_productos WHERE id = ?';


    db.query(sql, [id], (err, result) => {
        if(err) {
            throw err;
        } 
        res.json(result);
    })
    
};


const creatProducto = (req, res) => {
    const { nombre, descripcion, categoria, precio, vendedor, img } = req.body;
    const sql = 'INSERT INTO tienda_productos (nombre, descripcion, categoria, precio, vendedor, img) VALUES (?, ?, ?, ?, ?, ?)';

    db.query(sql, [nombre, descripcion, categoria, precio, vendedor, img], (err, result) => {
        if(err) {
            throw err;
        }
        res.json({
            mensaje: 'Producto creado con éxito',
            idUsuario: result.insertId
        });
    })
};

const modificarProducto = (req, res) => {
    const {id} = req.params;
    const {nombre, img, descripcion, categoria, precio, vendedor} = req.body;
    const sql = 'UPDATE tienda_productos SET nombre = ?, img = ?, descripcion = ?, categoria = ?, precio = ?, vendedor = ? WHERE id = ?';

    db.query(sql, [nombre, img, descripcion, categoria, precio, vendedor, id], (err, result) => {
        if(err) {
            throw err;
        }
        res.json({
            mensaje: 'Producto modificado con éxito'
        });
    })

};

const borrarProducto = (req, res) => {
    const {id} = req.params;
    const sql = 'DELETE FROM tienda_productos WHERE id = ?';

    db.query(sql, [id], (err, result) => {
        if(err) {
            throw err;
        }
        res.json({
            mensaje: 'Producto borrado con éxito'
        });
    })
};

const obtenerProductoCategoria = (req, res) =>{
    const {categoria} = req.params;
    const sql = 'SELECT * FROM tienda_productos WHERE categoria = ?;'

    db.query(sql, [categoria], (err, result) =>{
        if(err) {
            throw err
        }
        res.json(result);
    })
}


module.exports = { 
    obtenerProductos,
    creatProducto, 
    modificarProducto, 
    borrarProducto,
    obtenerProductoID,
    obtenerProductoCategoria};


