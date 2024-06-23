require('../models')
const request = require('supertest')
const app = require('../app')

let actorId
const BASE_URL = '/api/v1/actors'

const actor = {
  firstName: "Emma",
  lastName: "Watson",
  nationality: "british",
  image: "lorem.png",
  birthday: "1990-04-15"
}

test("POST -> 'BASE_URL', should return statusCode 201, and res.body.firstName === actor.firstName", async () => {
  const res = await request(app)
    .post(BASE_URL)
    .send(actor)

  actorId = res.body.id

  expect(res.statusCode).toBe(201)
  expect(res.body).toBeDefined()
  expect(res.body.firstName).toBe(actor.firstName)
})


test("GET -> 'BASE_URL' should return res status code 200 , res.body[0].firstName === actor.firstName and res.body.length = 1", async () => {

  const res = await request(app)
    .get(BASE_URL)

  expect(res.statusCode).toBe(200)
  expect(res.body).toBeDefined()
  expect(res.body).toHaveLength(1)
  expect(res.body[0].firstName).toBe(actor.firstName)
})

test("GET -> 'BASE_URL/:id', should return status code 200, return res.body.firstName === actor.firstName ", async () => {
  const res = await request(app)
    .get(`${BASE_URL}/${actorId}`)

  expect(res.statusCode).toBe(200)
  expect(res.body).toBeDefined()
  expect(res.body.firstName).toBe(actor.firstName)
}) 

test("PUT -> 'BASE_URL/:id', should return status code 200, and res.body.firstName === actorUpdate.firstName, ", async () => {

  const actorUpdate = {
    firstName: "Emily"
  }

  const res = await request(app)
    .put(`${BASE_URL}/${actorId}`)
    .send(actorUpdate)

  expect(res.status).toBe(200)
  expect(res.body).toBeDefined()
  expect(res.body.firstName).toBe(actorUpdate.firstName)
}) 

test("DELETE -> 'BASE_URL/:id', should return statusCode 204", async () => {
  const res = await request(app)
    .delete(`${BASE_URL}/${actorId}`)

  expect(res.status).toBe(204)
}) 