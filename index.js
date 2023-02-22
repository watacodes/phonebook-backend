const express = require('express');
const app = express();
const PORT = 4040;
const bodyParser = require('body-parser');
const morgan = require('morgan');

let data = [
  { 
    "id": 1,
    "name": "Arto Hellas", 
    "number": "040-123456"
  },
  { 
    "id": 2,
    "name": "Ada Lovelace", 
    "number": "39-44-5323523"
  },
  { 
    "id": 3,
    "name": "Dan Abramov", 
    "number": "12-43-234345"
  },
  { 
    "id": 4,
    "name": "Mary Poppendieck", 
    "number": "39-23-6423122"
  }
];



app.use(express.json());
app.use(morgan(':method :url :status :res[content-length] - :response-time ms'))
app.get('/api/people', (req, res) => {
  res.json(data);
});

app.get('/info', (req, res) => {
  const peopleCount = data.length;
  const date = new Date();
  res.send(`Phonebook has info for ${peopleCount} people. <br> ${date}`);
});

app.get('/api/people/:id', (req, res) => {
  const id = +req.params.id;
  const personInfo = data.find(e => e.id === id);
  if (personInfo) {
    res.json(personInfo);
  } else {
    res.status(404).end();
  }
});

app.post('/api/people', (req, res) => {
  // const maxId = data.length > 0 ? Math.max(...data.map(e => e.id)) + 1 : 0;
  const personInfo = req.body;
  personInfo.id = Math.round(Math.random() * 10000);
  if (data.some(e => e.name === personInfo.name)) {
    res.status(400).json({
      error: 'This person has already been registered.'
    })
  } else if (!personInfo || !personInfo.id || !personInfo.name || !personInfo.number) {
    res.status(400).json({
      error: 'Input is invalid.'
    })
  } else {
    data = data.concat(personInfo);
    res.json(personInfo);
  }
});

app.delete('/api/people/:id', (req, res) => {
  const id = +req.params.id;
  data = data.filter(e => e.id !== id);
  res.status(204).end();
});

app.listen(PORT, console.log(`Running server on PORT ${PORT}`));

