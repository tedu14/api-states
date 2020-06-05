const express = require('express');

const port = 3333;
const app = express();

global.estados = 'docs/Estados.json';
global.cidades = 'docs/Cidades.json';

app.use(express.json());

app.use(require('./routes'))

app.listen(port, () => {
    console.log(`Rodando na port ${port}`);
})