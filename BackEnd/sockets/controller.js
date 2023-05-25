// const socketController = (socket, io) => {
// 	console.log("Cliente Desconectado", socket.id);

//     socket.on('disconnected', ()=>{
//         console.log('Cliente desconectado', socket.id)
//     })

//     socket.on('mensaje-de-cliente',(payload, callback)=>{
//         callback('Tu mensaje fue recibido')

//         payload.from = 'desde el server'
//         socket.broadcast.emit('mensaje-de-server', payload)
//     })

//     socket.on('enviar-mensaje',({to,from,mensaje})=>{
//         if (to) {
//             socket.to(to).emit('ricibir-mensaje',{to,from,mensaje})
//         } else {
//             io.emit('recibir-mensaje',{from, mensaje})
//         }
//     })
// };

const socketController = (socket, io) => {
    
	socket.on("setup", (userData) => {
		console.log("userDataFromFront", userData.uid);
		socket.join(userData.uid);
		socket.emit("connected");
	});

	socket.on("join chat", (room) => {
		socket.join(room);
		console.log("user join room" + room);
	});

	socket.on("typing", (room) => socket.in(room).emit("typing"));
	socket.on("stop typing", (room) => socket.in(room).emit("stop typing"));

	socket.on("new message", (newMessageRecieved) => {
		let chat = newMessageRecieved.chat;

		if (!chat.users) return console.log("chat.users not defined");

		chat.users.forEach((user) => {
			if (user.uid == newMessageRecieved.sender._id) return;

			socket.in(user.uid).emit("message recieved", newMessageRecieved);
		});
	});

	socket.off("setup", () => {
		console.log("USER DISCONNECTED");
		socket.leave(userData._id);
	});
};

module.exports = { socketController };
