const express = require('express');
const cors = require("cors");

const app = express();

app.use(cors());

require('dotenv').config()

app.use(express.json());

app.get('/', (req, res) => {
  res.send('Funciona')
})

const ProdutoRoute = require('./src/routes/ProdutoRoute.js')
app.use('/produto', ProdutoRoute)

const ClienteRoute = require('./src/routes/ClienteRoute.js')
app.use('/cliente', ClienteRoute)

const VendaRoute = require('./src/routes/VendaRoute.js')
app.use('/venda', VendaRoute)

app.listen(3000, () => {
  console.log('Servidor rodando na porta 3000');
});