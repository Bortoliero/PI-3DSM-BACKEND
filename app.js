const express = require('express');

const app = express();

require('dotenv').config()

app.use(express.json());

app.listen(3000, () => {
  console.log('Servidor rodando na porta 3000');
});

require('./src/routes')(app)







// const indexRouter = require('./src/routes/index.js');
// const usersRouter = require('./src/routes/users.js');
// const produtoRouter = require('./src/routes/produto.js');

// app.use(logger("dev"));
// app.use(json());
// app.use(urlencoded({ extended: false }));
// app.use(cookieParser());

// app.use("/", indexRouter);
// app.use("/users", usersRouter);
// app.use("/produto", produtoRouter);

