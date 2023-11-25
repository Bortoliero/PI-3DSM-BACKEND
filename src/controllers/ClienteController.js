const prisma = require('../config/prisma.js');
const ClienteService = require('../services/ClienteService.js');

class ClienteController {
    constructor() {
        this.service = new ClienteService('Cliente', prisma);
    }

    async findAll(req, res) {
        try {
            const result = await this.service.findAll(req);
            res.status(200).send({ ...result });
        } catch (e) {
            res.status(400).send('Erro ao buscar clientes');
        }
    }

    async findById(req, res) {
        try {
            const { id } = req.params;
            const result = await this.service.findById(id);
            res.status(200).send(result);
        } catch (e) {
            res.status(400).send('Erro ao buscar cliente por ID');
        }
    }

    async create(req, res) {
        try {
            const novoCliente = req.body;
            console.log(req.body, "controller");
            const result = await this.service.create(novoCliente);
            res.status(201).send(result);
        } catch (e) {
            res.status(400).send('Erro ao criar cliente');
        }
    }

    async update(req, res) {
        try {
            const { id } = req.params;
            const dadosAtualizados = req.body;
            const result = await this.service.update(id, dadosAtualizados);
            res.status(200).send(result);
        } catch (e) {
            res.status(400).send('Erro ao atualizar cliente');
        }
    }

    async delete(req, res) {
        try {
            const { id } = req.params;
            const result = await this.service.delete(id);
            res.status(200).send(result);
        } catch (e) {
            res.status(400).send('Erro ao excluir cliente');
        }
    }
}

module.exports = ClienteController;
