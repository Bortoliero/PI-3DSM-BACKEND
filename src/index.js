const express = require('express');
const cors = require("cors");

const app = express();

app.use(cors());

require('dotenv').config()

app.use(express.json());

app.get('/', (req, res) => {
  res.send('Funciona')
})

app.listen(3000, () => {
  console.log('Servidor rodando na porta 3000');
});

require('./routes')(app)