const express = require('express');
const app = express();
const morgan = require('morgan');
const cors = require('cors');

app.use(express.json());
app.use(express.static('build'));
app.use(cors());

morgan.token('data', function (req, res) {
  return JSON.stringify(req.body);
});

app.use(
  morgan(':method :url :status :response-time ms - :res[content-length] :data')
);

let persons = [
  {
    name: 'Arto Hellas',
    number: '040-123456',
    id: 1,
  },
  {
    name: 'Ada Lovelace',
    number: '39-44-5323523',
    id: 2,
  },
  {
    name: 'Dan Abramov',
    number: '12-43-234345',
    id: 3,
  },
  {
    name: 'Mary Poppendieck',
    number: '39-23-6423122',
    id: 4,
  },
];

app.get('/api/persons', (request, response) => {
  response.json(persons);
});

app.get('/info', (request, response) => {
  const info = `<p>Phonebook has info for ${
    persons.length
  } contacts</p><p>${new Date()}</p>`;
  response.send(info);
});

const generateRandomId = () => {
  return Math.floor(Math.random() * 100000) + 1;
};

app.post('/api/persons', (request, response) => {
  const body = request.body;
  const nameExists = persons.find((person) => person.name === body.name);

  if (!body.name) {
    return response.status(400).json({ error: 'Name is missing' });
  } else if (!body.number) {
    return response.status(400).json({ error: 'Number is missing' });
  } else if (nameExists) {
    return response.status(400).json({ error: 'Name must be unique' });
  }

  const person = {
    name: body.name,
    number: body.number,
    id: generateRandomId(),
  };
  persons = persons.concat(person);
  response.json(person);
});

app.get('/api/persons/:id', (request, response) => {
  const id = Number(request.params.id);
  const person = persons.find((person) => person.id === id);
  person ? response.json(person) : response.status(404).end();
});

app.delete('/api/persons/:id', (request, response) => {
  const id = Number(request.params.id);
  person = persons.filter((person) => person.id === id);
  response.status(204).end();
});

const unknownEndpoint = (request, response) => {
  response.status(404).send({ error: 'Unknown endpoint' });
};

app.use(unknownEndpoint);

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
