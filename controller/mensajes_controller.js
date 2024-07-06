const db = require('../db/data_base');

const obtenerMensajes = (req, res) => {
    const sql = 'SELECT * FROM tienda_mensajes';

    db.query(sql, (err, result) => {
        if(err) {
            throw err;
        }
        res.json(result);
    })
}

const crearMensaje = (req, res) => {
    const { nombre, email, asunto, mensaje, productoId, vendedor } = req.body;
    const sql = 'INSERT INTO tienda_mensajes (nombre, email, asunto, mensaje, productoId, vendedor) VALUES (?, ?, ?, ?, ?, ?)';

    db.query(sql, [nombre, email, asunto, mensaje, productoId, vendedor], (err, result) => {
        if(err) {
            throw err;
        }
        res.json({
            mensaje: 'Mensaje creado con éxito',
            idUsuario: result.insertId
        });
    })
};

const borrarMensaje = (req, res) => {
    const {id} = req.params;
    const sql = 'DELETE FROM tienda_mensajes WHERE id = ?';

    db.query(sql, [id], (err, result) => {
        if(err) {
            throw err;
        }
        res.json({
            mensaje: 'Mensaje borrado con éxito'
        });
    })
};

module.exports = { 
    obtenerMensajes,
    crearMensaje,
    borrarMensaje};


