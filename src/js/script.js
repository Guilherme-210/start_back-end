const express = require("express")
const { uuid, isUuid } = require("uuidv4")

const app = express()

app.use(express.json())

const projects = []

function logRequests(request, response, next) {
  const { method, url } = request

  const logLabel = `[${method.toUpperCase()}] ${url}`

  console.log(logLabel)

  console.time("logLabel")

  next()

  console.timeEnd("logLabel")
}

function validateProjectID(request, response, next) {
  const { id } = request.params
  console.log("1")

  if (!isUuid(id)) {
    return response.status(400).json({ error: "Invalid project ID." })
  }

  return next()
}

app.use(logRequests)

app.get("/projects", (request, response) => {
  const { title } = request.query

  const results = title
    ? projects.filter((project) => project.title.includes(title))
    : projects

  return response.json(results)
})

app.post("/projects", (request, response) => {
  const body = request.body
  const { title, owner } = request.body

  console.log(body)

  const project = { id: uuid(), title, owner }
  projects.push(project)

  return response.json(project)
})

app.put("/projects/:id", validateProjectID, (request, response) => {
  const { id } = request.params
  const { title, owner } = request.body

  const projectIndex = projects.findIndex((project) => project.id === id)

  if (projectIndex < 0) {
    return response.status(400).json({ error: "project not found." })
  }

  const project = {
    id,
    title,
    owner,
  }

  projects[projectIndex] = project

  return response.json(project)
})

app.delete("/projects/:id", validateProjectID, (request, response) => {
  const { id } = request.params

  const projectIndex = projects.findIndex((project) => project.id === id)

  if (projectIndex < 0) {
    return response.status(400).json({ error: "project not found." })
  }

  projects.splice(projectIndex, 1)

  return response.status(204).send()
})

app.listen(3333, () => {
  console.log("back-end started! 🚀")
})
