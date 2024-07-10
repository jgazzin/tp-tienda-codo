document.addEventListener('DOMContentLoaded', () =>
{
    //guarda el btn
    const mostrarFormBtn = document.getElementById('mostrarFormBtn');
    //guarda el form
    const formAct = document.getElementById('formAct');

        //otras const

        const mostrarListaProductosBtn = document.getElementById('mostrarListaProductosBtn');
        //aca va lo que va a mostrar de la base de datos
        const listaProductos = document.getElementById('listaProductos');
        //boton de crear producto
        const crearNuevoProductoBtn = document.getElementById('crearNuevoProductoBtn');
    
        //formulario de crear producto
    
        //mostrar u ocultar el form
    

mostrarFormBtn.addEventListener('click', () =>
{
    formAct.classList.toggle('hidden');
});

});



// -------- USUSARIOS ----------------

let userSession = JSON.parse(sessionStorage.getItem('userSession'));
// verificar si user exist
const dataUser = document.querySelector('#formActualizarDatosUsuario .dataUser')
console.log(dataUser);
if (userSession === null){
    const alertaUser = document.createElement('p')
    alertaUser.classList.add('err')
    alertaUser.textContent = 'Necesita INICIAR SESIÓN o REGISTRARSE'
    dataUser.appendChild(alertaUser)
} else {
    imprimirDatosUser()
}

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

