
const registro = document.querySelector('.contenedor-registro')

registro.addEventListener('click', (e) => {
    e.preventDefault()

    if(e.target.classList.contains('btn')){
        const form = e.target.parentElement.parentElement;
        // console.log(form);

        if (validar_login(form)) {
            if(form.classList.contains('form_registro')){
                crearUser(form)
            } else {
                buscarUser(form)

            }
        }

    }


    // FUNCIONES
        
    function validar_login(form) {
        const contenedorAlertas = form.querySelector('.alertas')
        contenedorAlertas.innerHTML=''

        const userName = form.querySelector('.user');
        if(userName.value === ''){
            alertas_login(form, 'Ingrese el nombre de usuario')
            userName.classList.add('err')
        } else {
            userName.classList.remove('err')
        }

        const regex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
        const email = form.querySelector('.name');
        //console.log(email);

        if(email.value === "") {
            alertas_login(form, 'El email no puede quedar vacío')
            email.classList.add('err')
        } else if (!regex.test(email.value)) {
            alertas_login(form, "El email no es válido")
        } else {
            email.classList.remove('err')

        }

        const pass = form.querySelector('.pass')
        //console.log(pass);
        if(pass.value === ''){
            alertas_login(form, 'Complete una contraseña')
            pass.classList.add('err')
        } else if (pass.value.length < 6){
            alertas_login(form, 'La contraseña es muy corta');
            pass.classList.add('err')
        } else {
            pass.classList.remove('err')
        }

        if(form.classList.contains('form_registro')){
            const rePass= form.querySelector('#reg-repass');
            if(rePass.value != pass.value || rePass.value === '' || pass.value.length < 8){
                alertas_login(form, 'Las contraseñas no coinciden');
                rePass.classList.add('err')
            } else {
                rePass.classList.remove('err')
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

    async function buscarUser(form) {
        console.log('buscar usuario')
        // get usuarios
        const response = await fetch('/usuarios')
        const usuarios = await response.json()

        let emailActual = form.querySelector('#log-name');
        let userActual = form.querySelector('#log-user')
        let passActual = form.querySelector('#log-pass')

        // const userLogueado = usuarios.find(user.email === emailActual.value)
        let userLogueado = usuarios.filter( user => user.email === emailActual.value)
        
        if(userLogueado.length != 1){
            alertas_login(form, 'El usuario no existe')
        } else {
            // verificar user y contraseña

            // console.log(userLogueado[0].password);
            // console.log(passActual);
            if(userLogueado[0].user === userActual.value &
                userLogueado[0].password == passActual.value){
                    guardarUserLocalST(userActual.value, `${userLogueado[0].id}`)
                    console.log(userActual.value);
                    console.log(userLogueado[0].id);
                
                    alertas_login(form, 'Enviando...', 'ok')
                    setTimeout(() => {
                        window.location.reload()
                        console.log('reload');
                    }, 2000);

                } else {
                    alertas_login(form, 'La contraseña y/o el user no son correctos')
                    
                }
        }
    }

    async function crearUser(form) {
        console.log('crear usuario');
        // console.log(form);
        // const formData = new FormData(form) - no funciona ¿?????

        let data = {
            user: form.querySelector('#reg-user').value,
            email: form.querySelector('#reg-email').value,
            password: form.querySelector('#reg-pass').value 
        }

        // get usuarios
        const resp = await fetch('/usuarios')
        const usuarios = await resp.json()
        const validExist = usuarios.find( i => i.email === data.email)
        console.log(validExist);
        if(usuarios.find( i => i.email === data.email)) {
            alertas_login(form, 'El email ya está registrado')
            return

        } else {

            console.log(data);
            const response = await fetch('/usuarios', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(data)
            })
            const result = await response.json()
            guardarUserLocalST(data.user, result.idUsuario)

            alertas_login(form, 'Enviando...', 'ok')
            setTimeout(() => {
                window.location.reload()
                console.log('reload');
            }, 2000);
        }


    }

    function guardarUserLocalST(user, id) {
        sessionStorage.removeItem('userSession');

        let userSession = {
            user: user,
            id: id
        };
        sessionStorage.setItem('userSession', JSON.stringify(userSession));
    }
})

