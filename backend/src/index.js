const { response } = require("express");
const express = require("express");
const { uuid, isUuid } = require("uuidv4");
const cors = require("cors");

const app = express();

app.use(cors());
app.use(express.json());

const projects = [];

function logRequest(request, response, next) {
  const { method, url } = request;

  const labelLog = `[${method.toUpperCase()}] ${url}`;

  console.time(labelLog);

  next();

  console.timeEnd(labelLog);
}

function validateId(request, response, next) {
  const { id } = request.params;

  if (!isUuid(id)) {
    return response.status(400).json({ error: "invalid project id" });
  }

  return next();
}

app.use(logRequest);

app.get("/project", (request, response) => {
  const { title } = request.query;

  const result = title
    ? projects.filter((project) => project.title.includes(title))
    : projects;
  return response.json(result);
});

app.post("/project", (request, response) => {
  const { title, owner } = request.body;

  const project = { id: uuid(), title, owner };
  projects.push(project);

  return response.json(project);
});

app.put("/project/:id", validateId, (request, response) => {
  const { id } = request.params;
  const { title, owner } = request.body;

  const projectIndex = projects.findIndex((project) => project.id === id);

  if (projectIndex < 0) {
    return response.status(400).json({ error: "project not found" });
  }

  const project = {
    id,
    title,
    owner,
  };

  projects[projectIndex] = project;

  return response.json(project);
});

app.delete("/project/:id", validateId, (request, response) => {
  const { id } = request.params;

  const projectIndex = projects.findIndex((project) => project.id === id);

  if (projectIndex < 0) {
    return response.status(400).json({ error: "project not found" });
  }

  projects.splice(projectIndex, 1);

  return response.status(204).send();
});

app.listen(3333, () => console.log("sernver on"));
