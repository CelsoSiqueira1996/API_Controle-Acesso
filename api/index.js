const express = require('express')
const routes = require('./routes')

const app = express()
const port = 3000

routes(app)
app.use((req, res) => {
    res.status(404).send({message: 'Página não encontrada!'});
});

app.listen(port, () => console.log(`servidor está rodando na porta ${port}`))

module.exports = app