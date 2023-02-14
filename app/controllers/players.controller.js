const Players = require("../models/players.model.js");

// Create and Save a new Player
exports.create = (req, res) => {
  
};

// Retrieve all Players from the database (with condition).
exports.findAll = (req, res) => {
  
};

// Find a single Player with a id
exports.findOne = (req, res) => {
  
};

// find all ballers
exports.findAllBallers = (req, res) => {
  
};

// Update a Players identified by the id in the request
exports.update = (req, res) => {
  
};

// Delete a Player with the specified id in the request
exports.delete = (req, res) => {
  
};

// Delete all Players from the database.
exports.deleteAll = (req, res) => {
  
};

exports.create = (req, res) => {
  // Validate request
  if (!req.body) {
    res.status(400).send({
      message: "Content can not be empty!"
    });
  }

  // Create a Player
  const players = new Players({
    playerName: req.body.playerName,
    playerPosition: req.body.playerPosition,
    baller: req.body.baller || false
  });

  // Save Player in the database
  Players.create(players, (err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the Player."
      });
    else res.send(data);
  });
};

// Retrieve all Players from the database (with condition).
exports.findAll = (req, res) => {
  const playerName = req.query.playerName;

  Players.getAll(playerName, (err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving players."
      });
    else res.send(data);
  });
};

exports.findAllBallers = (req, res) => {
  Players.getAllBallers((err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving players."
      });
    else res.send(data);
  });
};

exports.findOne = (req, res) => {
  Players.findById(req.params.id, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `Not found Player with id ${req.params.id}.`
        });
      } else {
        res.status(500).send({
          message: "Error retrieving Player with id " + req.params.id
        });
      }
    } else res.send(data);
  });
};

exports.update = (req, res) => {
  // Validate Request
  if (!req.body) {
    res.status(400).send({
      message: "Content can not be empty!"
    });
  }

  console.log(req.body);

  Players.updateById(
    req.params.id,
    new Players(req.body),
    (err, data) => {
      if (err) {
        if (err.kind === "not_found") {
          res.status(404).send({
            message: `Not found Player with id ${req.params.id}.`
          });
        } else {
          res.status(500).send({
            message: "Error updating Player with id " + req.params.id
          });
        }
      } else res.send(data);
    }
  );
};

exports.delete = (req, res) => {
  Players.remove(req.params.id, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `Not found Player with id ${req.params.id}.`
        });
      } else {
        res.status(500).send({
          message: "Could not delete Player with id " + req.params.id
        });
      }
    } else res.send({ message: `Player was deleted successfully!` });
  });
};

exports.deleteAll = (req, res) => {
  Players.removeAll((err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while removing all players."
      });
    else res.send({ message: `All Players were deleted successfully!` });
  });
};