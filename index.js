const path = require('path');
const express = require ('express');
const app= express();


//Configuraciones
app.set('port',process.env.PORT || 3020);

//Archivos estaticos
app.use(express.static(path.join(__dirname, 'public')));

//Iniciar el Servidor
const server = app.listen(app.get('port'),()=>{
    console.log('servidor en el puerto', app.get('port'))
})

    //Web Sockets
    const SocketIO = require('socket.io');
    const io = SocketIO(server);

    io.on('connection', (socket)=>{
        console.log('new connection', socket.id)

        socket.on('chat:message', (data)=>{
           io.sockets.emit('chat:message', data);
        });

        socket.on('chat:typing', (data)=>{
        
            socket.broadcast.emit('chat:typing', data)
        });


    });


