const prisma = require('../config/prisma.js')

class ProdutoService{
    constructor(modelName, prismaInstance){
        this.modelName = modelName;
        this.prisma = prisma;
    }

    async findAll(req){
        console.log("service")
        return await this.prisma[this.modelName].findMany()
        
    }

    async findById(id) {
        return await this.prisma[this.modelName].findUnique({
            where: { id },
        });
    }

    async create(data) {
        console.log("service")
        return await this.prisma[this.modelName].create({
            data,
        });
    }

    async update(id, data) {
        return await this.prisma[this.modelName].update({
            where: { id },
            data,
        });
    }

    async delete(id) {
        return await this.prisma[this.modelName].delete({
            where: { id },
        });
    }
}


module.exports = ProdutoService