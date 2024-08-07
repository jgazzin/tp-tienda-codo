require('dotenv').config()

// conección con la BD
const mysql = require('mysql2');
const connection = mysql.createConnection({
    //reemplazar con datos locales
    // host: 'localhost',
    // user: 'root',
    // password: 'root',
    //database: 'tienda_db'

    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    //database: process.env.DB_NAME

    //database: process.env.DB_NAME

}
);

connection.connect((err) =>{
    if(err) {
        console.log('Error de conección BD : ', err);

        return;
    } 
    console.log('Conectado a la BD');

    connection.query('CREATE DATABASE IF NOT EXISTS sql3718803', (err, result) => {
        if(err){
            console.log("Error creando la base de datos");
            return;
        }
        console.log("Base de datos asegurada");

        connection.changeUser({database: 'sql3718803'}, (err) => {
            if(err) {
                console.error('Error al cambiar a sql3718803', err);
            }
        
            // TABLA USUARIOS
            const createtableUsuariosQuery = `
            CREATE TABLE IF NOT EXISTS tienda_usuarios(
            id INT AUTO_INCREMENT PRIMARY KEY,
            user VARCHAR(30) NOT NULL,
            email VARCHAR(50) NOT NULL,
            nombre VARCHAR(100),
            apellido VARCHAR(100),
            password VARCHAR(20) NOT NULL);`;

            connection.query(createtableUsuariosQuery, (err, result) => {
                if(err) {
                    console.log('Error creando la tabla tienda_usuarios: ', err);
                    return;
                }
                console.log(('Tabla tienda_usuarios asegurada'));
            });

            // TABLA PRODUCTOS
            const createtableProductosQuery = `
            CREATE TABLE IF NOT EXISTS tienda_productos(
            id INT AUTO_INCREMENT PRIMARY KEY,
            nombre VARCHAR(50) NOT NULL,
            img VARCHAR(50) NOT NULL,
            descripcion TEXT NOT NULL,
            categoria VARCHAR(50) NOT NULL,
            precio FLOAT(2) NOT NULL,
            vendedor INT NOT NULL);`;

            connection.query(createtableProductosQuery, (err, result) => {
                if(err) {
                    console.log('Error creando la tabla tienda_productos: ', err);
                    return;
                }
                console.log(('Tabla tienda_productos asegurada'));
            });

            // TABLA VENDIDOS
            const createtableVendidosQuery = `
            CREATE TABLE IF NOT EXISTS tienda_vendidos(
            id INT AUTO_INCREMENT PRIMARY KEY,
            nombre VARCHAR(50) NOT NULL,
            descripcion TEXT NOT NULL,
            categoria VARCHAR(50) NOT NULL,
            precio FLOAT(2) NOT NULL,
            vendedor INT NOT NULL);`;

            connection.query(createtableVendidosQuery, (err, result) => {
                if(err) {
                    console.log('Error creando la tabla tienda_vendidos: ', err);
                    return;
                }
                console.log(('Tabla tienda_vendidos asegurada'));
            });

            // TABLA MENSAJES
            const createtableMensajesQuery = `
            CREATE TABLE IF NOT EXISTS tienda_mensajes(
            id INT AUTO_INCREMENT PRIMARY KEY,
            nombre VARCHAR(50) NOT NULL,
            email VARCHAR(50) NOT NULL,
            asunto VARCHAR(50) NOT NULL,
            mensaje TEXT NOT NULL,
            productoId INT NOT NULL,
            vendedor INT NOT NULL);`;

            connection.query(createtableMensajesQuery, (err, result) => {
                if(err) {
                    console.log('Error creando la tabla tienda_mensajes: ', err);
                    return;
                }
                console.log(('Tabla tienda_mensajes asegurada'));
            });

        });
    });
});

module.exports = connection;
