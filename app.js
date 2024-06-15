const icon = document.querySelector('.icons');
const desplegable = document.querySelectorAll('.desplegable');

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

