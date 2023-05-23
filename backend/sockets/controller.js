const socketController = (socket, io) => {
	console.log("Cliente Desconectado", socket.id);

    socket.on('disconnected', ()=>{
        console.log('Cliente desconectado', socket.id)
    })

    socket.on('mensaje-de-cliente',(payload, callback)=>{
        callback('Tu mensaje fue recibido')

        payload.from = 'desde el server'
        socket.broadcast.emit('mensaje-de-server', payload)
    })

    socket.on('enviar-mensaje',({to,from,mensaje})=>{
        if (to) {
            socket.to(to).emit('ricibir-mensaje',{to,from,mensaje})
        } else {
            io.emit('recibir-mensaje',{from, mensaje})
        }
    })
};

module.exports = {socketController}