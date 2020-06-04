const express = require("express");
const app = express();
const morgan = require("morgan");
const cors = require("cors");
let persons = [
  {
    name: "Arto Hellas",
    number: "040-123456",
    id: 1,
  },
  {
    name: "Ada Lovelace",
    number: "39-44-5323523",
    id: 2,
  },
  {
    name: "Dan Abramov",
    number: "12-43-234345",
    id: 3,
  },
  {
    name: "Mary Poppendieck",
    number: "39-23-6423122",
    id: 4,
  },
  {
    name: "Amerigo Vespucci",
    number: "24-04-1505",
    id: 5,
  },
];
app.use(express.static("build"));
app.use(cors());
app.use(express.json());
morgan.token("contact-data", (request, response) => {
  return JSON.stringify(request.body);
});
app.use(morgan(`:method :url :status - :response-time ms :contact-data`));
//
const requestLogger = (request, response, next) => {
  console.log("Method:", request.method);
  console.log("Path:", request.path);
  console.log("Body:", request.body);
  console.log("----");
  next();
};
app.use(requestLogger);
//
app.get("/api/persons", (request, response) => {
  response.json(persons);
});

app.get("/info", (request, response) => {
  const time = new Date();
  response.send(`
  <p>Phonebook has info for ${persons.length} people</p>
  <p>${time}</p>`);
});

app.get("/api/persons/:id", (request, response) => {
  const id = Number(request.params.id);
  const person = persons.find((person) => id === person.id);
  if (!person) {
    response.status(404).end();
  }
  response.json(person);
});
//
app.delete("/api/persons/:id", (request, response) => {
  const id = Number(request.params.id);
  persons = persons.filter((person) => id !== person.id);
  response.status(204).end();
});
//
const generateId = () => {
  return Math.floor(Math.random() * 99999999);
};
//
app.post("/api/persons", (request, response) => {
  const body = request.body;
  for (let person of persons) {
    if (body.name === person.name) {
      return response.status(400).json({
        error: "name already exists on server",
      });
    }
    if (!body.name || !body.number) {
      return response.status(400).json({
        error: "name or number is missing from request",
      });
    }
  }
  const person = {
    name: body.name,
    number: body.number,
    id: generateId(),
  };

  persons = persons.concat(person);
  response.send(persons);
});
//
const unknownEndpoint = (request, response) => {
  response.status(404).send({ error: "unknown endpoint" });
};

app.use(unknownEndpoint);
//
const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
