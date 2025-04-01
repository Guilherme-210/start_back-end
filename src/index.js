const express = require("express")

const app = express()

app.use(express.json())

app.get("/projects", (request, response) => {
  const { title, owner } = request.query

  console.log(title)
  console.log(owner)

  return response.json(["projeto 1", "projeto 2"])
})

app.post("/projects", (request, response) => {
  const body = request.body
  
  console.log(body)

  return response.json(["projeto 1", "projeto 2", "projeto 3"])
})

app.put("/projects/:id", (request, response) => {
  // const params = request.params
  // console.log(params)
  // { id: '1' }

  const { id } = request.params
  console.log(id)
  // 1

  return response.json(["projeto 1", "projeto 2", "projeto 3", "projeto 4"])
})

app.patch("/projects/:id", (request, response) => {
  return response.json(["projeto 1", "projeto 2", "projeto 6", "projeto 4"])
})

app.delete("/projects/:id", (request, response) => {
  return response.json(["projeto 2", "projeto 3", "projeto 4"])
})

app.listen(3333, () => {
  console.log("back-end started! 🚀")
})
