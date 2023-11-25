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

// src/services/ProdutoService.js
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
module.exports = ProdutoService;
