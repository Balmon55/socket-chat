const socket = io();

// Documentos del DOM
let message = document.getElementById('message');
let username = document.getElementById('username');
let btn = document.getElementById('send');
let output = document.getElementById('output');
let actions = document.getElementById('actions');
const lblonline = document.querySelector("#lblonline")
const lbloffline = document.querySelector("#lbloffline")


socket.on('connect',()=>{
    console.log('Conectado');
    lblonline.style.display=''
    lbloffline.style.display='none'

})
socket.on('disconnect',()=>{
    console.log('Desconcentado del servidor')
    lblonline.style.display='none'
    lbloffline.style.display=''
})
btn.addEventListener('click', function(){
    socket.emit('chat:message', {
        message: message.value,
        username: username.value
    });
    message.value='';
    
});
message.addEventListener('keypress', function(){
    console.log(username.value);
    socket.emit('chat:typing', username.value);
});


socket.on('chat:message', function (data){
    actions.innerHTML= '';
    output.innerHTML += `<p>
    <strong>${data.username}</strong>:${data.message}
    </p>`
});
socket.on('chat:typing', function(data){
    actions.innerHTML= `<p><em>${data} esta tipiando un mensaje </em></p>`
})