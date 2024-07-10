
//const contenedorDeUsuarios = document.querySelector('.usuarios');
const idSession = JSON.parse(sessionStorage.getItem('userSession'));
const idUsarioLogueado = idSession.id
console.log(idUsarioLogueado)

document.addEventListener('DOMContentLoaded', () =>
{
    //guarda el btn
    const mostrarFormBtn = document.getElementById('mostrarFormBtn');
    //guarda el form
    const formAct = document.getElementById('formAct');
    //guardar btn crear producto
    const crearNuevoProductoBtn = document.getElementById('crearNuevoProductoBtn');
    //guardar el form
    const crearProducto = document.getElementById('crearProducto');
       
    
    //otras const
        const mostrarListaProductosBtn = document.getElementById('mostrarListaProductosBtn');
        //aca va lo que va a mostrar de la base de datos
        const listaProductos = document.getElementById('listaProductos');

        const mostrarMensajesBtn = document.getElementById('mostrarMensajesBtn');

        const listaMensajes = document.getElementById('listaMensajes');
       
        const modificarElProducto = document.getElementById('modificarElProducto');
  

mostrarFormBtn.addEventListener('click', () =>
{
    formAct.classList.toggle('hidden');
});



crearNuevoProductoBtn.addEventListener('click', () =>
{
    crearProducto.classList.toggle('hidden');
});


mostrarListaProductosBtn.addEventListener('click', mostrarProductoID);
    
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
        if (producto.vendedor === parseInt(idUsarioLogueado)){
            const li = document.createElement('li');
            li.innerHTML = `
        <div class="contenedor">
                <div class="caja1">
                    <h4><b>${producto.nombre}</b></h4> 
                    <p>${producto.descripcion}</p>
                </div> 
                <div class="caja2"> 
                    <h3 class="vistaCategoria">${producto.categoria}</h3> 
                    <h3 clas="vistaPrecio">$ ${producto.precio}</h3> 
                </div>
                 <div class="botones">
                    <div>
                        <button class="update btn actualizar" data-nombre="${producto.nombre}"  data-categoria="${producto.categoria}" data-precio="${producto.precio}"data-descripcion="${producto.descripcion}" > Modificar  </button> 
                    </div>
                    <div>
                        <button class="delete btn delete" data-id="${producto.id}"> Eliminar </button>
                    </div>
                </div>    
        </div>
            
            
            `;

            listaProductos.appendChild(li);
        } 
    });
    
}



/*
const btn = document.querySelectorAll('.update');
console.log(btn)*/

/*
document.querySelectorAll('.update').forEach(button => 
    {
        button.addEventListener('click', () =>
        {
        modificarElProducto.classList.toggle('hidden');        
    });
});*/






/*
const btnModificar = document.q


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

            modificarElProducto.classList.remove('hidden');
        });
    });









    document.querySelectorAll('.delete').forEach(button => 
        {
            button.addEventListener('click', async(e)=>
            {
                const id = e.target.getAttribute('data-id');
                const response = await fetch(`/usuarios/${id}`,{
                    method: 'DELETE'
                });

                const result = await response.json();
                alert(result.message);
                listarUsuarios();
            });

        });

*/






mostrarMensajesBtn.addEventListener('click', mostrarMensajeID);
    
async function mostrarMensajeID()
{
    const response = await fetch(`/mensajes/`,
        {
            method: 'GET'
        });
    const mensajes = await response.json();

    listaMensajes.innerHTML = '';

    mensajes.forEach(mensaje => {
        if (mensaje.vendedor === parseInt(idUsarioLogueado))
        {
            const li = document.createElement('li');
            li.innerHTML = `
            <div> <h3>id producto</h3><h4> ${mensaje.productoId}</h4><div/><div><h3>producto</h3><h4> ${mensaje.productoId}</h4>
            </div>
            
            
            `;

            listaMensajes.appendChild(li);      
          }
    });

   
    

    console.log(mensajes)
}


});