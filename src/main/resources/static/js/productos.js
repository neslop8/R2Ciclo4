$(document).ready( function () {
    session = localStorage.getItem('session');
    console.log(session);
    
    if(session == 'false'){
        localStorage.setItem('session',false);
        window.location.href = 'index.html';
    }

    // Crear instancia de DataTable
    tabla = $('#tabla_product').DataTable({
        dom: 'Bfrtip',
        "language": {
            "sProcessing":     "Procesando...",
            "sLengthMenu":     "Mostrar _MENU_ registros",
            "sZeroRecords":    "No se encontraron resultados",
            "sEmptyTable":     "Ningún dato disponible en esta tabla",
            "sInfo":           "Mostrando registros del _START_ al _END_ de un total de _TOTAL_ registros",
            "sInfoEmpty":      "Mostrando registros del 0 al 0 de un total de 0 registros",
            "sInfoFiltered":   "(filtrado de un total de _MAX_ registros)",
            "sInfoPostFix":    "",
            "sSearch":         "Buscar:",
            "sUrl":            "",
            "sInfoThousands":  ",",
            "sLoadingRecords": "Cargando...",
            "oPaginate": {
                "sFirst":    "Primero",
                "sLast":     "Último",
                "sNext":     "Siguiente",
                "sPrevious": "Anterior"
            },
            "oAria": {
                "sSortAscending":  ": Activar para ordenar la columna de manera ascendente",
                "sSortDescending": ": Activar para ordenar la columna de manera descendente"
            }
        }
    });

    // Llamado a función mostrar_product()
    mostrar_product();
});

/*
* mostrar_product() 
* Función que llama método API GET a utilizar
* @param url_pet, la dirección del api a utilizar
* @return Response, devuelve la respuesta del método API, Listado de productos
*/
function mostrar_product(){

    tabla.clear().draw();

    clear_formulario();

    $.ajax({
        method: "GET",
        url: url_pet+"/api/fragance/all",
        success: function(response){
            console.log(response);
            if(response.length > 0){
                for (var a = 0; a < response.length; a++) {
                    tabla.row.add([
                        response[a]['reference'],
                        response[a]['brand'],
                        response[a]['category'],
                        response[a]['material'],
                        response[a]['presentacion'],
                        response[a]['description'],
                        response[a]['price'],
                        response[a]['availability'],
                        response[a]['quantity'],
                        response[a]['photography'],
                        "<a class='btn btn-info text-center text-white' style='cursor: pointer;' onclick='javascript:ver_detalle(\""+response[a]['reference']+"\")'>Ver</a>",
                        "<a class='btn btn-danger text-center text-white' style='cursor: pointer;' onclick='javascript:eliminar_product(\""+response[a]['reference']+"\")'>Eliminar</a>"
                    ]).draw();
                }
            }
        }
    });
}               

/*
* ver_detalle(reference) 
* Función que llama método API GET a utilizar
* @param reference, La referencia del producto a consultar
* @param url_pet, la dirección del api a utilizar
* @return Response, devuelve la respuesta del método API, Información del producto
*/
function ver_detalle(reference){
    $.ajax({
        method: "GET",
        url: url_pet+"/api/fragance/"+reference,
        contentType: "application/JSON",
        dataType: "JSON",
        success: function(response){

            $("#tit").text("Información Producto");

            $("#id_product").val(response['reference']);
            $("#id_product").attr('readonly', 'readonly');
            $("#id_product").attr('required', true);
            $(".idProduct").css('display','block');

            $("#btn").text("Actualizar");

            $("#form_product").removeAttr("action");
            $("#form_product").attr("action", "javascript:actualizar_product(\""+response['photography']+"\")");

            $("#marc_product").val(response['brand']);
            $("#categ_product").val(response['category']);
            $("#mat_product").val(response['material']);
            $("#present_product").val(response['presentacion']);
            $("#desc_product").val(response['description']);
            $("#prec_product").val(response['price']);
            $("#cant_product").val(response['quantity']);
            $("#image_product").removeAttr("required");

            $("#disp_product option[value="+ response['availability'] +"]").attr("selected",true);
        }
    });
}

