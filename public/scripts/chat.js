$(document).ready(function(){
    //¿Cómo llegó io hasta aquí?
    var socket = io("http://localhost:3000/");
    username(socket);
    updateUsers(socket);
    newMessage(socket);
    updateMessages(socket);

});

function username(socket){
    socket.username = localStorage.username;
    socket.emit('username', {
        username: socket.username
    });
}

function updateUsers(socket){
    socket.on('updateUsers', function(data){
        $('#users').html('');
        for(var i = 0; i<data.users.length; i++){
            $('#users').append(`<div class='user'><i class='fa fa-circle online-icon'></i>${data.users[i]}</div>`);
        }
    });
}

function newMessage(socket){
    $('#message').keydown(function(ev){
        if(ev.keyCode == 13){
            ev.preventDefault();
            $('#send-msg-form').submit(); 
        }
    });
    $('#send-msg-form').submit(function(evt){
        evt.preventDefault();
        socket.emit('newMessage',{
            username: socket.username,
            message: document.getElementById('message').value
        });
        document.getElementById('send-msg-form').reset();
    });
}

function updateMessages(socket){
    socket.on('updateMessages', function(data){
        var messagesList = document.getElementById('msgs-list');
        if(data.username == socket.username){
            messagesList.innerHTML +=`<div class='my-msg full-width flex'>
                                        <div class='blue message'>
                                            <h4>Tú</h4>
                                            <p class='ligther'>${data.message}</p>
                                        </div>
                                    </div>`;
        }else{
            messagesList.innerHTML +=`<div class='full-width flex'>
                                        <div class='pink message'>
                                            <h4>${data.username}</h4>
                                            <p class='ligther'>${data.message}</p>
                                        </div>
                                    </div>`;
        }
    });
}