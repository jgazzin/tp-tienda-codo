// generar orden de compra
const contenedorListadoProductos = document.querySelector('.listado_productos_items')
let listadoProductos = JSON.parse(sessionStorage.getItem('carritoSession'));
let total = 0;

// imprimir lista
function imprimirOrden() {
    contenedorListadoProductos.innerHTML= ''
    listadoProductos.forEach(producto => {
        const itemProducto = document.createElement('div')
        itemProducto.classList.add('t-row')
        itemProducto.setAttribute("data-id", producto.id)
        itemProducto.setAttribute("data-vendedor", producto.vendedor)
        
        itemProducto.innerHTML=`
            <p class="cantidad">${producto.cant}
                <span><i class="fa-solid fa-square-plus fa-xl"></i></span>
                <span><i class="fa-solid fa-square-minus fa-xl"></i></span>
            </p>
            <p>${producto.nombre}</p>
            <p>$<span>${producto.precio}</span></p>
            <button class="btn eliminar">eliminar</button>
        `;
        contenedorListadoProductos.appendChild(itemProducto)
        total +=  parseInt(producto.precio) * parseInt(producto.cant);
    })
    // precio total
    const contenedorPrecio = document.querySelector('.precio_total span')
    contenedorPrecio.textContent = total;
        
}; imprimirOrden()

// funciones

// eliminar producto
document.addEventListener('click', (e)=>{
    const btn = e.target;
    if(btn.classList.contains('eliminar')){
        eliminarProducto(btn.parentElement)
    }
    if(btn.classList.contains('fa-solid')){
        modificarCantidad(btn)
    }
})

function eliminarProducto(producto) {
    const productoID = producto.getAttribute("data-id")
    console.log(listadoProductos);
    listadoProductos = listadoProductos.filter(items => items.id !== productoID)

    console.log(listadoProductos);
    guardarProductosSessionST()
    imprimirOrden()
}

function modificarCantidad(btn) {
    const productoRow = btn.parentElement.parentElement.parentElement;
    const productoID = productoRow.getAttribute("data-id")
    // const producto = listadoProductos.filter(item => item.id === productoID)
    listadoProductos.forEach(item =>{
        if(item.id === productoID){
            if(btn.classList.contains('fa-square-plus')){
                item.cant++
            } 
            if(btn.classList.contains('fa-square-minus')){
                item.cant--
                if(item.cant === 0){
                    eliminarProducto(productoRow)
                    return
                }
            } 
        }
    })

    guardarProductosSessionST()
    imprimirOrden()
    console.log(listadoProductos);

}


function guardarProductosSessionST() {
    // sessionStorage.removeItem('carritoSession');
    sessionStorage.setItem('carritoSession', JSON.stringify(listadoProductos));
}

// ----- COMPRAR
document.querySelector('#generarCompra').addEventListener('click', ()=>{
    // spinner pensando
    const spinner = document.querySelector('.ticket_compra .spinner')
    const ticket = document.querySelector('.ticket_compra .ticket')
    spinner.classList.remove('hidden')
    console.log(spinner);
    setInterval(() => {
        spinner.classList.add('hidden')
        ticket.classList.remove('hidden')
    }, 3000);

    if(listadoProductos.length >0 ){
        listadoProductos.forEach(product => {
            crearVendidos(product.id)
            imprimir_Producto(product)
            eliminarProductoBD(product.id)
            
        })
        imprimir_Total()
        
        // borrar orden de compra + sessionST
        listadoProductos = []
        guardarProductosSessionST()
        total = 0;
        imprimirOrden() 
    } else {
        crearAlerta()
    }

})

// alerta
function crearAlerta() {
    const contenedor = document.querySelector('.ticket .listado_productos_ticket');
    const mensaje = document.createElement('p')
    mensaje.classList.add('err')
    mensaje.textContent = 'No hay productos en el carrito'
    contenedor.innerHTML= ''
    contenedor.appendChild(mensaje)
}

// imprimir ticket
function imprimir_Producto(producto){
    console.log('imprimir producto');
    const contenedor = document.querySelector('.ticket .listado_productos_ticket')
    const row_Producto = document.createElement('div')
    row_Producto.classList.add('t-row')
    row_Producto.innerHTML = `
    <p class="cantidad">${producto.cant}</p>
    <p class="nombre">${producto.nombre}</p>
    <p class="precio">${producto.precio}</p>
    `;
    contenedor.innerHTML=''
    contenedor.appendChild(row_Producto)
}

function imprimir_Total(){
    const total_ticket = total;
    document.querySelector('.ticket_compra .ticket_total span').textContent = total_ticket;
}


// ---- conecciones a BD

async function eliminarProductoBD(id) {
    const response = await fetch(`/productos/${id}`, {
        method: 'DELETE'
    })
    const result = await response.json()
    console.log(result)
}

async function crearVendidos(ID) {
    const id = parseInt(ID)
    const responseGet = await fetch(`/productos/${id}`)
    const producto = await responseGet.json()
    console.log(producto)
    const dataVendido = {
        nombre: producto[0].nombre,
        descripcion: producto[0].descripcion,
        categoria: producto[0].categoria,
        precio: producto[0].precio,
        vendedor: producto[0].vendedor
    }

    const responsePost = await fetch('/vendidos', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json' 
        },
        body: JSON.stringify(dataVendido)
    })
    const result = await responsePost.json()
    console.log(result)
}




