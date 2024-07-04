const db = require('../db/data_base');

const obtenerUsuarios = (req, res) => {
    const sql = 'SELECT * FROM tienda_usuarios';

    db.query(sql, (err, result) => {
        if(err) {
            throw err;
        }
        res.json(result);
    })
}

const obtenerUserID = (req, res) => {
    const {id} = req.params;
    const sql = 'SELECT * FROM tienda_usuarios WHERE id = ?';

    db.query(sql, [id], (err, result) => {
        if(err) {
            throw err;
        } 
        res.json(result);
    })
};
const creatUser = (req, res) => {
    const { user, email, nombre, apellido, password } = req.body;
    const sql = 'INSERT INTO tienda_usuarios (user, email, nombre, apellido, password) VALUES (?, ?, ?, ?, ?)';

    db.query(sql, [user, email, nombre, apellido, password], (err, result) => {
        if(err) {
            throw err;
        }
        res.json({
            mensaje: 'Usuario creado con éxito',
            idUsuario: result.insertId
        });
    })
};
const modificarUser = (req, res) => {
    const {id} = req.params;
    const {username, nombre, apellido, password} = req.body;
    const sql = 'UPDATE tienda_usuarios SET nombre = ?, apellido = ?, password = ? WHERE id = ?';

    db.query(sql, [nombre, apellido, password, id], (err, result) => {
        if(err) {
            throw err;
        }
        res.json({
            mensaje: 'Usuario modificado con éxito'
        });
    })

};
const borrarUser = (req, res) => {
    const {id} = req.params;
    const sql = 'DELETE FROM tienda_usuarios WHERE id = ?';

    db.query(sql, [id], (err, result) => {
        if(err) {
            throw err;
        }
        res.json({
            mensaje: 'Usuario borrado con éxito'
        });
    })
};

module.exports = { obtenerUsuarios, obtenerUserID, creatUser, modificarUser, borrarUser };

