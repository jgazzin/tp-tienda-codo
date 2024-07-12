// -------    generación FRONT TIENDA  ---------

const contenedor_producto = document.querySelector('.productos');
document.addEventListener('DOMContentLoaded', () =>{
    imprimirProductos()
    imprimirCarrito()
})

// función global imprimir
async function imprimirProductos() {
    contenedor_producto.innerHTML = '';
    const response = await fetch('/productos')
    const productos =await response.json()

    productos.forEach(product =>{
        contenedor_producto.appendChild(htmlProducto(product))
    })
    // --- Consulta Producto ID
    document.querySelectorAll('.consultaProducto').forEach(consulta => {
        consulta.addEventListener('click', (e)=>{
            const producto = e.target.parentElement.parentElement;
            const idProducto = parseInt(producto.getAttribute('data-id')) 
            
            sessionStorage.setItem('consultaProductoID', JSON.stringify(idProducto));
            window.location.replace('contacto.html')
        })
    })
}

// fincion imprimir cada producto
function htmlProducto(product){
    const card = document.createElement('DIV')
    card.classList.add('producto')
    card.setAttribute("data-id", product.id)
    card.setAttribute("data-vendedor", product.vendedor)
    card.innerHTML= `
        <div class="card_producto_row">
            <img src="img/${product.img}" width="100" alt="imagen producto">
            <div class="textos">
                <div>
                    <h3>${product.nombre}</h3>
                    <p class="detalle alto-ofw">${product.descripcion}</p>
                </div>
                <div class="tags">
                    <h3 class="precio">$<span>${product.precio}</span>.-</h3>
                    <p class="categoria" data-id="cat_1">${product.categoria}</p>
                </div>
            </div>
        </div>
        <div class="card_producto_row">
            <button class="btn comprar">agregar al carrito</button>
            <abutton class="btn guardar consultaProducto"><i class="fa-solid fa-envelope fa-xl"></i> MSG</button>
        </div> 

    `;
    return card
}

// -------    formulario filtros  ---------
const btnMenos= document.querySelector('.rango .btn-menos');
const btnMas= document.querySelector('.rango .btn-mas');
const btnCategoria = document.querySelector('.filtros .categoria');
const buscarPorNombre = document.querySelector('.filtros .buscador');
const progress = document.querySelector('.filtros .rango');

btnCategoria.addEventListener('change', ()=>{
    const checked = btnCategoria.querySelector('input:checked').id;
    console.log(checked);
    if( checked === 'todo') {
        imprimirProductos()
    } else {
        imprimirProductoCategoria(checked)
    }

})
buscarPorNombre.querySelector('i').addEventListener('click', () =>{
    const nombreBuscar = buscarPorNombre.querySelector('input').value;
    
    if(nombreBuscar != '') {
        imprimirProductoNombre(nombreBuscar)

    } else {
        imprimirProductos()
    }
})
progress.addEventListener('click', ()=>{
    const precioValue = progress.querySelector('progress').value;
    if(precioValue < 100) {
        imprimirPorPrecio(precioValue)

    } else {
        imprimirProductos()
    }

})

async function imprimirProductoCategoria(categoria) {
    contenedor_producto.innerHTML = '';
    const response = await fetch(`/productos`)
    const productos = await response.json()
    let i = 0
    productos.forEach(product =>{

        if(product.categoria === categoria){
            contenedor_producto.appendChild(htmlProducto(product))
            i++
        }   
    })
    
    if(i === 0){
        document.querySelector('.alerta').textContent = `No hay productos en la categoría: ${categoria}`;
    } else {
        document.querySelector('.alerta').textContent = '';
    }
    
}
async function imprimirProductoNombre(nombre) {
    contenedor_producto.innerHTML = '';
    const response = await fetch(`/productos`)
    const productos = await response.json()
    let i = 0
    productos.forEach(product =>{
        if(product.nombre.includes(nombre)){
            contenedor_producto.appendChild(htmlProducto(product))
            i++
        }   
    })
    
    if(i === 0){
        document.querySelector('.alerta').textContent = `No se encontraron productos con el nombre: ${nombre}`;
    } else {
        document.querySelector('.alerta').textContent = '';
    }
    
}
async function imprimirPorPrecio(precio) {
    contenedor_producto.innerHTML = '';
    const response = await fetch(`/productos`)
    const productos = await response.json()

    const precios = productos.map(product => product.precio)
    const precioMaximo = Math.max.apply(null, precios)
    const precioEvaluado = precio * precioMaximo / 100;

    let i = 0
    productos.forEach(product =>{
        if(product.precio <= precioEvaluado){
            contenedor_producto.appendChild(htmlProducto(product))
            i++
        }   
    })
    
    if(i === 0){
        document.querySelector('.alerta').textContent = `No hay productos menores a: $${precio}`;
    } else {
        document.querySelector('.alerta').textContent = '';
    } 
}

