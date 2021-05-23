$(document).ready(() => {
    const carro = JSON.parse(localStorage.getItem("carrito"));
    // console.log(carro);


    
    //hacer el acumuludardor para el precio más la cantidad

    let dataResult = null;

    let ps = []

    carro.forEach((element, index) => {

        $.ajax({
            type: 'GET',
            url: `https://fakestoreapi.com/products/${element}`,
            dataType: 'json'
        }).done((data) => {
            dataResult = data;

            agregarProducto((index + 1), dataResult.title, dataResult.price)
            ps.push(`${dataResult.price}`)
        });
    });

    

    const agregarProducto = (id, nombre, precio) => {
        let trClass = document.createElement('tr');

        var html = `
            <th scope="row">${id}</th>
            <td>${nombre}</td>
            <td>1</td>
            <td class="precio">${precio}</td>`;

        $(trClass).attr('id', 'itemProducto')
        $(trClass).html(html);
        $("#productos").append(trClass);
    };

    const sumarProductos = () => {
        $("#itemProducto").each((items) => {
            var itemsCheck = $("#productos");
            var itemPrice = $(this).find("#precio").innerText;

            console.log(itemPrice);
        });
    };


    $(document).ajaxStop(() => {
        let subTotal = null
        // $("#productos").each((index, element) => {
        //     subTotal += $(element).find(".precio").text();
        //     console.log(subTotal);
        // });
        // console.log(ps);
    });



});