require('dotenv').config();
const express = require('express');
const cors = require('cors');
const routes = require('./routes');
const app = express();
const port = process.env.DB_PORT || 3000;

app.use(
	cors({
		origin: (process.env.ORIGIN),
		methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
	})
);

routes(app);

app.listen(port, () => console.log(`Servidor está rodando na porta ${port}`));

module.exports = app;
