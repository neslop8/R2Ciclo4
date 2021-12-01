$(document).ready( function () {
    session = localStorage.getItem('session');
    console.log(session);
    
    if(session == 'false'){
        localStorage.setItem('session',false);
        window.location.href = 'index.html';
    }
});