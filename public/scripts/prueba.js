function enviar(){
    var parameters = {'valor1': 'hola'}
    $.ajax({
        data: parameters,
        url: 'http://localhost:3000/prueba',
        type: 'post',
        success: function(response){
            console.log(response);
        }
    })
}