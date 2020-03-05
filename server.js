const express = require('express')
const app = express()
const db = require('./db')
const path = require('path')

app.use(express.json())
app.use('/dist', express.static(path.join(__dirname, 'dist')))

app.get('/', (req, res, next) => {
  res.sendFile(path.join(__dirname, 'index.html'))
})

app.get('/api/teams', (req, res, next) => {
  db.getPokemon()
  .then(response => res.send(response))
  .catch(next)
})

app.post('/api/teams', (req, res, next) => {
  db.createTeam(req.body.name, req.body.pokemon)
  .then(response => res.send(response))
  .catch(next)
})

const port = process.env.PORT || 3000

db.sync().then(() => {
  app.listen(port, ()=>{
    console.log(`listening on port ${port}`)
  })
})