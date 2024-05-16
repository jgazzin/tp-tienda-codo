// contenedor carrito
const btnCarrito = document.querySelector('nav .carrito')
const contenedorCarrito = document.querySelector('.contenedor-carrito')

btnCarrito.addEventListener('click', () => {
    contenedorCarrito.classList.toggle('hidden')
})