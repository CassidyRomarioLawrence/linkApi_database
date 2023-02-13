const sql = require("./db.js");

// constructor
const Players = function (players) {
    this.playerName = players.playerName;
    this.playerPosition = players.playerPosition;
    this.baller = players.baller;
};

Players.create = (newPlayers, result) => {
    sql.query("INSERT INTO players SET ?", newPlayers, (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(err, null);
            return;
        }

        console.log("created players: ", { id: res.insertId, ...newPlayers });
        result(null, { id: res.insertId, ...newPlayers });
    });
};

Players.findById = (id, result) => {
  sql.query(`SELECT * FROM players WHERE id = ${id}`, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    if (res.length) {
      console.log("found player: ", res[0]);
      result(null, res[0]);
      return;
    }

    // not found Player with the id
    result({ kind: "not_found" }, null);
  });
};

Players.getAll = (playerName, result) => {
  let query = "SELECT * FROM players";

  if (playerName) {
    query += ` WHERE title LIKE '%${playerName}%'`;
  }

  sql.query(query, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    console.log("players: ", res);
    result(null, res);
  });
};

Players.getAllPublished = result => {
  sql.query("SELECT * FROM players WHERE published=true", (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    console.log("players: ", res);
    result(null, res);
  });
};

Players.updateById = (id, players, result) => {
  sql.query(
    "UPDATE players SET playerName = ?, playerPosition = ?, baller = ? WHERE id = ?",
    [players.playerName, players.playerPosition, players.baller, id],
    (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(null, err);
        return;
      }

      if (res.affectedRows == 0) {
        // not found Tutorial with the id
        result({ kind: "not_found" }, null);
        return;
      }

      console.log("updated player: ", { id: id, ...players });
      result(null, { id: id, ...players });
    }
  );
};

Players.remove = (id, result) => {
  sql.query("DELETE FROM players WHERE id = ?", id, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    if (res.affectedRows == 0) {
      // not found Tutorial with the id
      result({ kind: "not_found" }, null);
      return;
    }

    console.log("deleted player with id: ", id);
    result(null, res);
  });
};

Players.removeAll = result => {
  sql.query("DELETE FROM players", (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    console.log(`deleted ${res.affectedRows} `);
    result(null, res);
  });
};

module.exports = Players;