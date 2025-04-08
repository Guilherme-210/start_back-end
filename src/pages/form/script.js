const express = require("express")
const { uuid, isUuid } = require("uuidv4")

const app = express()

app.use(express.json())

const users = []

function logRequests(request, response, next) {
  const { method, url } = request

  const logLabel = `[${method.toUpperCase()}] ${url}`

  console.log(logLabel)

  console.time("logLabel")

  next()

  console.timeEnd("logLabel")
}

app.use(logRequests)

app.get("/form", (request, response) => {
  const { firstName } = request.query

  const results = firstName
    ? users.filter((user) => user.firstName.includes(firstName))
    : users

  return response.json(results)
})

app.post("/form", (request, response) => {
  const body = request.body
  const {
    firstName,
    lastName,
    CPF_CNPJ,
    countryCode,
    cellphone,
    email,
    birthDate,
    gender,
    country,
    state,
    city,
    CEP,
    district,
    address,
    addressNumber,
    Complement,
    senha,
    confirmSenha,
  } = request.body

  console.log(body)

  const user = {
    id: uuid(),
    firstName,
    lastName,
    CPF_CNPJ,
    countryCode,
    cellphone,
    email,
    birthDate,
    gender,
    country,
    state,
    city,
    CEP,
    district,
    address,
    addressNumber,
    Complement,
    senha,
    confirmSenha,
  }
  users.push(user)

  return response.json(user)
})

app.listen(3334, () => {
  console.log("back-end form started! 🚀")
})