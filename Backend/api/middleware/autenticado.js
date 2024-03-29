require('dotenv').config();
const database = require('../models');
const { verify, decode } = require('jsonwebtoken');

module.exports = async (req, res, next) => {
	const token = req.headers.authorization;

	if (!token) {
		return res.status(401).send('Access token não informado');
	}

	const [, accessToken] = token.split(' ');

	try {
		const isTokenInvalid = await database.InvalidTokens.findOne({
			where: { token: accessToken },
		});
		if (isTokenInvalid) {
			return res.status(401).send('Token inválido');
		}

		verify(accessToken, (process.env.SECRET));

		const { id, email } = await decode(accessToken);

		req.usuarioId = id;
		req.usuarioEmail = email;

		return next();
	} catch (error) {
		res.status(401).send('Usuário não autorizado');
	}
};
