const express = require('express');
const path = require('path')

const app = express();
let port = 3000;

const usuariosRouters = require('./routes/usuarios');
const productosRouters = require('./routes/productos');

app.use(express.json());

app.use(express.static(path.join(__dirname,'public')));

// app.get('/', (req, res) =>
// {
//     res.send("Inicio")
// });

app.use('/usuarios', usuariosRouters);
//app.use('/productos', productosRouters);

app.listen(port, () =>
{
    console.log(`Escuchando desde el puerto ${port}`);
});
