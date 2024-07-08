const express = require('express');
const path = require('path')

const app = express();
let port = 3000;

const usuariosRouters = require('./routes/usuarios');
const productosRouters = require('./routes/productos');
const vendidosRouters = require('./routes/vendidos')
const mensajesRouters = require('./routes/mensajes')

app.use(express.json());

app.use(express.static(path.join(__dirname,'public')));

// app.get('/', (req, res) =>
// {
//     res.send("Inicio")
// });

app.use('/usuarios', usuariosRouters);
app.use('/productos', productosRouters);
app.use('/vendidos', vendidosRouters);
app.use('/mensajes', mensajesRouters);


app.listen(port, () =>
{
    console.log(`Escuchando desde el puerto ${port}`);
});
