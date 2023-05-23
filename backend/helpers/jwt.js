const jwt = require("jsonwebtoken");

const generateJWT = (email) => {
	return new Promise((resolve, reject) => {
		const payload = { email: email };
		jwt.sign(
			payload,
			process.env.SECRET_JWT_SEED,
			{
				expiresIn: '2h',
			},
			(error, token) => {
				if (error) {
					console.log(error);
					reject("No se pudo generear el token");
				}

				resolve(token);
			}
		);
	});
};

module.exports = { generateJWT };
