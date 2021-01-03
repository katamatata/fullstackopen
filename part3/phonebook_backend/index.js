require('dotenv').config();
const express = require('express');
const app = express();
const Person = require('./models/person');

const morgan = require('morgan');
const cors = require('cors');

app.use(express.static('build'));
app.use(express.json());
app.use(cors());

morgan.token('data', function (req, res) {
  return JSON.stringify(req.body);
});

app.use(
  morgan(':method :url :status :response-time ms - :res[content-length] :data')
);

app.get('/api/persons', (request, response) => {
  Person.find({}).then((persons) => {
    response.json(persons);
  });
});

app.get('/info', (request, response) => {
  Person.find({}).then((persons) => {
    const info = `<p>Phonebook has info for ${
      persons.length
    } contacts</p><p>${new Date()}</p>`;
    response.send(info);
  });
});

app.post('/api/persons', (request, response, next) => {
  const body = request.body;

  if (!body.name) {
    return response.status(400).json({ error: 'Name is required' });
  } else if (!body.number) {
    return response.status(400).json({ error: 'Phone number is required' });
  }

  const person = new Person({
    name: body.name,
    number: body.number,
  });

  person
    .save()
    .then((savedPerson) => {
      response.json(savedPerson);
    })
    .catch((error) => next(error));
});

app.get('/api/persons/:id', (request, response, next) => {
  Person.findById(request.params.id)
    .then((person) => {
      person ? response.json(person) : response.status(404).end();
    })
    .catch((error) => next(error));
});

app.put('/api/persons/:id', (request, response, next) => {
  const body = request.body;

  const person = {
    name: body.name,
    number: body.number,
  };

  Person.findByIdAndUpdate(request.params.id, person, {
    new: true,
    runValidators: true,
    context: 'query',
  })
    .then((updatedPerson) => response.json(updatedPerson))
    .catch((error) => next(error));
});

app.delete('/api/persons/:id', (request, response, next) => {
  Person.findByIdAndRemove(request.params.id)
    .then((result) => response.status(204).end())
    .catch((error) => next(error));
});

const unknownEndpoint = (request, response) => {
  response.status(404).send({ error: 'Unknown endpoint' });
};

app.use(unknownEndpoint);

const errorHandler = (error, request, response, next) => {
  console.error(error.message);

  if (error.name === 'CastError') {
    return response.status(400).send({ error: 'Malformatted id' });
  } else if (error.name === 'ValidationError' && request.method === 'PUT') {
    return response.status(400).send({ error: 'Phone number is not valid' });
  } else if (error.name === 'ValidationError') {
    return response.status(400).send({ error: error.message });
  }

  next(error);
};

app.use(errorHandler);

const PORT = process.env.PORT;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
