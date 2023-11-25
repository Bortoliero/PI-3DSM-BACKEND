// src/config/prisma.js
var { PrismaClient } = require("@prisma/client");
var prisma = new PrismaClient();
module.exports = prisma;
