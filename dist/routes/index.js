var __getOwnPropNames = Object.getOwnPropertyNames;
var __glob = (map) => (path) => {
  var fn = map[path];
  if (fn)
    return fn();
  throw new Error("Module not found in bundle: " + path);
};
var __esm = (fn, res) => function __init() {
  return fn && (res = (0, fn[__getOwnPropNames(fn)[0]])(fn = 0)), res;
};
var __commonJS = (cb, mod) => function __require() {
  return mod || (0, cb[__getOwnPropNames(cb)[0]])((mod = { exports: {} }).exports, mod), mod.exports;
};

// src/config/prisma.js
var require_prisma = __commonJS({
  "src/config/prisma.js"(exports, module2) {
    var { PrismaClient } = require("@prisma/client");
    var prisma = new PrismaClient();
    module2.exports = prisma;
  }
});

// src/services/ClienteService.js
var require_ClienteService = __commonJS({
  "src/services/ClienteService.js"(exports, module2) {
    var prisma = require_prisma();
    var ClienteService = class {
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
    module2.exports = ClienteService;
  }
});

// src/controllers/ClienteController.js
var require_ClienteController = __commonJS({
  "src/controllers/ClienteController.js"(exports, module2) {
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
    module2.exports = ClienteController;
  }
});

// src/routes/ClienteRoute.js
var require_ClienteRoute = __commonJS({
  "src/routes/ClienteRoute.js"(exports, module2) {
    var ClienteController = require_ClienteController();
    var ClienteRoute = class {
      constructor(app) {
        this.controller = new ClienteController();
        this.app = app;
        this.setupRoutes();
      }
      setupRoutes() {
        this.app.get("/clientes", this.controller.findAll.bind(this.controller));
        this.app.get("/clientes/:id", this.controller.findById.bind(this.controller));
        this.app.post("/clientes", this.controller.create.bind(this.controller));
        this.app.put("/clientes/:id", this.controller.update.bind(this.controller));
        this.app.delete("/clientes/:id", this.controller.delete.bind(this.controller));
      }
    };
    module2.exports = (app) => {
      return new ClienteRoute(app);
    };
  }
});

// src/services/ProdutoService.js
var require_ProdutoService = __commonJS({
  "src/services/ProdutoService.js"(exports, module2) {
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
  "src/controllers/ProdutoController.js"(exports, module2) {
    var prisma = require_prisma();
    var ProdutoService = require_ProdutoService();
    var ProdutoController = class {
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
    module2.exports = ProdutoController;
  }
});

// src/routes/ProdutoRoute.js
var require_ProdutoRoute = __commonJS({
  "src/routes/ProdutoRoute.js"(exports, module2) {
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
    module2.exports = (app) => {
      return new ProdutoRoute(app);
    };
  }
});

// src/services/VendaService.js
var require_VendaService = __commonJS({
  "src/services/VendaService.js"(exports, module2) {
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
  "src/controllers/VendaController.js"(exports, module2) {
    var prisma = require_prisma();
    var VendaService = require_VendaService();
    var VendaController = class {
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
    module2.exports = VendaController;
  }
});

// src/routes/VendaRoute.js
var require_VendaRoute = __commonJS({
  "src/routes/VendaRoute.js"(exports, module2) {
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
    module2.exports = (app) => {
      return new VendaRoute(app);
    };
  }
});

// require("./**/*") in src/routes/index.js
var globRequire;
var init_ = __esm({
  'require("./**/*") in src/routes/index.js'() {
    globRequire = __glob({
      "./ClienteRoute.js": () => require_ClienteRoute(),
      "./ProdutoRoute.js": () => require_ProdutoRoute(),
      "./VendaRoute.js": () => require_VendaRoute(),
      "./index.js": () => require_routes()
    });
  }
});

// src/routes/index.js
var require_routes = __commonJS({
  "src/routes/index.js"(exports, module2) {
    init_();
    var fs = require("fs");
    var routes = async (app) => {
      const result = fs.readdirSync(__dirname).filter((file) => {
        return file.indexOf(".") !== 0 && file !== "index.js" && file.slice(-3) === ".js";
      }).map((file) => {
        const Route = globRequire(`./${file}`);
        return Route(app);
      });
      await Promise.all(result);
    };
    module2.exports = routes;
  }
});
module.exports = require_routes();
