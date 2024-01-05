const express = require("express");
const bycrypt = require("bcryptjs");
const Usuario = require("../models/Usuario");

const { generateJWT } = require("../helpers/jwt");

const crearUsuario = async (req, res = express.request) => {
	const { user, email, password, date } = req.body;
	try {
		let usuario = await Usuario.findOne({ email: email });
		if (usuario) {
			return res.status(400).json({
				ok: false,
				msg: "Email already in use",
			});
		}

		usuario = await Usuario.findOne({ user: user });
		if (usuario) {
			return res.status(400).json({
				ok: false,
				msg: "User already in use",
			});
		}
		
		usuario = new Usuario(req.body);
		const salt = bycrypt.genSaltSync();
		usuario.password = bycrypt.hashSync(password, salt);
		await usuario.save();

		return res.status(200).json({
			ok: true,
			usuario,
		});
	} catch (error) {
		console.log(error);
		return res.status(500).json({
			ok: false,
			error,
		});
	}
};

const loginUsuario = async (req, res = express.request) => {
	const { email, password } = req.body;

	try {
		let usuario = await Usuario.findOne({ email: email });
		if (!usuario) {
			return res.status(400).json({
				ok: false,
				msg: "email not found",
			});
		}

		const passwordValid = bycrypt.compareSync(password, usuario.password);
		if (!passwordValid) {
			return res.status(400).json({
				ok: false,
				msg: "wrong password",
			});
		}

		const token = await generateJWT(usuario.id, usuario.name);

		res.status(200).json({
			ok: true,
			usuario,
			token,
		});

	} catch (error) {
		console.log(error);
		res.status(500).json({
			ok: false,
			error,
		});
	}
};

const revalidarToken = async (req, res = express.request) => {
	const { email } = req.query;

	const token = await generateJWT(email);

	return res.json({
		ok: true,
		token,
	});
};



module.exports = {
	crearUsuario,
	loginUsuario,
	revalidarToken,
};
