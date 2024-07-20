// will be trimmed to:
const app = require('./app')
const config = require('./utils/config')
const logger = require('./utils/logger')

app.listen(config.PORT, () => {
  logger.info(`Server running on port ${config.PORT}`)
})
// -----------------------

const express = require('express')
const morgan = require('morgan')
const app = express()

const Person = require('./models/person')

app.use(express.static('dist'))

// Define a custom token to log POST request data
morgan.token('postData', (req) => {
  if (req.method === 'POST') {
    return JSON.stringify(req.body)
  }
  return ''
})

// Use Morgan middleware with custom format
app.use(morgan(':method :url :status :res[content-length] - :response-time ms :postData'))

app.use(express.json())
app.use(requestLogger)


app.post('/api/persons', (request, response, next) => {
  const body = request.body

  if (!body.name || !body.number) {
    return response.status(400).json({
      error: 'name or number (possibly both) is missing'
    })
  }

  const person = new Person({
    name: body.name,
    number: body.number,
  })

  person.save().then(savedPerson => {
    console.log(`new person ${savedPerson.name} with ${savedPerson.number} added`)
    response.json(savedPerson)
  })
    .catch(error => next(error))

})


app.put('/api/persons/:id', (request, response, next) => {
  const { name, number } = request.body

  Person.findByIdAndUpdate(
    request.params.id,
    { name, number },
    { new: true, runValidators: true, context: 'query' }
  )
    .then(updatedPerson => {
      response.json(updatedPerson)
    })
    .catch(error => next(error))
})

app.use(unknownEndpoint)

app.use(errorHandler)

const PORT = process.env.PORT
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})