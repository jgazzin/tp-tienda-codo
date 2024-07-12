// ---- mostrar form USUARIOS
const mostrarFormBtn = document.getElementById('mostrarFormBtn');
const formAct = document.getElementById('formAct');

mostrarFormBtn.addEventListener('click', () =>
    {
        formAct.classList.toggle('hidden');
    });



// -------- ALERTA SI NO HAY USUARIO ----------------
const contenedorEliminarCuentaUsuario = document.querySelector('.eliminarCuentaUsuario')

let userSession = JSON.parse(sessionStorage.getItem('userSession'));
// verificar si user exist
const divLinea = document.querySelector('.linea')
if (userSession === null){
    contenedorEliminarCuentaUsuario.classList.add('hidden')
    const alertaUser = document.createElement('p')
    alertaUser.classList.add('err')
    alertaUser.textContent = 'Necesita INICIAR SESIÓN o REGISTRARSE'
    divLinea.appendChild(alertaUser)
} else {
    imprimirDatosUser()
    contenedorEliminarCuentaUsuario.classList.remove('hidden')
}

// -------- USUSARIOS ----------------
const dataUser = document.querySelector('#formActualizarDatosUsuario .dataUser')
console.log(dataUser);

// async para obtener datos de usuario logueado
async function imprimirDatosUser(){
    const id = parseInt(userSession.id)
    console.log(id);
    const response = await fetch(`/usuarios/${id}`)
    const usuario =await response.json()
    console.log(usuario);
    usuario.forEach(user => {
        dataUser.querySelector('.user').textContent = user.user
        dataUser.querySelector('.email').textContent = user.email
        dataUser.querySelector('.pass').textContent = user.password
        dataUser.querySelector('.name').textContent = user.nombre
        dataUser.querySelector('.apellido').textContent = user.apellido
    });
    
}

// modificar usuario (datos en placeholder)
const btnMostrarFormBtn = document.querySelector('#mostrarFormBtn')
btnMostrarFormBtn.addEventListener('click', () =>{
    const formAct = document.querySelector('#formAct')
    console.log(dataUser);
    formAct.querySelector('#nombre').value = dataUser.querySelector('.user').textContent
    formAct.querySelector('#mail').value = dataUser.querySelector('.email').textContent
    formAct.querySelector('#name').value = dataUser.querySelector('.name').textContent
    formAct.querySelector('#apellido').value = dataUser.querySelector('.apellido').textContent
    formAct.querySelector('#contraseña').value = dataUser.querySelector('.pass').textContent

    const botonActualizar = formAct.querySelector('button')
    botonActualizar.addEventListener('click', (e) =>{
        e.preventDefault()
        if (validarModificarUsuario(formAct)) {
            modificarUsuarioBD(formAct)
        } else {
            alert('Las contraseñas no coinciden')
        }
    })

})