/*
* registrar_product() 
* Función que llama método API POST a utilizar
* @param id_product, Referencia del producto
* @param marc_product, Marca del producto
* @param categ_product, Categoría del producto
* @param mat_product, Material del producto
* @param present_product, Presentación del producto
* @param desc_product, Descripción del producto
* @param prec_product, Precio del producto
* @param cant_product, Cantidad del producto
* @param image_product, Imagen del producto
* @param url_pet, la dirección del api a utilizar
* @return statusCode, devuelve la respuesta del método API
*/
function registrar_product(){

    var id_product = $("#id_product").val();
    var marc_product = $("#marc_product").val();
    var categ_product = $("#categ_product").val();
    var mat_product = $("#mat_product").val();
    var present_product = $("#present_product").val();
    var desc_product = $("#desc_product").val();
    var prec_product = $("#prec_product").val();
    var disp_product = $("#disp_product").val();
    var cant_product = $("#cant_product").val();
    var image_product = document.getElementById("image_product").files[0];

    image_product = url_pet+"/images/products/"+image_product['name'];

    if(disp_product == "true"){
        disp_product = true;
    }else{
        disp_product = false;
    }

    let datos  = {
        reference: id_product, 
        brand: marc_product, 
        category: categ_product, 
        material: mat_product, 
        presentacion: present_product, 
        description: desc_product,
        price: parseInt(prec_product),
        availability: disp_product,
        quantity: parseInt(cant_product),
        photography: image_product
    };

    $.ajax({
        method: "POST",
        url: url_pet+"/api/fragance/new",
        contentType: "application/JSON",
        dataType: "JSON",
        data: JSON.stringify(datos),
        statusCode: {
            201: function() {
                alert("Se registró correctamente el producto");
                mostrar_product();                        
            }
        }
    });
} 

/*
* actualizar_product() 
* Función que llama método API PUT a utilizar
* @param id_product, Referencia del producto
* @param marc_product, Marca del producto
* @param categ_product, Categoría del producto
* @param mat_product, Material del producto
* @param present_product, Presentación del producto
* @param desc_product, Descripción del producto
* @param prec_product, Precio del producto
* @param cant_product, Cantidad del producto
* @param image_product, Imagen del producto
* @param url_pet, la dirección del api a utilizar
* @return statusCode, devuelve la respuesta del método API
*/
function actualizar_product(image){

    var id_product = $("#id_product").val();
    var marc_product = $("#marc_product").val();
    var categ_product = $("#categ_product").val();
    var mat_product = $("#mat_product").val();
    var present_product = $("#present_product").val();
    var desc_product = $("#desc_product").val();
    var prec_product = $("#prec_product").val();
    var disp_product = $("#disp_product").val();
    var cant_product = $("#cant_product").val();
    var image_product = document.getElementById("image_product").files[0];

    if(image_product == undefined){
        image_product = image;
    }else{
        image_product = url_pet+"/images/products/"+image_product['name'];
    }

    if(disp_product == "true"){
        disp_product = true;
    }else{
        disp_product = false;
    }

    let datos  = {
        reference: id_product, 
        brand: marc_product, 
        category: categ_product, 
        material: mat_product, 
        presentacion: present_product, 
        description: desc_product,
        price: parseInt(prec_product),
        availability: disp_product,
        quantity: parseInt(cant_product),
        photography: image_product
    };

    $.ajax({
        type: "PUT",
        url: url_pet+"/api/fragance/update",
        contentType: "application/JSON",
        dataType: "JSON",
        data: JSON.stringify(datos),
        statusCode: {
            201: function() {      
                alert("Se actualizó correctamente el producto");                  
                mostrar_product();
            }
        }
    });
}

/*
* eliminar_product(reference) 
* Función que llama método API DELETE a utilizar
* @param reference, Referencia del producto
* @param url_pet, la dirección del api a utilizar
* @return statusCode, devuelve la respuesta del método API
*/
function eliminar_product(reference){

    $.ajax({
        type: "DELETE",
        url: url_pet+"/api/fragance/"+reference,
        contentType: "application/JSON",
        dataType: "JSON",
        statusCode: {
            204: function() {
                alert("Se eliminó correctamente el producto");
                mostrar_product();
            }
        }
    });
}

/*
* clear_formulario() 
* @return, No retorna nada, solo limpia el formulario
*/
function clear_formulario(){
    $('#form_product')[0].reset();

    $("#tit").text("Registro de Productos");
    $("#id_product").removeAttr('required');
    $(".idProduct").css('display','none');

    $("#form_product").removeAttr("action");
    $("#form_product").attr("action", "javascript:registrar_product()");

    $("#image_product").attr("required", true);

    $("#btn").text("Registrar");
}