window.onload = function(){
    document.getElementById('send-form')
        .addEventListener('click', function(ev){
            localStorage.username = document.getElementById('username').value;
            localStorage.passwd = document.getElementById('passwd').value;
        })
}