const ClienteController = require('../controllers/ClienteController.js');

class ClienteRoute {
  constructor(app) {
    this.controller = new ClienteController();
    this.app = app;
    this.setupRoutes();
  }

  setupRoutes() {
    this.app.get('/clientes', this.controller.findAll.bind(this.controller));
    this.app.get('/clientes/:id', this.controller.findById.bind(this.controller));
    this.app.post('/clientes', this.controller.create.bind(this.controller));
    this.app.put('/clientes/:id', this.controller.update.bind(this.controller));
    this.app.delete('/clientes/:id', this.controller.delete.bind(this.controller));
  }
}

module.exports = (app) => {
  return new ClienteRoute(app);
};
