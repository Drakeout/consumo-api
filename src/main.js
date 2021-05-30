$(document).ready(() => {

    //creación de la tarjeta del producto
    const tarjetaProducto = (titulo, imgs, precio, id) => {
        let html = `
        <div class="card">
            
                <img src="${imgs}" alt="..." class="card-img p-3">
            
                <div class="card-body">
                    <h5 class="card-title" id="titulo">${titulo}</h5>            
                        <hr/>                    
                    <div class="d-flex flex-row justify-content-end">
                        <p class="card-text text-end mx-1" id='precio'><strong>$ ${precio}</strong></p>
                        <button class='btn btn-dark mx-2' id='${id}'>Ver Más</button>
                    </div>
                    
                </div>
                </div>
            </div> 
        </div>
        `;
        let card = document.createElement('div');
        $(card).html(html);
        $(card).addClass('col m-1');
        $(card).attr('id', id);

        return card;
    }

    var dataResult = null;

    // fecth api publica
    $.ajax({
        type: 'GET',
        url: 'https://fakestoreapi.com/products',
        dataType: 'json'
    }).done((data) => {
        dataResult = data;
        mostrarProductos();

    });

    //Mostrar productos en la página
    const mostrarProductos = () => {
        $("#productos").empty();
        dataResult.map(producto => {
            $("#productos").append(
                tarjetaProducto(
                    producto.title,
                    producto.image,
                    producto.price,
                    producto.id
                )
            );
        });
    }

    // ordernar por precio
    $("#ordenarPrecio").click(() => {
        dataResult.sort((a, b) => {
            if (a.price > b.price) {
                return 1
            } else {
                return -1
            }
        });
        mostrarProductos();
    })

    

    const productos = document.getElementById('productos');

    productos.addEventListener('click', e => {
        addProducto(e)
    });


    //mostrar en html carrito
    const agregarCarrito = (nombre, precio, id) => {
        let liElement = document.createElement('li');

        let html = `<a class="dropdown-item d-flex justify-content-between" href="#">${nombre}<p class="">${precio}</p> <h4 style="display: none">${id}/</h4> </a>`;

        $(liElement).html(html);
        $("#carrito").append(liElement);
    };

    //obtener el boton y enviar la información
    const addProducto = (e) => {
        if (e.target.classList.contains('btn-dark')) {
            setCarro(e.target.parentElement.parentElement);
        }

        e.stopPropagation();
    };

    const setCarro = (objeto) => {
        //agregar en el carrito en base al texto escrito en la card
        agregarCarrito(objeto.querySelector('h5').textContent, objeto.querySelector('#precio').textContent,  objeto.querySelector('.btn-dark').id)
        let id = objeto.querySelector('.btn-dark').id;
        sessionStorage.setItem('producto', JSON.stringify(id));
        location.href = '../pages/producto.html';
    };

    
    //Borrar carrito
    $("#borrarCarrito").click(() => {
        $("#carrito").empty();
    });
    //Recuperar el carrito
    var aValue = localStorage.getItem('carrito');
    // console.log(aValue);


    //guardar carrito directamente
    // VERSION PREVIA, AHORA SE USA EL CARD => DETALLE => GUARDAR EN LOCALSTORAGE
    // $("#pagarCarrito").click((e) => {
    //     // guardar los id en el carro
    //     let ids = $("#carrito").find('h4').text();
    //     let cortados = ids.split('/')
    //     cortados.pop();
    //     console.log(cortados);
    //     // console.log(cortados[cortados.length - 1]);
    //     localStorage.setItem('carrito', JSON.stringify(cortados));
        
    //     window.location.href = './pages/carrito.html';
    // });

    

    // validaciones de registro

    //Esto hay que moverlo a otra carpeta
    $("#registro-form").validate({
        rules: {
            nombre: "required",
            apellido: "required",
            email: {
                required: true,
                email: true
            },
            password: {
                required: true,
                password: true
            }
        },
        messages: {

            nombre: {
                required: "Tienes que ingresar un nombre de al menos 3 caracteres"
            },
            apellido: {
                required: "Tienes que ingresar tus apellidos"
            },
            email: {
                required: "Por favor ingresa una dirreción de correo valida",
                email: "Ingresa un correo valido"
            },
            password: {
                required: 'Por favor ingresa una contraseña'
            }
        },
        errorClass: "error fail-alert",
        validClass: "valid success-alert",
    })



})

