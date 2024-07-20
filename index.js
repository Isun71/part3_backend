require('dotenv').config()
const express = require('express');
const morgan = require('morgan');
const app = express();

const Person = require('./models/phone')

let persons = [];

app.use(express.static('dist'))

// Middleware for logging requests
const requestLogger = (request, response, next) => {
  console.log('Method:', request.method);
  console.log('Path:  ', request.path);
  console.log('Body:  ', request.body);
  console.log('---');
  next();
};

// Define a custom token to log POST request data
morgan.token('postData', (req) => {
  if (req.method === 'POST') {
    return JSON.stringify(req.body);
  }
  return '';
});

// Use Morgan middleware with custom format
app.use(morgan(':method :url :status :res[content-length] - :response-time ms :postData'));

app.use(express.json());
app.use(requestLogger);

const unknownEndpoint = (request, response) => {
  response.status(404).send({ error: 'unknown endpoint' });
};

app.get('/', (request, response) => {
  response.send('<h1>Hello World!</h1>');
});

app.get('/info', (request, response) => {
  const currentTime = new Date();
  const numOfPeople = Person.length;

  const responseText = `
    <p>Phonebook has info for ${numOfPeople} people</p>
    <p>${currentTime}</p>
  `;

  response.send(responseText);
});

app.get('/api/persons', (request, response) => {
  Person.find({}).then(people => {
    response.json(people);
  })
});

app.post('/api/persons', (request, response, next) => {
  const body = request.body;

  if (!body.name || !body.number) {
    return response.status(400).json({ 
      error: 'name or number (possibly both) is missing' 
    });
  } 

  // * Old version for checking the name is unique:
  // if (persons.map(person => person.name).includes(body.name)) {
  //   return response.status(400).json({ 
  //     error: 'name must be unique' 
  //   });
  // }

  const person = new Person({
    name: body.name,
    number: body.number,
  })

  person.save().then(savedPerson => {
    console.log(`new person ${savedPerson.name} with ${savedPerson.number} added`);
    response.json(savedPerson)
  })
  .catch(error => next(error))

});

app.get('/api/persons/:id', (request, response, next) => {
  //* Old version for patching single data:
  // const id = Number(request.params.id);
  // const person = persons.find(person => person.id === id);
  // if (person) {
  //   response.json(person);
  // } else {
  //   response.status(404).end();
  // }
  Person.findById(request.params.id)
  .then(person => {
    if (person) {
      response.json(person)  
    } else {
      response.status(404).end()
    }
  })
  .catch(error => next(error))
});

app.delete('/api/persons/:id', (request, response, next) => {
  //* Old delete method. New version will be implemented later.
  // const id = Number(request.params.id);
  // persons = persons.filter(person => person.id !== id);
  // response.status(204).end();
  Person.findByIdAndDelete(request.params.id)
    .then(result => {
      response.status(204).end()
    })
    .catch(error => next(error))
});

app.put('/api/persons/:id', (request, response, next) => {
  const {name, number} = request.body

  Person.findByIdAndUpdate(
    request.params.id, 
    {name, number}, 
    { new: true, runValidators: true, context: 'query' }
  )
    .then(updatedPerson => {
      response.json(updatedPerson)
    })
    .catch(error => next(error))
})

app.use(unknownEndpoint);

const errorHandler = (error, request, response, next) => {
  console.error(error.message)

  if (error.name === 'CastError') {
    return response.status(400).send({ error: 'malformatted id' })
  } else if (error.name === 'ValidationError') {
    return response.status(400).json({ error: error.message })
  }

  next(error)
}

app.use(errorHandler)

const PORT = process.env.PORT
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});