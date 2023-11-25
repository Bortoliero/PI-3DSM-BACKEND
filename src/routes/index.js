const fs = require('fs')

const routes = async (app) =>{
  const result = fs.readdirSync(__dirname).filter(file => {
    return file.indexOf('.') !== 0 &&
    file !== 'index.js' &&
    file.slice(-3) === '.js'
  }).map((file) => {
    const Route = require(`./${file}`)
    return Route(app)
  })
  await Promise.all(result)
}

module.exports = routes