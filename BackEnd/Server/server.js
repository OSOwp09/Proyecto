const express = require("express");
require("dotenv").config();
const { dbConnection } = require("../daatabase/config");
const cors = require("cors");
const { socketController } = require("../sockets/controller");

class Server {
	constructor() {
		this.headers = {
			cors: {
				origin: ["http://127.0.0.1:5173", "https://vintarest.netlify.app"],
				methods: ["GET", "POST"],
			},
		};

		// Crear express App
		this.app = express();
		this.port = process.env.PORT;
		this.server = require("http").createServer(this.app);
		this.io = require("socket.io")(this.server, this.headers, {
			pingTimeout: 60000,
		});

		this.paths = {
			auth: "/api/auth",
			publication: "/api/publication",
			search: "/api/search",
			commentary: "/api/commentary",
			delete: "/api/delete",
			chat: "/api/chat"
		};

		this.connectToDB();
		this.addMiddleware();
		this.setRoutes();

		//Sockets
		this.sockets();
	}

	//Base de datos
	async connectToDB() {
		await dbConnection();
	}

	addMiddleware() {
		//CORS
		this.app.use(cors());

		//Lectura y paseo del body
		this.app.use(express.json());

		//Public folder
		this.app.use(express.static("public"));
	}

	setRoutes() {
		//Rutas
		this.app.use(this.paths.auth, require("../routes/auth"));
		this.app.use(this.paths.publication, require("../routes/publication"));
		this.app.use(this.paths.search, require("../routes/search"));
		this.app.use(this.paths.commentary, require("../routes/commentary"));
		this.app.use(this.paths.delete, require("../routes/delete"));
		this.app.use(this.paths.chat, require("../routes/chat"))
	}

	sockets() {
		this.io.on("connection", (socket) => {
			socketController(socket, this.io);
		});
	}

	listen() {
		//Escuchar puerto 4000
		this.server.listen(this.port, () => {
			console.log("servidor corriendo en puerto", process.env.PORT);
		});
	}
}

module.exports = Server;
