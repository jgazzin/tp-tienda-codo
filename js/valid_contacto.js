
// validar
document.querySelector('.contactar').addEventListener('click', (e) => {

    const nombre = document.querySelector('.inputContact[name="Nombre"]');
    const email = document.querySelector('.inputContact[name="email"]');
    const mensaje = document.querySelector('#asunto')
    const terminos = document.querySelector('.checkbox')
    const alertasContainer = document.querySelector('.form .alertas')


    e.preventDefault()
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
            validarterminos()) {
                alertas('Enviando formulario...', 'ok')    
                setTimeout(() => {
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




