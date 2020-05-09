require('dotenv').config()
const { APP_PORT } = process.env

const express = require('express')
const app = express()
const bodyparser = require('body-parser')
app.use(bodyparser.urlencoded({ extended: false }))

app.get('/', (request, response) => {
  const data = {
    name: 'Arkademy',
    class: 'Fazztrack'
  }
  response.send(data)
})

app.get('/', (request, response) => {
  response.send({
    msg: 'Backend is running'
  })
})

const users = require('./src/routes/users')
app.use('/users', users)

app.get('*', (request, response) => {
  response.status('404').send('Page Not Found')
})

app.listen(APP_PORT, () => {
  console.log(`Express app is listening on ${APP_PORT}`)
})
