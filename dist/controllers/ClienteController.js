var __getOwnPropNames = Object.getOwnPropertyNames;
var __commonJS = (cb, mod) => function __require() {
  return mod || (0, cb[__getOwnPropNames(cb)[0]])((mod = { exports: {} }).exports, mod), mod.exports;
};

// src/config/prisma.js
var require_prisma = __commonJS({
  "src/config/prisma.js"(exports2, module2) {
    var { PrismaClient } = require("@prisma/client");
    var prisma2 = new PrismaClient();
    module2.exports = prisma2;
  }
});

// src/services/ClienteService.js
var require_ClienteService = __commonJS({
  "src/services/ClienteService.js"(exports2, module2) {
    var prisma2 = require_prisma();
    var ClienteService2 = class {
      constructor(modelName, prisma3) {
        this.modelName = modelName;
        this.prisma = prisma3;
      }
      async findAll() {
        return await this.prisma[this.modelName].findMany();
      }
      async findById(id) {
        return await this.prisma[this.modelName].findUnique({
          where: { id }
        });
      }
      async create(data) {
        console.log("service");
        return await this.prisma[this.modelName].create({
          data
        });
      }
      async update(id, data) {
        return await this.prisma[this.modelName].update({
          where: { id },
          data
        });
      }
      async delete(id) {
        return await this.prisma[this.modelName].delete({
          where: { id }
        });
      }
    };
    module2.exports = ClienteService2;
  }
});

// src/controllers/ClienteController.js
var prisma = require_prisma();
var ClienteService = require_ClienteService();
var ClienteController = class {
  constructor() {
    this.service = new ClienteService("Cliente", prisma);
  }
  async findAll(req, res) {
    try {
      const result = await this.service.findAll(req);
      res.status(200).send({ ...result });
    } catch (e) {
      res.status(400).send("Erro ao buscar clientes");
    }
  }
  async findById(req, res) {
    try {
      const { id } = req.params;
      const result = await this.service.findById(id);
      res.status(200).send(result);
    } catch (e) {
      res.status(400).send("Erro ao buscar cliente por ID");
    }
  }
  async create(req, res) {
    try {
      const novoCliente = req.body;
      console.log(req.body, "controller");
      const result = await this.service.create(novoCliente);
      res.status(201).send(result);
    } catch (e) {
      res.status(400).send("Erro ao criar cliente");
    }
  }
  async update(req, res) {
    try {
      const { id } = req.params;
      const dadosAtualizados = req.body;
      const result = await this.service.update(id, dadosAtualizados);
      res.status(200).send(result);
    } catch (e) {
      res.status(400).send("Erro ao atualizar cliente");
    }
  }
  async delete(req, res) {
    try {
      const { id } = req.params;
      const result = await this.service.delete(id);
      res.status(200).send(result);
    } catch (e) {
      res.status(400).send("Erro ao excluir cliente");
    }
  }
};
module.exports = ClienteController;