// async put usuario
async function modificarUsuarioBD(form) {
    const dataUsuarioMod = {
        user: form.querySelector('#nombre').value,
        email: form.querySelector('#mail').value,
        nombre: form.querySelector('#name').value,
        apellido: form.querySelector('#apellido').value,
        password: form.querySelector('#contraseña').value

    }
    console.log(dataUsuarioMod);
    const id = parseInt(userSession.id)
    const response = await fetch(`/usuarios/${id}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(dataUsuarioMod)
    })
    const result = await response.json()
    console.log(result);
    // enviar nuevo dato user al session
    userSession.user = form.querySelector('#nombre').value
    console.log(userSession);
    sessionStorage.setItem('userSession', JSON.stringify(userSession));
    window.location.reload()
}

// validar form modificar usuario
function validarModificarUsuario(form) {
    const contraseña = form.querySelector('#contraseña')
    const repContraseña = form.querySelector('#repContraseña')
    if(contraseña.value === repContraseña.value){
        return true
    }
}

// ELIMINAR CUENTA USUARIO
const eliminarCuentaUsuario = document.querySelector('.eliminarCuentaUsuario .eliminar')
eliminarCuentaUsuario.addEventListener('click', ()=>{
    console.log('eliminar usuario');
    const alertaEliminar = document.querySelector('.eliminarCuentaUsuario .alertaEliminar')
    
    alertaEliminar.classList.remove('hidden')
    eliminarCuentaUsuario.classList.add('hidden')

    alertaEliminar.querySelector('.guardar').addEventListener('click', ()=>{
        alertaEliminar.classList.add('hidden')
        eliminarCuentaUsuario.classList.remove('hidden')
    })
    alertaEliminar.querySelector('.eliminar').addEventListener('click', ()=>{
        const ID = parseInt(userSession.id)
        // eliminar productos con vendedor: idusuario
        eliminarUsuario(ID)


    })
})

// async eliminar producto del usuario eliminado
async function eliminarUsuario(id){

    // PRODUCTOS
    const response = await fetch(`/productos`)
    const productosUser = await response.json()
    console.log(productosUser);
    productosUser.forEach(product => {
        if( product.vendedor === id){
            eliminarElementoId(product.id, 'productos')
        }
    });

    // MENSAJES
    const responseMensajes = await fetch(`/mensajes`)
    const mensajesUser = await responseMensajes.json()

    mensajesUser.forEach(mensaje =>{
        if(mensaje.vendedor === id){
            eliminarElementoId(mensaje.id, 'mensajes')
        }
    })

    // USUARIO
    console.log(id);
    const responseUser = await fetch(`/usuarios/${id}`, {
        method: 'DELETE'
    })
    const result = await responseUser.json()
    console.log(result.mensaje)

    // borrar usuario del session storage
    userSession = []
    sessionStorage.setItem('userSession', JSON.stringify(userSession));
    window.location.reload()

}

// asynca generica para eliminar elementos de las tablas
async function eliminarElementoId(id, tabla){
    const response = await fetch(`/${tabla}/${id}`, {
        method: 'DELETE'
    })
    const result = await response.json()
    console.log(result.mensaje);
}

// LOGOUT ICON
const logoutIcon = document.querySelector('.cabecera .fa-right-from-bracket')
logoutIcon.addEventListener('click', ()=>{
    // userSession = []
    // sessionStorage.setItem('userSession', JSON.stringify(userSession));
    sessionStorage.removeItem('userSession')
    window.location.reload()
})


const idSession = JSON.parse(sessionStorage.getItem('userSession'));
const idUsarioLogueado = idSession.id

/*
//buscar por nombre
const search = document.querySelector('.search .buscador');
console.log(search)

search.querySelector('i').addEventListener('click', () =>{
    const nombreABuscar = search.querySelector('input').value;
    console.log(nombreABuscar)

    async function mostrarProductoID()
    {
    const response = await fetch(`/productos/`,
        {
            method: 'GET'
        });
    const productos = await response.json();
    
    nombreProducto.innerHTML = '';

    productos.forEach(producto => {
        if (producto.vendedor === parseInt(userSession.id) && producto.nombre == (nombreABuscar));{
        const buscador = document.createElement('li');
        li.innerHTML = `
        <div class="contenedor">
            <div class="caja">
                <img src="img/${producto.img}">
            </div>
                <div class="caja1">
                    <h4><b>${producto.nombre}</b></h4> 
                    <p>${producto.descripcion}</p>
                </div> 
                <div class="caja2"> 
                    <h3 class="categoria">${producto.categoria}</h3> 
                    <h3 class="precio">$ ${producto.precio}</h3> 
                </div>
                <div class="botonesEdit">
                    <button class="update" data-nombre="${producto.nombre}"  data-categoria="${producto.categoria}" data-precio="${producto.precio}"data-descripcion="${producto.descripcion}" > Modificar  </button> 
                    <button class="delete" data-id="${producto.id}"> Eliminar </button>
                </div>    
        </div>
        
        `;      
        nombreProducto.appendChild(li);
        }
    });
    document.querySelectorAll('.update').forEach(button => 
        {
            button.addEventListener('click',(e) => 
            {
                const id = e.target.getAttribute('data-id');                    
                const nombre = e.target.getAttribute('data-nombre');                                        
                const categoria = e.target.getAttribute('data-categoria');
                const precio = e.target.getAttribute('data-precio');
                const descripcion = e.target.getAttribute('data-descripcion');
    
                document.getElementById('editID').value = id;
                document.getElementById('editNombre').value = nombre;
                document.getElementById('editCategorias').value = categoria;
                document.getElementById('editPrecio').value = precio;
                document.getElementById('editDescripcion').value = descripcion;
    
                focus(modificarElProducto.classList.toggle('hidden'));
    
            });
        });
        document.querySelectorAll('.delete').forEach(button => 
            {
                button.addEventListener('click', async(e)=>
                {
                    const id = e.target.getAttribute('data-id');
                    const response = await fetch(`/productos/${id}`,{
                        method: 'DELETE'
                    });
    
                    const result = await response.json();
                    alert(result.mensaje);
                    mostrarProductoID();
                });
    
            });
    }
});
 */




//mostrar productos por id
if (userSession != null){
    mostrarProductoID()
}
const mostrarListaProductosBtn = document.getElementById('mostrarListaProductosBtn');
//aca va lo que va a mostrar de la base de datos
const listaProductos = document.getElementById('listaProductos');

mostrarListaProductosBtn.addEventListener('click', () => {
    listaProductos.classList.toggle('hidden');
});

async function mostrarProductoID()
{
    const response = await fetch(`/productos/`,
        {
            method: 'GET'
        });
    const productos = await response.json();


    //lista para mostrar elementos por ID
    listaProductos.innerHTML = '';

    productos.forEach(producto => {
        if (producto.vendedor === parseInt(userSession.id)){
            const li = document.createElement('li');
            li.innerHTML = `
        <div class="contenedor">
            <div class="caja">
                <img src="img/${producto.img}">
            </div>
                <div class="caja1">
                    <h4><b>${producto.nombre}</b></h4> 
                    <p>${producto.descripcion}</p>
                </div> 
                <div class="caja2"> 
                    <h3 class="categoria">${producto.categoria}</h3> 
                    <h3 class="precio">$ ${producto.precio}</h3> 
                </div>
                <div class="botonesEdit">
                    <button class="update" data-nombre="${producto.nombre}"  data-categoria="${producto.categoria}" data-precio="${producto.precio}"data-descripcion="${producto.descripcion}" > Modificar  </button> 
                    <button class="delete" data-id="${producto.id}"> Eliminar </button>
                </div>    
        </div>
            `;

            listaProductos.appendChild(li);
                
        } 
    });
    document.querySelectorAll('.update').forEach(button => 
        {
            button.addEventListener('click',(e) => 
            {
                const id = e.target.getAttribute('data-id');                    
                const nombre = e.target.getAttribute('data-nombre');                                        
                const categoria = e.target.getAttribute('data-categoria');
                const precio = e.target.getAttribute('data-precio');
                const descripcion = e.target.getAttribute('data-descripcion');
    
                document.getElementById('editID').value = id;
                document.getElementById('editNombre').value = nombre;
                document.getElementById('editCategorias').value = categoria;
                document.getElementById('editPrecio').value = precio;
                document.getElementById('editDescripcion').value = descripcion;
    
                focus(modificarElProducto.classList.toggle('hidden'));
    
            });
        });
        document.querySelectorAll('.delete').forEach(button => 
            {
                button.addEventListener('click', async(e)=>
                {
                    const id = e.target.getAttribute('data-id');
                    const response = await fetch(`/productos/${id}`,{
                        method: 'DELETE'
                    });
    
                    const result = await response.json();
                    alert(result.mensaje);
                    mostrarProductoID();
                });
    
            });
           
}


const crearNuevoProductoBtn = document.getElementById('crearNuevoProductoBtn');
//guardar el form
const formCrearProducto = document.getElementById('formCrearProducto');

crearNuevoProductoBtn.addEventListener('click', () =>
    {
        formCrearProducto.classList.toggle('hidden');
    });


//crear producto nuevo DUDA DE COMO PASAR LOS VALORES

formCrearProducto.addEventListener('submit', async (e) => 
{
        e.preventDefault();
        const guardarDatosForm = new FormData(formCrearProducto);
        const data = 
        {
            nombre: guardarDatosForm.get('nombre'),
            descripcion: guardarDatosForm.get('descripcion'),
            categoria: guardarDatosForm.get('categoria'),
            precio: guardarDatosForm.get('precio'),
            img: guardarDatosForm.get('img'),
            vendedor: guardarDatosForm('userSession.id')
        };
        console.log(data)
        const response = await fetch('/productos',
        {
            method: 'POST',
            headers:{
                'Content-Type' : 'application/JSON'
            },
            body: JSON.stringify(data)
        })
            
        const result = await response.json();
        alert("Usuario Creado Con EXITO");

        crearUsuarioForm.reset();
        crearUsuarioForm.classList.add('hidden');
        listarUsuarios();
});


// ------ MIS VENDIDOS------
//vendidos si hay una sesion iniciada con id mostra los producto pero los escondo en el html con hidden
if (userSession!= null){
    mostrarProductosvendidosId()
}
const mostrarListaVendidosBtn = document.getElementById('mostrarListaVendidosBtn');

const listaVendidos = document.getElementById('listaVendidos');

mostrarListaVendidosBtn.addEventListener('click', () => {
    listaVendidos.classList.toggle('hidden')
})

async function mostrarProductosvendidosId()
{
    const response = await fetch(`/vendidos`,
        {
            method: 'GET'
        });
    const productos = await response.json();


    //lista para mostrar elementos por ID
    listaVendidos.innerHTML = '';

    productos.forEach(producto => {
        if (producto.vendedor === parseInt(userSession.id)){
            const li = document.createElement('li');
            li.innerHTML = `
        <div class="contenedor2">
                <div class="caja1">
                    <h4><b>${producto.nombre}</b></h4> 
                    <p>${producto.descripcion}</p>
                </div> 
                <div class="caja2"> 
                    <h3 class="categoria">${producto.categoria}</h3> 
                </div>
                <div>
                    <h3 class="precio">$ ${producto.precio}</h3> 
                </div>
        </div>
            `;

            listaVendidos.appendChild(li);
            
            
        } 
    });
};

//mensajes
if(userSession!= null){
    listarVendidosUser()
}
const listaMensajesContainer = document.querySelector('.listaMensajes')
const mostrarListaMensajesBtn = document.querySelector('#mostrarListaMensajesBtn')

mostrarListaMensajesBtn.addEventListener('click', ()=>{
    listaMensajesContainer.classList.toggle('hidden')
    console.log(listaMensajesContainer);
})


// asyn para listar mensajes del usuario
async function listarVendidosUser(){
    const id = parseInt(userSession.id)
    console.log(id);
    const response = await fetch(`/mensajes`)
    const mensajes =await response.json()

    mensajes.forEach(msg =>{
        if(msg.vendedor === id){
            const divMensaje = document.createElement('div')
            divMensaje.innerHTML = `
            <div class="headerMsg">
                <p class="nombre">${msg.nombre}</p>
                <p class="email">${msg.email}</p>
                <p class="asunto" data-id="${msg.productId}">${msg.asunto}</p>
                <i class="fa-solid fa-arrow-down fa-lg"></i>
            </div>
            <div class="bodyMsg hidden">
                <p class="mensaje">${msg.mensaje}</p>
            </div>
            `;
            listaMensajesContainer.appendChild(divMensaje)
        }

    })

    document.querySelectorAll('.headerMsg i').forEach(arrow =>{
        arrow.addEventListener('click', (e)=> {
        console.log('ver mensaje');
        const bodyMsg = e.target.parentElement.nextElementSibling;
        bodyMsg.classList.toggle('hidden')
        e.target.classList.toggle('fa-arrow-down')
        e.target.classList.toggle('fa-arrow-up')
        })
    })
}