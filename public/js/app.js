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
