const socketController = (socket, io) => {
	socket.on("setup", (userData) => {
		//console.log("userDataFromFront", userData.uid);
		socket.join(userData.uid);
		socket.emit("connected");
	});

	socket.on("join chat", (room) => {
		socket.join(room);
		//console.log("user join room " + room);
	});

	socket.on("typing", (room) => socket.in(room).emit("typing"));
	socket.on("stop typing", (room) => socket.in(room).emit("stop typing"));

	socket.on("new message", (newMessageRecieved) => {
		
		//socket.emit("message recieved", newMessageRecieved.message);

		//646ac52b8d2247070600e457-room-64715fc659d451c7703d02ea
		console.log(newMessageRecieved)
		io.in(newMessageRecieved.room).emit("message recieved", newMessageRecieved.message);
		
		// let chat = newMessageRecieved.chat;

		// if (!chat.users) return console.log("chat.users not defined");

		// chat.users.forEach((user) => {
		// 	if (user.uid == newMessageRecieved.sender._id) return;

		// 	socket.in(user.uid).emit("message recieved", newMessageRecieved);
		// });
	});

	socket.off("setup", () => {
		console.log("USER DISCONNECTED");
		socket.leave(userData._id);
	});
};

module.exports = { socketController };
