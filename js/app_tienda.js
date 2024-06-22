// contenedor carrito
const btnCarrito = document.querySelector('nav .carrito i')
const contenedorCarrito = document.querySelector('.contenedor-carrito');

const vaciar = document.querySelector('#vaciar')
vaciar.addEventListener('click', vaciarCarrito)

// carrito
const rowProducto = document.querySelector('.contenedor-carrito .row-producto')
const infoProducto = document.querySelector('.contenedor-carrito .info-producto')

const listadoProductos = document.querySelector('.tienda .productos')
// arreglo de productos seleccionados
let productosSeleccionados = [];

// total a pagar
const totalPagar = document.querySelector('.contenedor-carrito .precio-total')
let total;

// evento carrito
listadoProductos.addEventListener('click', e => {
    if(e.target.classList.contains('comprar')) {
        let producto = e.target.parentElement.nextElementSibling;

        const datosProducto = {
            cant: 1,
            nombre: producto.querySelector('h3').textContent,
            precio: producto.querySelector('.tags .precio span').textContent
        }
        // verificacion producto existentes
        const existe = productosSeleccionados.some(producto => producto.nombre === datosProducto.nombre)
        if (existe) {
            const productos = productosSeleccionados.map(producto =>{
                if(producto.nombre === datosProducto.nombre) {
                    producto.cant++;
                    return producto
                } else {
                    return producto
                }
            })
            productosSeleccionados = [...productos]
        } else {
            productosSeleccionados = [... productosSeleccionados, datosProducto]
        }

        console.log(productosSeleccionados);
        // imprimir en html
        imprimirHtml()
    }
})

// FUNCIONES CARRITO
function imprimirHtml() {
    
    // limpiar html
    infoProducto.innerHTML = '';

    // total
    total = 0;
    
    // listados productos seleccionados
    productosSeleccionados.forEach( producto => {
        const elementoProducto = document.createElement('div');
        elementoProducto.classList.add('row-producto');
        elementoProducto.innerHTML = `
            <span class="cantidad">${producto.cant}</span>
            <span class="nombre">${producto.nombre}</span>
            <span class="precio">$${producto.precio}</span>
            <span class="btn-eliminar">x</span>
        `;

        infoProducto.append(elementoProducto);

        // total a pagar
        total += parseInt(producto.precio) * producto.cant;
    })
    totalPagar.innerHTML = `$${total}`
}

// eliminar producto
infoProducto.addEventListener('click', (e) => {
    if(e.target.classList.contains('btn-eliminar')) {
        const producto = e.target.parentElement;
        const nombre = producto.children[1].textContent;

        console.log(nombre);
        productosSeleccionados = productosSeleccionados.filter(producto => producto.nombre !== nombre)
        console.log(productosSeleccionados);
        imprimirHtml()
    }
})

// vaciar carrito
function vaciarCarrito() {
    productosSeleccionados = [];
    total = 0;
    imprimirHtml()
}


// -------    formulario filtros  ---------
const mostrarTexto= document.querySelectorAll('.productos .plus');
const btnMenos= document.querySelector('.rango .btn-menos');
const btnMas= document.querySelector('.rango .btn-mas');

mostrarTexto.forEach(plus => {
    plus.addEventListener('click', mostrar);
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

function rangoPrecio(params) {
    const barraPrecio = document.querySelector('#file');
    if (params === 'mas') {
        barraPrecio.value += 5;
    } else {
        barraPrecio.value -= 5;
    }
}