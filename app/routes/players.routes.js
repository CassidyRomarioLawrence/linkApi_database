module.exports = app => {
  const players = require("../controllers/players.controller.js");

  var router = require("express").Router();

  // Create a new Player
  router.post("/", players.create);

  // Retrieve all Players
  router.get("/", players.findAll);

  // Retrieve all ballers
  router.get("/baller", players.findAllPublished);

  // Retrieve a single Player with id
  router.get("/:id", players.findOne);

  // Update a Player with id
  router.put("/:id", players.update);

  // Delete a Player with id
  router.delete("/:id", players.delete);

  // Delete all Players
  router.delete("/", players.deleteAll);

  app.use('/api/players', router);
};