const express = require('express');

const router_usuarios = express.Router();

router_usuarios.get('/', (req, res) =>
{
    res.json(
        {
            message : "Hola mundo",
        }
    )
});

module.exports = router_usuarios;