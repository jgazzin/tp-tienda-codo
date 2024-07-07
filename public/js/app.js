const icon = document.querySelector('.icons');
const desplegable = document.querySelectorAll('.desplegable');

// menús desplegables header
icon.addEventListener('click', (e) => {
    if(e.target.classList.contains('fa-cart-plus')) {
        desplegable.forEach(item => {
            if(item.id === 'carrito') {
                item.classList.toggle('hidden')
            } else {
                item.classList.add('hidden')
            }
        });
    }
    if(e.target.classList.contains('fa-bars')) {
        desplegable.forEach(item => {
            if(item.id === 'menus') {
                item.classList.toggle('hidden')
            } else {
                item.classList.add('hidden')
            }
        });
    }
    if(e.target.classList.contains('fa-right-to-bracket')) {
        desplegable.forEach(item => {
            if(item.id === 'registro') {
                item.classList.toggle('hidden')
            } else {
                item.classList.add('hidden')
            }
        });

    }
})


//---------- forms registros usuarios mostrar
const cambiarForm = document.querySelectorAll('.cambiar_form');
cambiarForm.forEach(ancla => {
    ancla.addEventListener('click', ()=>{
        document.querySelector('.form_registro').classList.toggle('hidden')
        document.querySelector('.form_login').classList.toggle('hidden')
        document.querySelector('.form_registro').reset()
        document.querySelector('.form_login').reset()
        document.querySelector('.alertas').innerHTML= '';
        document.querySelectorAll('.err').forEach(element => {
            element.classList.remove('err')
        })
        
    })
})

//---------------- saludo usuario
const saludoUser = document.querySelector('.saludoUser span');
const usuarioActual = JSON.parse(sessionStorage.getItem('userSession'));
if ( usuarioActual != null){
    saludoUser.textContent = usuarioActual.user;
    saludoUser.setAttribute("data-id-user", `${usuarioActual.id}`)

}

// -------- log out
const logout = document.querySelector('.saludoUser .logout')
logout.addEventListener('click', ()=>{
    sessionStorage.removeItem('userSession');
    saludoUser.textContent = ''
    saludoUser.setAttribute("data-id-user", '')
})

// -------- CARRITO DESDE SESSION STG
let productosEnSession = JSON.parse(sessionStorage.getItem('carritoSession'))
console.log(productosEnSession);
imprimirCarrito()

// FUNCIONES CARRITO
function imprimirCarrito() {
    const infoProducto = document.querySelector('.contenedor-carrito .info-producto')
    console.log(infoProducto);

    // total a pagar
    const totalPagar = document.querySelector('.contenedor-carrito .precio-total')
    let total;

    // total
    total = 0;

    // limpiar html
    infoProducto.innerHTML = '';
   
    // listados productos seleccionados desde sessionSTG
    if(productosEnSession != null){
        productosEnSession.forEach( producto => {
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

    // eliminar producto
    infoProducto.addEventListener('click', (e) => {
        if(e.target.classList.contains('btn-eliminar')) {
            const producto = e.target.parentElement;
            const idProd = producto.getAttribute('data-id')
            //console.log(idProd);
            productosEnSession = JSON.parse(sessionStorage.getItem('carritoSession'))
            productosEnSession = productosEnSession.filter(producto => producto.id !== idProd)
            guardarCarritoSessionlST()
            imprimirCarrito()
        }
    })
    const vaciar = document.querySelector('#vaciar')
    vaciar.addEventListener('click', vaciarCarrito)

}

// vaciar carrito
function vaciarCarrito() {
    productosEnSession = [];
    total = 0;
    guardarCarritoSessionlST()
    imprimirCarrito()
}

// guardar en sessionStorage
function guardarCarritoSessionlST() {
    sessionStorage.setItem('carritoSession', JSON.stringify(productosEnSession)); 
}