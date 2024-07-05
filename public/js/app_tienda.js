// -------    generación FRONT TIENDA  ---------

// reemplazar por bd
let productos_buck = [
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
    id: 2,
    imagen: 'producto-2.jpg',
    nombre: 'bibliorato',
    detalle:'Lorem ipsum dolor sit amet consectetur adipisicing elit. Quibusdam asperiores doloremque. Lorem ipsum dolor sit amet consectetur adipisicing elit. Ad, adipisci.',
    precio: '120',
    categoria: 'oficina',
    vendedor: 4
    },
    {
    id: 3,
    imagen: 'producto-3.jpg',
    nombre: 'separadores',
    detalle:'Lorem ipsum dolor sit amet consectetur adipisicing elit. Quibusdam asperiores doloremque. Lorem ipsum dolor sit amet consectetur adipisicing elit. Ad, adipisci.',
    precio: '80',
    categoria: 'papelería',
    vendedor: 2
    },
    {
    id: 4,
    imagen: 'producto-4.jpg',
    nombre: 'ganchos',
    detalle:'Lorem ipsum dolor sit amet consectetur adipisicing elit. Quibusdam asperiores doloremque. Lorem ipsum dolor sit amet consectetur adipisicing elit. Ad, adipisci.',
    precio: '50',
    categoria: 'oficina',
    vendedor: 2
    },
    {
    id: 5,
    imagen: 'producto-5.jpg',
    nombre: 'birome',
    detalle:'Lorem ipsum dolor sit amet consectetur adipisicing elit. Quibusdam asperiores doloremque. Lorem ipsum dolor sit amet consectetur adipisicing elit. Ad, adipisci.',
    precio: '30',
    categoria: 'librería',
    vendedor: 3
    },
    {
    id: 6,
    imagen: 'producto-6.jpg',
    nombre: 'corrector líquido',
    detalle:'Lorem ipsum dolor sit amet consectetur adipisicing elit. Quibusdam asperiores doloremque. Lorem ipsum dolor sit amet consectetur adipisicing elit. Ad, adipisci.',
    precio: '70',
    categoria: 'librería',
    vendedor: 4
    },
    {
    id: 7,
    imagen: 'producto-7.jpg',
    nombre: 'agujereadora',
    detalle:'Lorem ipsum dolor sit amet consectetur adipisicing elit. Quibusdam asperiores doloremque. Lorem ipsum dolor sit amet consectetur adipisicing elit. Ad, adipisci.',
    precio: '140',
    categoria: 'librería',
    vendedor: 1
    },
    {
    id: 8,
    imagen: 'producto-8.jpg',
    nombre: 'abrochadora',
    detalle:'Lorem ipsum dolor sit amet consectetur adipisicing elit. Quibusdam asperiores doloremque. Lorem ipsum dolor sit amet consectetur adipisicing elit. Ad, adipisci.',
    precio: '200',
    categoria: 'librería',
    vendedor: 2
    },
    {
    id: 9,
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
}

// fincion imprimir cada producto
function htmlProducto(product){
    const card = document.createElement('DIV')
    card.classList.add('producto')
    card.setAttribute("data-id", product.id)
    card.setAttribute("data-vendedor", product.vendedor)
    card.innerHTML= `
        <div class="img">
            <img src="img/${product.img}" width="100" alt="imagen producto">
            <button class="btn comprar">agregar al carrito</button>
        </div>
            
        <div class="textos">
            <h3>${product.nombre}</h3>
            <p class="detalle alto-ofw">${product.descripcion}</p>
            <h2 class="plus">+</h2>
            <div class="tags">
                <h3 class="precio">$<span>${product.precio}</span>.-</h3>
                <p class="categoria" data-id="cat_1">${product.categoria}</p>
            </div>
        </div>
    `;
    return card
}

// -------    formulario filtros  ---------
const mostrarTexto= document.querySelectorAll('.productos .plus');
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


mostrarTexto.forEach(plus => {
    plus.addEventListener('click', mostrar);
});

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

// funcion mostrar descripcion
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


//---------- contenedor carrito
const btnCarrito = document.querySelector('nav .carrito i')
const contenedorCarrito = document.querySelector('.contenedor-carrito');

const vaciar = document.querySelector('#vaciar')
vaciar.addEventListener('click', vaciarCarrito)

// carrito
const rowProducto = document.querySelector('.contenedor-carrito .row-producto')
const infoProducto = document.querySelector('.contenedor-carrito .info-producto')

const listadoProductos = document.querySelector('.tienda .productos')
let productosSeleccionados = [];
// arreglo de productos seleccionados
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
        let producto = e.target.parentElement.nextElementSibling;
        let productoContenedor = producto.parentElement;

        const datosProducto = {
            cant: 1,
            nombre: producto.querySelector('h3').textContent,
            precio: producto.querySelector('.tags .precio span').textContent,
            id: productoContenedor.getAttribute("data-id"),
            vendedor: productoContenedor.getAttribute("data-vendedor")
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

}


// eliminar producto
infoProducto.addEventListener('click', (e) => {
    if(e.target.classList.contains('btn-eliminar')) {
        const producto = e.target.parentElement;
        const nombre = producto.children[1].textContent;
        
        productosSeleccionados = JSON.parse(sessionStorage.getItem('carritoSession'))
        productosSeleccionados = productosSeleccionados.filter(producto => producto.nombre !== nombre)
        guardarCarritoSessionlST()
        imprimirCarrito()
    }
})

// guardar en sessionStorage
function guardarCarritoSessionlST() {
    //sessionStorage.removeItem('carritoSession');
    // console.log(productosSeleccionados)
    sessionStorage.setItem('carritoSession', JSON.stringify(productosSeleccionados));
  
}
