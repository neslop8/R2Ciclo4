$(document).ready( function () {
    session = localStorage.getItem('session');
    console.log(session);
    
    if(session == 'false'){
        localStorage.setItem('session',false);
        window.location.href = 'index.html';
    }

    // Crear instancia de DataTable
    tabla = $('#tabla_user').DataTable({
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

    // Llamado a función mostrar_user()
    mostrar_user();
});

/*
* mostrar_user() 
* Función que llama método API GET a utilizar
* @param url_pet, la dirección del api a utilizar
* @return Response, devuelve la respuesta del método API, Listado de usuarios
*/
function mostrar_user(){

    tabla.clear().draw();

    clear_formulario();

    $.ajax({
        method: "GET",
        url: url_pet+"/api/user/all",
        success: function(response){
            console.log(response);
            if(response.length > 0){
                for (var a = 0; a < response.length; a++) {
                    tabla.row.add([
                        response[a]['id'],
                        response[a]['identification'],
                        response[a]['name'],
                        response[a]['cellPhone'],
                        response[a]['address'],
                        response[a]['email'],
                        response[a]['password'],
                        response[a]['type'],
                        response[a]['zone'],
                        '<a class="btn btn-info text-center text-white" style="cursor: pointer;" onclick="javascript:ver_detalle('+response[a]['id']+')">Ver</a>',
                        '<a class="btn btn-danger text-center text-white" style="cursor: pointer;" onclick="javascript:eliminar_user('+response[a]['id']+')">Eliminar</a>'
                    ]).draw();
                }
            }
        }
    });
}               

/*
* ver_detalle(id) 
* Función que llama método API GET a utilizar
* @param id, El id del admin a consultar
* @param url_pet, la dirección del api a utilizar
* @return Response, devuelve la respuesta del método API, Información del usuario
*/
function ver_detalle(id){
    $.ajax({
        method: "GET",
        url: url_pet+"/api/user/"+id,
        contentType: "application/JSON",
        dataType: "JSON",
        success: function(response){

            $("#tit").text("Información Usuario");

            $("#id_user").val(response['id']);
            $("#id_user").attr('readonly', 'readonly');
            $("#id_user").attr('required', true);
            $(".idUser").css('display','block');

            $("#btn").text("Actualizar");

            $("#form_user").removeAttr("action");
            $("#form_user").attr("action", "javascript:actualizar_user()");

            $("#ident_user").val(response['identification']);
            $("#nom_user").val(response['name']);
            $("#tel_user").val(response['cellPhone']);
            $("#direcc_user").val(response['address']);
            $("#email_user").val(response['email']);
            $("#pass_user").val(response['password']);
            $("#tipo_user").val(response['type']);
            $("#zona_user").val(response['zone']);
        }
    });
}

/*
* registrar_user() 
* Función que llama método API POST a utilizar
* @param ident_user, Identificación del usuario
* @param name_user, Nombre del usuario
* @param tel_user, Teléfono del usuario
* @param direcc_user, Dirección del usuario
* @param email_user, Correo del usuario
* @param pass_user, Password del usuario
* @param tipo_user, Tipo de usuario
* @param zona_user, Zona del usuario
* @param url_pet, la dirección del api a utilizar
* @return statusCode, devuelve la respuesta del método API
*/
function registrar_user(){

    var ident_user = $("#ident_user").val();
    var name_user = $("#nom_user").val();
    var tel_user = $("#tel_user").val();
    var direcc_user = $("#direcc_user").val();
    var email_user = $("#email_user").val();
    var pass_user = $("#pass_user").val();
    var tipo_user = $("#tipo_user").val();
    var zona_user = $("#zona_user").val();

    let datos  = {
        identification: parseInt(ident_user), 
        name: name_user, 
        cellPhone: parseInt(tel_user), 
        address: direcc_user, 
        email: email_user, 
        password: pass_user,
        type: tipo_user,
        zone: zona_user
    };

    $.ajax({
        method: "POST",
        url: url_pet+"/api/user/new",
        contentType: "application/JSON",
        dataType: "JSON",
        data: JSON.stringify(datos),
        statusCode: {
            201: function() {
                alert("Se registró correctamente el usuario");
                mostrar_user();                        
            }
        }
    });
} 

/*
* actualizar_user() 
* Función que llama método API PUT a utilizar
* @param id_user, Id del usuario
* @param ident_user, Identificación del usuario
* @param name_user, Nombre del usuario
* @param tel_user, Teléfono del usuario
* @param direcc_user, Dirección del usuario
* @param email_user, Correo del usuario
* @param pass_user, Password del usuario
* @param tipo_user, Tipo de usuario
* @param zona_user, Zona del usuario
* @param url_pet, la dirección del api a utilizar
* @return statusCode, devuelve la respuesta del método API
*/
function actualizar_user(){

    var id_user = $("#id_user").val();
    var ident_user = $("#ident_user").val();
    var name_user = $("#nom_user").val();
    var tel_user = $("#tel_user").val();
    var direcc_user = $("#direcc_user").val();
    var email_user = $("#email_user").val();
    var pass_user = $("#pass_user").val();
    var tipo_user = $("#tipo_user").val();
    var zona_user = $("#zona_user").val();

    let datos  = {
        id: parseInt(id_user),
        identification: parseInt(ident_user), 
        name: name_user, 
        cellPhone: parseInt(tel_user), 
        address: direcc_user, 
        email: email_user, 
        password: pass_user,
        type: tipo_user,
        zone: zona_user
    };

    $.ajax({
        type: "PUT",
        url: url_pet+"/api/user/update",
        contentType: "application/JSON",
        dataType: "JSON",
        data: JSON.stringify(datos),
        statusCode: {
            201: function() {      
                alert("Se actualizó correctamente el usuario");                  
                mostrar_user();
            }
        }
    });
}

/*
* eliminar_user(id_user) 
* Función que llama método API DELETE a utilizar
* @param id_user, Id del usuario
* @param url_pet, la dirección del api a utilizar
* @return statusCode, devuelve la respuesta del método API
*/
function eliminar_user(id_user){

    $.ajax({
        type: "DELETE",
        url: url_pet+"/api/user/"+id_user,
        contentType: "application/JSON",
        dataType: "JSON",
        statusCode: {
            204: function() {
                alert("Se eliminó correctamente el usuario");
                mostrar_user();
            }
        }
    });
}

/*
* clear_formulario() 
* @return, No retorna nada, solo limpia el formulario
*/
function clear_formulario(){
    $('#form_user')[0].reset();

    $("#tit").text("Registro de Usuarios");
    $("#id_user").removeAttr('required');
    $(".idUser").css('display','none');

    $("#form_user").removeAttr("action");
    $("#form_user").attr("action", "javascript:registrar_user()");

    $("#btn").text("Registrar");
}