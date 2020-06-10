const express = require("express");
const app = express();
const morgan = require("morgan");
const cors = require("cors");
app.use(express.static("build"));
app.use(cors());
app.use(express.json());

require("dotenv").config();
const Person = require("./modules/person");

// morgan
morgan.token("contact-data", (request, response) => {
  return JSON.stringify(request.body);
});
app.use(morgan(`:method :url :status - :response-time ms :contact-data`));
// custom middlewares
const requestLogger = (request, response, next) => {
  console.log("Method:", request.method);
  console.log("Path:", request.path);
  console.log("Body:", request.body);
  console.log("----");
  next();
};
app.use(requestLogger);

const unknownEndpoint = (request, response) => {
  response.status(404).send({ error: "unknown endpoint" });
};
//
app.get("/api/persons", (request, response) => {
  Person.find({}).then((returnedPersons) => response.json(returnedPersons));
});

app.get("/info", (request, response) => {
  const time = new Date();
  Person.find({})
    .then((persons) => {
      response.send(`
        <p>Phonebook has info for ${persons.length} people</p>
        <p>${time}</p>`);
    })
    .catch((error) => next(error));
});

app.get("/api/persons/:id", (request, response, next) => {
  Person.findById(request.params.id)
    .then((person) => {
      if (person) {
        response.json(person);
      } else {
        response.status(404).end();
      }
    })
    .catch((error) => {
      next(error);
    });
});
//
app.delete("/api/persons/:id", (request, response, next) => {
  Person.findByIdAndDelete(request.params.id)
    .then(response.status(204).end())
    .catch((error) => next(error));
});
//
const generateId = () => {
  return Math.floor(Math.random() * 99999999);
};

app.post("/api/persons", (request, response) => {
  const body = request.body;

  if (!body.name || !body.number) {
    return response.status(400).json({
      error: "name or number is missing from request",
    });
  }
  const person = new Person({
    name: body.name,
    number: body.number,
    id: generateId(),
  });

  person.save().then((person) => response.json(person));
});
app.put("/api/persons/:id", (request, response, next) => {
  const body = request.body;
  const person = {
    name: body.name,
    number: body.number,
  };
  Person.findByIdAndUpdate(request.params.id, person, { new: true })
    .then((updatedPerson) => {
      response.json(updatedPerson);
    })
    .catch((error) => next(error));
});
const errorHandler = (error, request, response, next) => {
  console.error(error.message);
  if (error.name === "CastError") {
    return response.status(400).send({ error: "malformatted id" });
  }
  next(error);
};
app.use(unknownEndpoint);
app.use(errorHandler);

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
