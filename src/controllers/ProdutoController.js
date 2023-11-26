const prisma = require('../config/prisma.js')
const ProdutoService = require('../services/ProdutoService.js')

this.service = new ProdutoService('Produto', prisma)

exports.findAll = async (req, res) => {
    try {
        const result = await this.service.findAll(req)
        console.log(this.modelName)
        res.status(200).send({...result})
    } catch (e) {
        res.status(400).send('Erro ao buscar produtos')
    }
}

exports.findById  = async (req, res) => {
    try {
        const { id } = req.params;
        const result = await this.service.findById(id);
        res.status(200).send(result);
    } catch (e) {
        res.status(400).send('Erro ao buscar produto por ID');
    }
}

exports.create = async (req, res) => {
try {
    const { nome, preco, classificacao, cor, espessura } = req.body;
    const novoProduto = await prisma.produto.create({
    data: {
        nome,
        preco,
        classificacao,
        cor,
        espessura
    },
    });
    res.status(201).json(novoProduto);
} catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Não foi possível criar o produto.' });
}
}

exports.update = async (req, res) =>  {
    try {
        const { id } = req.params;
        const dadosAtualizados = req.body;
        const result = await this.service.update(id, dadosAtualizados);
        res.status(200).send(result);
    } catch (e) {
        res.status(400).send('Erro ao atualizar produto');
    }
}

exports.destroy = async (req, res) =>  {
    try {
        const { id } = req.params;
        const result = await this.service.delete(id);
        res.status(200).send(result);
    } catch (e) {
        res.status(400).send('Erro ao excluir produto');
    }
}