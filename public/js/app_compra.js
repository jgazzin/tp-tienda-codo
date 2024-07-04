// generar orden de compra
const contenedorListadoProductos = document.querySelector('.listado_productos_items')
let listadoProductos = JSON.parse(sessionStorage.getItem('carritoSession'));


// imprimir lista
function imprimirOrden() {
    contenedorListadoProductos.innerHTML= ''
    let total = 0;
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
    
    listadoProductos.forEach(producto => {
        // eliminarProducto(producto.id)
        const productoBD = buscarProducto(producto.id)


        // crearVendido()
        console.log(productoBD);
    })
})

// ---- conecciones a BD
async function buscarProducto(ID) {
    const id = parseInt(ID)
    const response = await fetch(`/usuarios/${id}`)
    const usuario = await response.json()
    console.log(usuario);
}
async function eliminarProductos(id) {
    const response = await fetch(`/productos/${id}`, {
        method: 'DELETE'
    })
    const result = await response.json()
    console.log(result)
}

// async function crearVendidos(data) {
//     const response = await fetch('/vendidos', {
//         method: 'POST',
//         headers: {
//             'Content-Type': 'application/json' 
//         },
//         body: JSON.stringify(data)
//     })
//     const result = await response.json()
//     console.log(result)
// }

// generar ticket
