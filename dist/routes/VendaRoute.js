var __getOwnPropNames = Object.getOwnPropertyNames;
var __commonJS = (cb, mod) => function __require() {
  return mod || (0, cb[__getOwnPropNames(cb)[0]])((mod = { exports: {} }).exports, mod), mod.exports;
};

// src/config/prisma.js
var require_prisma = __commonJS({
  "src/config/prisma.js"(exports2, module2) {
    var { PrismaClient } = require("@prisma/client");
    var prisma = new PrismaClient();
    module2.exports = prisma;
  }
});

// src/services/VendaService.js
var require_VendaService = __commonJS({
  "src/services/VendaService.js"(exports2, module2) {
    var prisma = require_prisma();
    var VendaService = class {
      constructor(modelName, prisma2) {
        this.modelName = modelName;
        this.prisma = prisma2;
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
    module2.exports = VendaService;
  }
});

// src/controllers/VendaController.js
var require_VendaController = __commonJS({
  "src/controllers/VendaController.js"(exports2, module2) {
    var prisma = require_prisma();
    var VendaService = require_VendaService();
    var VendaController2 = class {
      constructor() {
        this.service = new VendaService("Venda", prisma);
      }
      async findAll(req, res) {
        try {
          const result = await this.service.findAll(req);
          console.log(this.modelName);
          res.status(200).send({ ...result });
        } catch (e) {
          res.status(400).send("Erro ao buscar");
        }
      }
      async findById(req, res) {
        try {
          const { id } = req.params;
          const result = await this.service.findById(id);
          res.status(200).send(result);
        } catch (e) {
          res.status(400).send("Erro ao buscar por ID");
        }
      }
      async create(req, res) {
        try {
          const { nome, preco, classificacao, cor, espessura } = req.body;
          const novoVenda = await prisma.produto.create({
            data: {
              nome,
              preco,
              classificacao,
              cor,
              espessura
            }
          });
          res.status(201).json(novoVenda);
        } catch (error) {
          console.error(error);
          res.status(500).json({ error: "N\xE3o foi poss\xEDvel criar." });
        }
      }
      async update(req, res) {
        try {
          const { id } = req.params;
          const dadosAtualizados = req.body;
          const result = await this.service.update(id, dadosAtualizados);
          res.status(200).send(result);
        } catch (e) {
          res.status(400).send("Erro ao atualizar");
        }
      }
      async delete(req, res) {
        try {
          const { id } = req.params;
          const result = await this.service.delete(id);
          res.status(200).send(result);
        } catch (e) {
          res.status(400).send("Erro ao excluir");
        }
      }
    };
    module2.exports = VendaController2;
  }
});

// src/routes/VendaRoute.js
var VendaController = require_VendaController();
var VendaRoute = class {
  constructor(app) {
    this.controller = new VendaController();
    this.app = app;
    this.setupRoutes();
  }
  setupRoutes() {
    this.app.get("/venda", this.controller.findAll.bind(this.controller));
    this.app.get("/venda/:id", this.controller.findById.bind(this.controller));
    this.app.post("/venda", this.controller.create.bind(this.controller));
    this.app.put("/venda/:id", this.controller.update.bind(this.controller));
    this.app.delete("/venda/:id", this.controller.delete.bind(this.controller));
  }
};
module.exports = (app) => {
  return new VendaRoute(app);
};
