function mostrarRespuesta(id) {
    var respuesta = document.getElementById(id);
    if (respuesta.style.display === "none") {
        respuesta.style.display = "block";
    } else {
        respuesta.style.display = "none";
    }
}