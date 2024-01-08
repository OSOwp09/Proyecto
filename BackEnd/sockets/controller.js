const socketController = (socket, io) => {
	socket.on("setup", (userData) => {
		socket.join(userData.uid);
		socket.emit("connected");
	});

	socket.on("join chat", (room) => {
		socket.join(room);
	});

	socket.on("typing", (room) => socket.in(room).emit("typing"));
	socket.on("stop typing", (room) => socket.in(room).emit("stop typing"));

	socket.on("new message", (newMessageRecieved) => {
		console.log(newMessageRecieved);
		io.in(newMessageRecieved.room).emit(
			"message recieved",
			newMessageRecieved.message
		);
	});

	socket.off("setup", () => {
		console.log("USER DISCONNECTED");
		socket.leave(userData._id);
	});
};

module.exports = { socketController };
