document.addEventListener('DOMContentLoaded', () =>
{
    //guarda el btn
    const mostrarFormBtn = document.getElementById('mostrarFormBtn');
    //guarda el form
    const formAct = document.getElementById('formAct');

    //mostrar u ocultar el form

mostrarFormBtn.addEventListener('click', () =>
{
    formAct.classList.toggle('hidden');
});

});