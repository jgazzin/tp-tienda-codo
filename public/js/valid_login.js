
const registro = document.querySelector('.contenedor-registro')

registro.addEventListener('click', (e) => {
    e.preventDefault()

    if(e.target.classList.contains('btn')){
        const form = e.target.parentElement.parentElement;
        console.log(form);
        if (validar_login(form)) {
            alertas_login(form, 'Enviando...', 'ok')

            setTimeout(() => {
                form.querySelector('.alertas').innerHTML=''
                const alertasResult = form.querySelectorAll('.result')
                alertasResult.forEach(result => {
                    result.classList.remove('result')
                });
                guardarUserLocalST(form)
                window.location.reload()
            }, 2000);
            
        }

    }

        // FUNCIONES
    function guardarUserLocalST(form) {
        localStorage.removeItem('userSession');

        let email = form.querySelector('input.name').value;
        console.log(email);
        let pass = form.querySelector('input.pass').value;
        console.log(pass);
        const userSession = {
            email: email,
            pass: pass
        };
        localStorage.setItem('userSession', JSON.stringify(userSession));
    }

    
    function validar_login(form) {
        const contenedorAlertas = form.querySelector('.alertas')

        if (contenedorAlertas.firstChild) {
            contenedorAlertas.innerHTML=''
        }

        const regex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
        const email = form.querySelector('.name');
        console.log(email);
        if(email.value === "") {
            alertas_login(form, 'El email no puede quedar vacío')
            email.classList.add('err')
        } else if (!regex.test(email.value)) {
            alertas_login(form, "El email no es válido")
        } else {
            email.classList.remove('err')
            email.classList.add('result')
            console.log(email);
        }

        const pass = form.querySelector('.pass')
        //console.log(pass);
        if(pass.value === ''){
            alertas_login(form, 'Complete una contraseña')
            pass.classList.add('err')
        } else if (pass.value.length < 8){
            alertas_login(form, 'La contraseña es muy corta');
            pass.classList.add('err')
        } else {
            pass.classList.remove('err')
            pass.classList.add('result')
        }

        if(form.classList.contains('form_registro')){
            const rePass= form.querySelector('#reg-repass');
            if(rePass.value != pass.value || rePass.value === '' || pass.value.length < 8){
                alertas_login(form, 'Las contraseñas no coinciden');
                rePass.classList.add('err')
            } else {
                rePass.classList.remove('err')
                rePass.classList.add('result')
            }
        }

        if (!contenedorAlertas.firstChild) {
            return true;
        } 
    }


    function alertas_login(form, texto, tipo='error') {
        const contenedorAlertas = form.querySelector('.alertas')
        const elementoAlerta = document.createElement('p')

        elementoAlerta.classList.add('alertas')
        if(tipo === "error"){
            elementoAlerta.classList.add('error')
        } else {
            elementoAlerta.classList.add('ok')
        }
        elementoAlerta.textContent= texto;
        contenedorAlertas.appendChild(elementoAlerta)
        // console.log(elementoAlerta);
        // console.log(contenedorAlertas);
    }
})


