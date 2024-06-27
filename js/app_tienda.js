// -------    generación FRONT TIENDA  ---------
// reemplazar por bd
let productos = [
    {
    id: 1,
    imagen: 'producto-1.jpg',
    nombre: 'cips carpeta',
    detalle:'Lorem ipsum dolor sit amet consectetur adipisicing elit. Quibusdam asperiores doloremque. Lorem ipsum dolor sit amet consectetur adipisicing elit. Ad, adipisci.',
    precio: '150',
    categoria: 'libreria',
    vendedor: 1
    },
    {
    id: 1,
    imagen: 'producto-2.jpg',
    nombre: 'bibliorato',
    detalle:'Lorem ipsum dolor sit amet consectetur adipisicing elit. Quibusdam asperiores doloremque. Lorem ipsum dolor sit amet consectetur adipisicing elit. Ad, adipisci.',
    precio: '120',
    categoria: 'oficina',
    vendedor: 4
    },
    {
    id: 1,
    imagen: 'producto-3.jpg',
    nombre: 'separadores',
    detalle:'Lorem ipsum dolor sit amet consectetur adipisicing elit. Quibusdam asperiores doloremque. Lorem ipsum dolor sit amet consectetur adipisicing elit. Ad, adipisci.',
    precio: '80',
    categoria: 'papelería',
    vendedor: 2
    },
    {
    id: 1,
    imagen: 'producto-4.jpg',
    nombre: 'ganchos',
    detalle:'Lorem ipsum dolor sit amet consectetur adipisicing elit. Quibusdam asperiores doloremque. Lorem ipsum dolor sit amet consectetur adipisicing elit. Ad, adipisci.',
    precio: '50',
    categoria: 'oficina',
    vendedor: 2
    },
    {
    id: 1,
    imagen: 'producto-5.jpg',
    nombre: 'birome',
    detalle:'Lorem ipsum dolor sit amet consectetur adipisicing elit. Quibusdam asperiores doloremque. Lorem ipsum dolor sit amet consectetur adipisicing elit. Ad, adipisci.',
    precio: '30',
    categoria: 'olibrería',
    vendedor: 3
    },
    {
    id: 1,
    imagen: 'producto-6.jpg',
    nombre: 'corrector líquido',
    detalle:'Lorem ipsum dolor sit amet consectetur adipisicing elit. Quibusdam asperiores doloremque. Lorem ipsum dolor sit amet consectetur adipisicing elit. Ad, adipisci.',
    precio: '70',
    categoria: 'librería',
    vendedor: 4
    },
    {
    id: 1,
    imagen: 'producto-7.jpg',
    nombre: 'agujereadora',
    detalle:'Lorem ipsum dolor sit amet consectetur adipisicing elit. Quibusdam asperiores doloremque. Lorem ipsum dolor sit amet consectetur adipisicing elit. Ad, adipisci.',
    precio: '140',
    categoria: 'librería',
    vendedor: 1
    },
    {
    id: 1,
    imagen: 'producto-8.jpg',
    nombre: 'abrochadora',
    detalle:'Lorem ipsum dolor sit amet consectetur adipisicing elit. Quibusdam asperiores doloremque. Lorem ipsum dolor sit amet consectetur adipisicing elit. Ad, adipisci.',
    precio: '200',
    categoria: 'librería',
    vendedor: 2
    },
    {
    id: 1,
    imagen: 'producto-9.jpg',
    nombre: 'tijera',
    detalle:'Lorem ipsum dolor sit amet consectetur adipisicing elit. Quibusdam asperiores doloremque. Lorem ipsum dolor sit amet consectetur adipisicing elit. Ad, adipisci.',
    precio: '90',
    categoria: 'librería',
    vendedor: 3
    },
];

const contenedor_producto = document.querySelector('.productos');
document.addEventListener('DOMContentLoaded', () =>{

    console.log(contenedor_producto);

    imprimirProductos(productos)
})

// función global imprimir
async function imprimirProductos(objeto) {
    // const productos = await fetch('/productos')
    // const productos = await response.json()
    // *** descomentar cuando se trabaje con bd y servidor

    contenedor_producto.innerHTML = '';
    objeto.forEach(product =>{
        const card = document.createElement('DIV')
        card.classList.add('producto')
        card.setAttribute("data-id", product.id)
        card.setAttribute("data-vendedor", product.vendedor)
        card.innerHTML= `
            <div class="img">
                <img src="img/${product.imagen}" width="100" alt="imagen producto">
                <button class="btn comprar">agregar al carrito</button>
            </div>
                
            <div class="textos">
                <h3>${product.nombre}</h3>
                <p class="detalle alto-ofw">${product.detalle}</p>
                <h2 class="plus">+</h2>
                <div class="tags">
                    <h3 class="precio">$<span>${product.precio}</span>.-</h3>
                    <p class="categoria" data-id="cat_1">${product.categoria}</p>
                </div>
            </div>
        `;
        contenedor_producto.appendChild(card)
    })
}



// contenedor carrito
const btnCarrito = document.querySelector('nav .carrito i')
const contenedorCarrito = document.querySelector('.contenedor-carrito');

const vaciar = document.querySelector('#vaciar')
vaciar.addEventListener('click', vaciarCarrito)

// vaciar carrito
function vaciarCarrito() {
    productosSeleccionados = [];
    total = 0;
    imprimirHtml()
}

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




// -------    formulario filtros  ---------
const mostrarTexto= document.querySelectorAll('.productos .plus');
const btnMenos= document.querySelector('.rango .btn-menos');
const btnMas= document.querySelector('.rango .btn-mas');
const btnCategoria = document.querySelector('.filtros .categoria');
const buscarPorNombre = document.querySelector('.filtros .buscador');
const progress = document.querySelector('.filtros .rango');

btnCategoria.addEventListener('change', ()=>{
    const checked = btnCategoria.querySelector('input:checked').id;

    if( checked === 'todo') {
        imprimirProductos(productos)
    } else {
        const productos_filtrados = productos.filter(product => product.categoria === checked)
        console.log(checked);
        if(productos_filtrados.length === 0){
            document.querySelector('.alerta').textContent = `No hay productos en la categoría: ${checked}`;
        }  else {
            document.querySelector('.alerta').textContent = '';

        } 
        imprimirProductos(productos_filtrados)
    }

    

})

buscarPorNombre.querySelector('i').addEventListener('click', () =>{
    const nombreBuscar = buscarPorNombre.querySelector('input').value;
    if(nombreBuscar != '') {
        const productos_filtrados = productos.filter(product => product.nombre === nombreBuscar)
        if(productos_filtrados.length === 0){
            document.querySelector('.alerta').textContent = `No hay productos con el nombre: ${nombreBuscar}`;
        } else {
            document.querySelector('.alerta').textContent = '';
        } 
        imprimirProductos(productos_filtrados)

    } else {
        imprimirProductos(productos)
    }
})

progress.addEventListener('click', ()=>{
    const precioValue = progress.querySelector('progress').value;
    const precios = productos.map(product => product.precio)
    const precioMaximo = Math.max.apply(null, precios)
    const precioEvaluado = precioValue * precioMaximo / 100;

    const productos_filtrados = productos.filter(product => product.precio <= precioEvaluado)
    if(productos_filtrados.length === 0){
        document.querySelector('.alerta').textContent = `No hay productos de menor precio a: $${precioEvaluado}`;
    } else {
        document.querySelector('.alerta').textContent = '';
    } 
    imprimirProductos(productos_filtrados)

})


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