btnMas.addEventListener('click', () => {
    rangoPrecio('mas');
})
btnMenos.addEventListener('click', () => {
    rangoPrecio('menos');
})

function rangoPrecio(params) {
    const barraPrecio = document.querySelector('#file');
    if (params === 'mas') {
        barraPrecio.value += 5;
    } else {
        barraPrecio.value -= 5;
    }
}


//---------- CARRITO -----------
const btnCarrito = document.querySelector('nav .carrito i')
const contenedorCarrito = document.querySelector('.contenedor-carrito');

const vaciar = document.querySelector('#vaciar')
vaciar.addEventListener('click', vaciarCarrito)

// carrito
const rowProducto = document.querySelector('.contenedor-carrito .row-producto')
const infoProducto = document.querySelector('.contenedor-carrito .info-producto')

const listadoProductos = document.querySelector('.tienda .productos')

// ------ PRODUCTOS SELECCIONADOS DESDE SESSION STG
let productosSeleccionados = [];

if(JSON.parse(sessionStorage.getItem('carritoSession'))=== null){
    productosSeleccionados = []
} else{
    productosSeleccionados = JSON.parse(sessionStorage.getItem('carritoSession'))
}


// total a pagar
const totalPagar = document.querySelector('.contenedor-carrito .precio-total')
let total;

// vaciar carrito
function vaciarCarrito() {
    productosSeleccionados = [];
    total = 0;
    guardarCarritoSessionlST()
    imprimirCarrito()
}

// evento carrito
listadoProductos.addEventListener('click', e => {
    if(e.target.classList.contains('comprar')) {
        //let producto = e.target.parentElement;
        let productoContenedor = e.target.parentElement.parentElement;

        let datosProducto = {
            cant: 1,
            nombre: productoContenedor.querySelector('h3').textContent,
            precio: productoContenedor.querySelector('.tags .precio span').textContent,
            id: productoContenedor.getAttribute('data-id'),
            vendedor: productoContenedor.getAttribute('data-vendedor')
        }

        console.log(datosProducto);
        // verificacion producto existentes  --- VERIFICAR CON ID
        const existe = productosSeleccionados.some(producto => producto.id === datosProducto.id)
        if (existe) {
            const productos = productosSeleccionados.map(producto =>{
                if(producto.id == datosProducto.id) {
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

        // guardar carrito en sessionStorage
        guardarCarritoSessionlST()
        // imprimir en html
        imprimirCarrito()
    }

})


// FUNCIONES CARRITO
function imprimirCarrito() {
    
    // limpiar html
    infoProducto.innerHTML = '';

    // total
    total = 0;
   
    // listados productos seleccionados
    let productosSession = JSON.parse(sessionStorage.getItem('carritoSession'));
    if(productosSession != null){
        productosSession.forEach( producto => {
            // console.log(producto);
            const elementoProducto = document.createElement('div');
            elementoProducto.classList.add('row-producto');
            elementoProducto.setAttribute('data-id', producto.id)
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

}


// eliminar producto
infoProducto.addEventListener('click', (e) => {
    if(e.target.classList.contains('btn-eliminar')) {
        const producto = e.target.parentElement;
        const idProd = producto.getAttribute('data-id')
        //console.log(idProd);
        productosSeleccionados = JSON.parse(sessionStorage.getItem('carritoSession'))
        productosSeleccionados = productosSeleccionados.filter(producto => producto.id !== idProd)
        guardarCarritoSessionlST()
        imprimirCarrito()
    }
})

// guardar en sessionStorage
function guardarCarritoSessionlST() {
    sessionStorage.setItem('carritoSession', JSON.stringify(productosSeleccionados)); 
}



