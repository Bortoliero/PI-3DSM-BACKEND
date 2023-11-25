const prisma = require('../config/prisma.js')
const ProdutoService = require('../services/ProdutoService.js')

class ProdutoController {
    constructor(){
        this.service = new ProdutoService('Produto', prisma)
    }

    async findAll(req, res){
        try {
            const result = await this.service.findAll(req)
            console.log(this.modelName)
            res.status(200).send({...result})
        } catch (e) {
            res.status(400).send('Erro ao buscar produtos')
        }
    }

    async findById(req, res) {
        try {
            const { id } = req.params;
            const result = await this.service.findById(id);
            res.status(200).send(result);
        } catch (e) {
            res.status(400).send('Erro ao buscar produto por ID');
        }
    }

    async create (req, res) {
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

    async update(req, res) {
        try {
            const { id } = req.params;
            const dadosAtualizados = req.body;
            const result = await this.service.update(id, dadosAtualizados);
            res.status(200).send(result);
        } catch (e) {
            res.status(400).send('Erro ao atualizar produto');
        }
    }

    async delete(req, res) {
        try {
            const { id } = req.params;
            const result = await this.service.delete(id);
            res.status(200).send(result);
        } catch (e) {
            res.status(400).send('Erro ao excluir produto');
        }
    }
}


module.exports = ProdutoController