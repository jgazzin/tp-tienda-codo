document.addEventListener('DOMContentLoaded', () =>
{
    //guarda el btn
    const mostrarFormBtn = document.getElementById('mostrarFormBtn');
    //guarda el form
    const formAct = document.getElementById('formAct');ggr4
    //guardar btn crear producto
    const crearNuevoProductoBtn = document.getElementById('crearNuevoProductoBtn');
    //guardar el form
    const crearProducto = document.getElementById('crearProducto');
       
    
    //otras const
        const mostrarListaProductosBtn = document.getElementById('mostrarListaProductosBtn');
        //aca va lo que va a mostrar de la base de datos
        const listaProductos = document.getElementById('listaProductos');
        //boton de crear producto
    
        //formulario de crear producto
    
        //mostrar u ocultar el form
  

mostrarFormBtn.addEventListener('click', () =>
{
    formAct.classList.toggle('hidden');
});

crearNuevoProductoBtn.addEventListener('click', () =>
{
    crearProducto.classList.toggle('hidden');
});

mostrarListaProductosBtn.addEventListener('click', listadoDeProductos);

async function listadoDeProductos()
{
    
    const response = await fetch('/productos');
    const productos = await response.json();


    listaProductos.innerHTML = ''; 

    productos.forEach(producto =>{
        const li = document.createElement('li');
        li.innerHTML = '<span> ID: $(usuario.id), nombre: $(usaurio.nombre) </span>';
            listaProductos.appendChild(li);
    });
}



});
/*
                                               //aca va la funcion get...//
mostrarListaProductosBtn.addEventListener('click', (mostrarProductos) );
async function mostrarProductos()
{
    const respuesta = await fetch('/productos'); //no me toma la ruta... 
    const productos = await response.json();

    mostrarProductos.innerHTML = '';

    productos.forEach(productos =>
        {
            const li = document.createElement('li');
            li.innerHTML = '
            //que quiero que me muestre en la lista
                span Id: $(usuario.id), nombre: $(usaurio.nombre) 
            ';
        }
    )
}
    */

