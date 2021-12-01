// Variable para inicializar el DataTable
var tabla, tabla1, tabla2, tabla3, session;
// Variables Globales
var formulario_login, formulario_register, contenedor_login_register, caja_trasera_login, caja_trasera_register;
// Variable para guardar la URL de las peticiones
var url_pet = "http://129.151.121.112";


$(document).ready( function () {
    document.getElementById("btn__iniciar-sesion").addEventListener("click", iniciarSesion);
    document.getElementById("btn__registrarse").addEventListener("click", register);
    window.addEventListener("resize", anchoPage);

    formulario_login = document.querySelector(".formulario__login");
    formulario_register = document.querySelector(".formulario__register");
    contenedor_login_register = document.querySelector(".contenedor__login-register");
    caja_trasera_login = document.querySelector(".caja__trasera-login");
    caja_trasera_register = document.querySelector(".caja__trasera-register");

    session = localStorage.getItem('session');
    console.log(session);
    if(session == 'true'){
        window.location.href = 'catalogo.html';
    }/*else{
        localStorage.setItem('session',false);
        window.location.href = 'index.html';
    }*/

    anchoPage();
} );

function anchoPage() {

    if (window.innerWidth > 850) {
        caja_trasera_register.style.display = "block";
        caja_trasera_login.style.display = "block";
    } else {
        caja_trasera_register.style.display = "block";
        caja_trasera_register.style.opacity = "1";
        caja_trasera_login.style.display = "none";
        formulario_login.style.display = "block";
        contenedor_login_register.style.left = "0px";
        formulario_register.style.display = "none";
    }
}

function iniciarSesion() {
    if (window.innerWidth > 850) {
        formulario_login.style.display = "block";
        contenedor_login_register.style.left = "10px";
        formulario_register.style.display = "none";
        caja_trasera_register.style.opacity = "1";
        caja_trasera_login.style.opacity = "0";
    } else {
        formulario_login.style.display = "block";
        contenedor_login_register.style.left = "0px";
        formulario_register.style.display = "none";
        caja_trasera_register.style.display = "block";
        caja_trasera_login.style.display = "none";
    }
}

function register() {
    if (window.innerWidth > 850) {
        formulario_register.style.display = "block";
        contenedor_login_register.style.left = "410px";
        formulario_login.style.display = "none";
        caja_trasera_register.style.opacity = "0";
        caja_trasera_login.style.opacity = "1";
    } else {
        formulario_register.style.display = "block";
        contenedor_login_register.style.left = "0px";
        formulario_login.style.display = "none";
        caja_trasera_register.style.display = "none";
        caja_trasera_login.style.display = "block";
        caja_trasera_login.style.opacity = "1";
    }
}

/*
* login() 
* Función que llama método API POST a utilizar
* @param correo, Usuario
* @param passw, Contraseña
* @param url_pet, la dirección del api a utilizar
* @return statusCode, devuelve la respuesta del método API
*/
function login(){

    var correo = $("#usuario").val();
    var passw  = $("#clave").val();
    
    $(".mensaje").html("").hide("slide").removeClass('text-danger');

    /* Petición para validar el usuario */
    $.ajax({
        method: "GET",
        url: url_pet+"/api/user/emailexist/"+correo,
        success: function(response){
            if(response !== false){
                /* Petición para validar el usuario y la contraseña */
                $.ajax({
                    method: "GET",
                    url: url_pet+"/api/user/"+correo+"/"+passw,
                    success: function(response1){
                        console.log(response1);
                        if(response1 !== null){
                            $(".mensaje").html("").hide("slide").removeClass('text-danger');
                            $(".mensaje").html("Bienvenid@ "+response1['name']).show("slide").addClass('text-success');
                            window.setTimeout(function() {
                                localStorage.setItem('session',true);
                                window.location.href = 'catalogo.html';
                            }, 6000);
                        }else{
                            localStorage.setItem('session',false);
                            $(".mensaje").html("La contraseña es incorrecta").show("slide").addClass('text-danger');
                        }
                    }
                });
            }else{
                localStorage.setItem('session',false);
                $(".mensaje").html("El usuario no esta registrado").show("slide").addClass('text-danger');
            }
        }
    });
}

/*
* registrar() 
* Función que llama método API POST a utilizar
* @param nombre, Nombre
* @param email, Correo
* @param password, Contraseña
* @param url_pet, la dirección del api a utilizar
* @return statusCode, devuelve la respuesta del método API
*/
function registrar(){
    var nombre = $("#nombre").val();
    var correo = $("#correo").val();
    var passw  = $("#passw").val();

    let datos = {
        name: nombre,
        email: correo,
        password: passw
    };

    /* Petición para validar el usuario */
    $.ajax({
        method: "GET",
        url: url_pet+"/api/user/emailexist/"+correo,
        success: function(response){
            console.log(response);
            if(response === false){
                /* Petición para registrar el usuario */
                $.ajax({
                    method: "POST",
                    url: url_pet+"/api/user/new",
                    contentType: "application/JSON",
                    dataType: "JSON",
                    data: JSON.stringify(datos),
                    statusCode: {
                        201: function() {
                            $(".mensaje").html("Se registró correctamente").show("slide").addClass('text-success');      
                            window.setTimeout(function() {
                                $(".mensaje").html("").hide("slide").removeClass('text-success');
                                $('.formulario__register')[0].reset();
                            }, 2000);              
                        },
                        500: function(){
                            $(".mensaje").html("Ocurrio un error").show("slide").addClass('text-danger');
                        },
                        401: function(){
                            $(".mensaje").html("No autorizado").show("slide").addClass('text-danger');
                        }
                    }
                });
            }else{
                $(".mensaje").html("El usuario ya se encuentra registrado").show("slide").addClass('text-danger');
            }
        }
    });    
}

function cerrar(){
    localStorage.setItem('session',false);
    window.location.href = 'index.html';
}