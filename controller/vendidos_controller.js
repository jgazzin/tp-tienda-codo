const db = require('../db/data_base');

const obtenerVendidos = (req, res) => {
    const sql = 'SELECT * FROM tienda_vendidos';

    db.query(sql, (err, result) => {
        if(err) {
            throw err;
        }
        res.json(result);
    })
}


// const obtenerVendidosID = (req, res) => {
//     const {id} = req.params;
//     const sql = 'SELECT * FROM tienda_productos WHERE id = ?';


//     db.query(sql, [id], (err, result) => {
//         if(err) {
//             throw err;
//         } 
//         res.json(result);
//     })
    
// };


const crearVendido = (req, res) => {
    const { nombre, descripcion, categoria, precio, vendedor} = req.body;
    const sql = 'INSERT INTO tienda_vendidos (nombre, descripcion, categoria, precio, vendedor) VALUES (?, ?, ?, ?, ?)';

    db.query(sql, [nombre, descripcion, categoria, precio, vendedor], (err, result) => {
        if(err) {
            throw err;
        }
        res.json({
            mensaje: 'Producto Vendido creado con éxito',
            idUsuario: result.insertId
        });
    })
};

// const modificarProducto = (req, res) => {
//     const {id} = req.params;
//     const {nombre, descripcion, categoria, precio} = req.body;
//     const sql = 'UPDATE usuarios SET nombre = ?, descripcion = ?, categoria = ?, precio = ? WHERE id = ?';

//     db.query(sql, [nombre, descripcion, categoria, precio, id], (err, result) => {
//         if(err) {
//             throw err;
//         }
//         res.json({
//             mensaje: 'Producto modificado con éxito'
//         });
//     })

// };

const borrarVendido = (req, res) => {
    const {id} = req.params;
    const sql = 'DELETE FROM tienda_vendidos WHERE id = ?';

    db.query(sql, [id], (err, result) => {
        if(err) {
            throw err;
        }
        res.json({
            mensaje: 'Producto vendido borrado con éxito'
        });
    })
};

// const obtenerProductoCategoria = (req, res) =>{
//     const {categoria} = req.params;
//     const sql = 'SELECT * FROM tienda_productos WHERE categoria = ?;'

//     db.query(sql, [categoria], (err, result) =>{
//         if(err) {
//             throw err
//         }
//         res.json(result);
//     })
// }


module.exports = { 
    obtenerVendidos,
    crearVendido,
    borrarVendido};


