
// validar
document.querySelector('.contactar').addEventListener('click', (e) => {
    e.preventDefault()

    const nombre = document.querySelector('.inputContact[name="Nombre"]');
    const email = document.querySelector('.inputContact[name="email"]');
    const mensaje = document.querySelector('#asunto')
    const terminos = document.querySelector('.checkbox')
    const alertasContainer = document.querySelector('.form .alertas')
    const produtoConsulta = document.querySelector('#productos')

    let dataMensaje = {
        nombre: nombre.value,
        email: email.value,
        asunto: '',
        mensaje: mensaje.value,
        productoId: produtoConsulta.value,
        vendedor: ''
    }
    // console.log(dataMensaje);

    validar()

    // funciones
    function validarEmail() {
        const regex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
        if(email.value === "") {
            alertas('El email no puede quedar vacío')
        } else if (!regex.test(email.value)) {
            alertas("El email no es válido")
        } else {
            return true
        }
    }

    function validarNombre() {
        if(nombre.value === "") {
            alertas("El nombre no puede quedar vacío")
        } else {
            return true
        }
    }
    function validarMensaje() {
        if(mensaje.value === "") {
            alertas("Ingrese un mensaje")
        } else {
            return true
        }
    }

    function validarProducto() {
        if(produtoConsulta.value === ''){
            alertas('Seleccione un producto')
        } else {
            return true
        }
    }

    function validarterminos() {
        if(!terminos.checked) {
            alertas("Acepte los Términos de envío de información")
        } else {
            return true
        }
    }
    function validar() {
        // limpiar alertas anteriores
        if (alertasContainer.firstChild) {
            alertasContainer.innerHTML=''
        }

        if (validarNombre() &
            validarEmail() &
            validarMensaje() &
            validarterminos() &
            validarProducto()) {
                alertas('Enviando formulario...', 'ok')    
                setTimeout(() => {
                    // envia mensaje + crea mensaje en bd
                    crearMensajeBD(dataMensaje)
                    sessionStorage.removeItem('consultaProductoID')
                    window.location.replace('index.html');
                }, 3000);
            }
    } 

    function alertas(texto, tipo='error') {
        
        const elementoAlerta = document.createElement('p')
        elementoAlerta.classList.add('alertas')
        if(tipo === "error"){
            elementoAlerta.classList.add('error')
        } else {
            elementoAlerta.classList.add('ok')
        }
        elementoAlerta.textContent= texto;
        alertasContainer.append(elementoAlerta)
    }

});

// ------- HTML DEL SELECT PRODUCTOS DESDE BS
async function obtenerNombresProductos() {
    const select_productos = document.querySelector('#productos')

    const response = await fetch('/productos')
    const productos = await response.json()

    productos.forEach(product =>{
        const option = document.createElement('option')
        option.value = product.id;
        option.textContent = product.nombre.toUpperCase()
        if(obtenerConsultaIdSessionST()== product.id){
            option.selected = true
        }

        select_productos.appendChild(option)
    })
    
} 
document.addEventListener('DOMContentLoaded', ()=>{
    obtenerNombresProductos()
})


function obtenerConsultaIdSessionST(){
    const idConsulta = JSON.parse(sessionStorage.getItem('consultaProductoID'))  
    return idConsulta

}


// ----- ENVIAR CONSULTA A BD
async function crearMensajeBD(data) {

    // datos faltantes
    const id = parseInt(data.productoId)
    const responseGet = await fetch(`/productos/${id}`)
    const producto = await responseGet.json()
    console.log(producto)

    data.vendedor = producto[0].vendedor
    data.asunto = producto[0].nombre
    console.log(data);

    // post mensaje con data completo
    const responsePost = await fetch('/mensajes', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json' 
        },
        body: JSON.stringify(data)
    })
    const result = await responsePost.json()
    console.log(result)
}