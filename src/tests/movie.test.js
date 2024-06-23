require('../models')
const request = require("supertest")
const app = require('../app')
const Actor = require('../models/Actor')
const Director = require('../models/Director')
const Genre = require('../models/Genre')


let movieId
let actor
let director
let genre

const BASE_URL = '/api/v1/movies'

const movie = {
  name: "Little Women",
  image: "lorem.png",
  synopsis: "Nulla lobortis eget est at gravida. Curabitur tempus laoreet metus sit amet volutpat.",
  releaseYear: "2018" 
}

afterAll(async () => {
  await actor.destroy()
  await director.destroy()
  await genre.destroy()
})


test("POST -> 'BASE_URL', should return status code 201, and res.body.name === movie.name", async () => {

  const res = await request(app)
    .post(BASE_URL)
    .send(movie)

  movieId = res.body.id

  expect(res.statusCode).toBe(201)
  expect(res.body).toBeDefined()
  expect(res.body.name).toBe(movie.name)
})

test("GET -> 'BASE_URL', should return status code 200, res.body[0].name === movie.name", async () => {
  const res = await request(app)
    .get(BASE_URL)


  expect(res.statusCode).toBe(200)
  expect(res.body).toBeDefined()
  expect(res.body[0].name).toBe(movie.name)
  expect(res.body).toHaveLength(1)

  expect(res.body[0].actors).toBeDefined()
  expect(res.body[0].actors).toHaveLength(0)

  expect(res.body[0].directors).toBeDefined()
  expect(res.body[0].directors).toHaveLength(0)

  expect(res.body[0].genres).toBeDefined()
  expect(res.body[0].genres).toHaveLength(0)
})

test("GET -> 'BASE_URL/movieId', should return statusCode 200, and res.body.name === movie.name", async () => {
  const res = await request(app)
    .get(`${BASE_URL}/${movieId}`)

  expect(res.statusCode).toBe(200)
  expect(res.body).toBeDefined()
  expect(res.body.name).toBe(movie.name)

  expect(res.body.actors).toBeDefined()
  expect(res.body.actors).toHaveLength(0)

  expect(res.body.directors).toBeDefined()
  expect(res.body.directors).toHaveLength(0)

  expect(res.body.genres).toBeDefined()
  expect(res.body.genres).toHaveLength(0)
})

test("PUT -> 'BASE_URL/:id', should return status code 200 and res.body.name === movieUpdate.name", async () => {

  const movieUpdate = {
    name: "Lady Bird"
  }
  const res = await request(app)
    .put(`${BASE_URL}/${movieId}`)
    .send(movieUpdate)

  expect(res.statusCode).toBe(200)
  expect(res.body).toBeDefined()
  expect(res.body.name).toBe(movieUpdate.name)
})


test("POST -> 'BASE_URL/:id/actors', should return statusCode 200, and res.body.length = 1", async () => {

  actor = await Actor.create({
    firstName: "Tom",
    lastName: "Cruise",
    nationality: "american",
    image: "lorem.png",
    birthday: "1970-08-17"
  })

  const res = await request(app)
    .post(`${BASE_URL}/${movieId}/actors`)
    .send([actor.id])

  

  expect(res.statusCode).toBe(200)
  expect(res.body).toBeDefined()
  expect(res.body).toHaveLength(1)

  expect(res.body[0].movieActor.actorId).toBeDefined()
  expect(res.body[0].movieActor.actorId).toBe(actor.id)

  expect(res.body[0].movieActor.movieId).toBeDefined()
  expect(res.body[0].movieActor.movieId).toBe(movieId)

})


test("POST -> 'BASE_URL/:id/directors', should return statusCode 200, and res.body.length = 1", async () => {

  director = await Director.create({
    firstName: "Alfonso",
    lastName: "Cuaron",
    nationality: "mexican",
    image: "lorem.png",
    birthday: "1961-11-28"
  })

  const res = await request(app)
    .post(`${BASE_URL}/${movieId}/directors`)
    .send([director.id])

  

  expect(res.statusCode).toBe(200)
  expect(res.body).toBeDefined()
  expect(res.body).toHaveLength(1)

  expect(res.body[0].movieDirector.directorId).toBeDefined()
  expect(res.body[0].movieDirector.directorId).toBe(director.id)

  expect(res.body[0].movieDirector.movieId).toBeDefined()
  expect(res.body[0].movieDirector.movieId).toBe(movieId)

})

test("POST -> 'BASE_URL/:id/genres', should return statusCode 200, and res.body.length = 1", async () => {

    genre = await Genre.create({
      name: "drama"
    })
  
    const res = await request(app)
      .post(`${BASE_URL}/${movieId}/genres`)
      .send([genre.id])
  
    
  
    expect(res.statusCode).toBe(200)
    expect(res.body).toBeDefined()
    expect(res.body).toHaveLength(1)
  
    expect(res.body[0].movieGenre.genreId).toBeDefined()
    expect(res.body[0].movieGenre.genreId).toBe(genre.id)
  
    expect(res.body[0].movieGenre.movieId).toBeDefined()
    expect(res.body[0].movieGenre.movieId).toBe(movieId)
  
  })
  

test("DELETE -> 'BASE_URL/:id', should return statusCode 204", async () => {
  const res = await request(app)
    .delete(`${BASE_URL}/${movieId}`)

  expect(res.statusCode).toBe(204)

})