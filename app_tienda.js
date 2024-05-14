const mostrarTexto= document.querySelectorAll('.productos .plus');
const zoom = document.querySelectorAll('.img img');
const btnMenos= document.querySelector('.rango .btn-menos');
const btnMas= document.querySelector('.rango .btn-mas');

mostrarTexto.forEach(plus => {
    plus.addEventListener('click', mostrar);
});


zoom.forEach( img => {
    img.addEventListener('click', hacerZoom);
});

btnMas.addEventListener('click', () => {
    rangoPrecio('mas');
})
btnMenos.addEventListener('click', () => {
    rangoPrecio('menos');
})


// funciones
function mostrar(e) {
    const detalle = e.target.previousElementSibling;

    console.log(detalle)
    if (detalle.classList.contains('alto-ofw')) {
        e.target.textContent = '-';
    } else {
        e.target.textContent = '+';
    }
    
    detalle.classList.toggle('alto-ofw');
}

function hacerZoom(e) {
    console.log(e.target);
    const img = e.target;

    img.classList.toggle('img-100');

}

function rangoPrecio(params) {
    const barraPrecio = document.querySelector('#file');
    if (params === 'mas') {
        barraPrecio.value += 5;
    } else {
        barraPrecio.value -= 5;
    }
}