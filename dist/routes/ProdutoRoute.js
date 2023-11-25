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

// src/services/ProdutoService.js
var require_ProdutoService = __commonJS({
  "src/services/ProdutoService.js"(exports2, module2) {
    var prisma = require_prisma();
    var ProdutoService = class {
      constructor(modelName, prismaInstance) {
        this.modelName = modelName;
        this.prisma = prisma;
      }
      async findAll(req) {
        console.log("service");
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
    module2.exports = ProdutoService;
  }
});

// src/controllers/ProdutoController.js
var require_ProdutoController = __commonJS({
  "src/controllers/ProdutoController.js"(exports2, module2) {
    var prisma = require_prisma();
    var ProdutoService = require_ProdutoService();
    var ProdutoController2 = class {
      constructor() {
        this.service = new ProdutoService("Produto", prisma);
      }
      async findAll(req, res) {
        try {
          const result = await this.service.findAll(req);
          console.log(this.modelName);
          res.status(200).send({ ...result });
        } catch (e) {
          res.status(400).send("Erro ao buscar produtos");
        }
      }
      async findById(req, res) {
        try {
          const { id } = req.params;
          const result = await this.service.findById(id);
          res.status(200).send(result);
        } catch (e) {
          res.status(400).send("Erro ao buscar produto por ID");
        }
      }
      async create(req, res) {
        try {
          const { nome, preco, classificacao, cor, espessura } = req.body;
          const novoProduto = await prisma.produto.create({
            data: {
              nome,
              preco,
              classificacao,
              cor,
              espessura
            }
          });
          res.status(201).json(novoProduto);
        } catch (error) {
          console.error(error);
          res.status(500).json({ error: "N\xE3o foi poss\xEDvel criar o produto." });
        }
      }
      async update(req, res) {
        try {
          const { id } = req.params;
          const dadosAtualizados = req.body;
          const result = await this.service.update(id, dadosAtualizados);
          res.status(200).send(result);
        } catch (e) {
          res.status(400).send("Erro ao atualizar produto");
        }
      }
      async delete(req, res) {
        try {
          const { id } = req.params;
          const result = await this.service.delete(id);
          res.status(200).send(result);
        } catch (e) {
          res.status(400).send("Erro ao excluir produto");
        }
      }
    };
    module2.exports = ProdutoController2;
  }
});

// src/routes/ProdutoRoute.js
var ProdutoController = require_ProdutoController();
var ProdutoRoute = class {
  constructor(app) {
    this.controller = new ProdutoController();
    this.app = app;
    this.setupRoutes();
  }
  setupRoutes() {
    this.app.get("/produto", this.controller.findAll.bind(this.controller));
    this.app.get("/produto/:id", this.controller.findById.bind(this.controller));
    this.app.post("/produto", this.controller.create.bind(this.controller));
    this.app.put("/produto/:id", this.controller.update.bind(this.controller));
    this.app.delete("/produto/:id", this.controller.delete.bind(this.controller));
  }
};
module.exports = (app) => {
  return new ProdutoRoute(app);
};
