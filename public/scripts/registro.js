function send(){
    $.ajax({
        data: {"name":"ulises"},
        url:"http://127.0.0.1:3000/login", 
        type:"post",
        success:function(datos){ 
            console.log("returned: ", datos)
        },
        error: function( jqXhr, textStatus, errorThrown ){
            console.log( errorThrown );
        }
    })
}