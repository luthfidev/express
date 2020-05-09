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

/* app.post('/users', (request, response) => {
  const { username } = request.body
  if (username && username !== '') {
    console.log(request.body)
    response.status(201).send({
      msg: `Hello ${request.body.username}! Welcome my backend`
    })
  } else {
    response.status(400).send({
      msg: 'Username must be filled'
    })
  }
}) */

app.listen(APP_PORT, () => {
  console.log(`Express app is listening on ${APP_PORT}`)
})
