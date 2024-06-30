const express = require('express');

const app = express();

let port = 3000;

const usuariosRouters = require('./routes/usuarios');

app.use(express.json());

//app.use(express.static('public'));
app.get('/', (req, res) =>
{
    res.send("Inicio")
});

app.use('/usuarios', (usuariosRouters));

app.listen(port, () =>
{
    console.log(`Escuchando desde el puerto ${port}`);
});
