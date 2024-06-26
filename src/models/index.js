const Actor = require("./Actor");
const Director = require("./Director");
const Genre = require("./Genre");
const Movie = require("./Movie");

//movieActor
Movie.belongsToMany(Actor, {through: "movieActor"})
Actor.belongsToMany(Movie, {through: "movieActor"})

//movieGenre
Movie.belongsToMany(Genre, {through: "movieGenre"})
Genre.belongsToMany(Movie, {through: "movieGenre"})

//MovieDirector
Movie.belongsToMany(Director, {through: "movieDirector"})
Director.belongsToMany(Movie, {through: "movieDirector"})