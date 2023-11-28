const prisma = require('../config/prisma.js')
const VendaService = require('../services/VendaService.js')

this.service = new VendaService('Venda', prisma)

exports.findAll = async (req , res) => {
    try {
        const result = await this.service.findAll(req)
        console.log(this.modelName)
        res.status(200).send({...result})
    } catch (e) {
        res.status(400).send('Erro ao buscar')
    }
}

exports.findById = async  (req, res) => {
    try {
        const { id } = req.params;
        const result = await this.service.findById(id);
        res.status(200).send(result);
    } catch (e) {
        res.status(400).send('Erro ao buscar por ID');
    }
}

exports.create = async (req, res) => {
    try {
      const { cliente_id, data_pedido, quantidade, produto_id } = req.body;
  
      const novoVenda = await prisma.venda.create({
        data: {
          itens: {},
          cliente_id,
          data_pedido,
          quantidade,
          produto_id,
        },
      });
  
      res.status(201).json(novoVenda);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Não foi possível criar a venda.' });
    }
  }

exports.update = async  (req, res) => {
    try {
        const { id } = req.params;
        const dadosAtualizados = req.body;
        const result = await this.service.update(id, dadosAtualizados);
        res.status(200).send(result);
    } catch (e) {
        res.status(400).send('Erro ao atualizar');
    }
}

exports.destroy = async  (req, res) => {
    try {
        const { id } = req.params;
        const result = await this.service.delete(id);
        res.status(200).send(result);
    } catch (e) {
        res.status(400).send('Erro ao excluir');
    }
}