const express = require('express');
const cors = require('cors');
const routes = require('./routes');
const app = express();
const port = 3000;

app.use(
	cors({
		origin: 'http://localhost:4200',
		methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
	})
);

routes(app);

app.listen(port, () => console.log(`Servidor está rodando na porta ${port}`));

module.exports = app;
