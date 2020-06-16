fs = require("fs");
const path = require("path");
const OUTPUT_DIR = require("../db/store");
const outputPath = path.join(OUTPUT_DIR(), "db.json");

// ===============================================================================
// LOAD DATA
// We are linking our routes to a series of "data" sources.
// These data sources hold arrays of information on table-data, waitinglist, etc.
// ===============================================================================
var dbJson = [];
dbJson = require("../db/db.json");

// console.log("dbJson: " + dbJson);

// ===============================================================================
// ROUTING
// ===============================================================================

module.exports = function (app) {
  // API GET Requests
  // Below code handles when users "visit" a page.
  // In each of the below cases when a user visits a link
  // (ex: localhost:PORT/api/admin... they are shown a JSON of the data in the table)
  // ---------------------------------------------------------------------------

  app.get("/api/notes", function (req, res) {
    res.json(dbJson);
  });

  // API POST Requests
  // ---------------------------------------------------------------------------
  app.post("/api/notes", function (req, res) {
    if (dbJson.length > 0) {
      dbJson.push(req.body);
    }

    // Set post response
    res.json(dbJson);

    fs.writeFile(outputPath, JSON.stringify(dbJson), function (err) {
      if (err) return console.log(err);
    });
  });

  // API DELETE Requests
  // ---------------------------------------------------------------------------
  app.delete("/api/notes/:id", function (req, res) {
    delID = req.params.id;

    //Set delete response
    res.json(false);

    let filterNote = [];

    for (let i = 0; i < dbJson.length; i++) {
      if (dbJson[i].id != delID) {
        filterNote.push(dbJson[i]);
      }
    }

    // Set dbJson array to new filterNote array that removed the deleted item
    dbJson = filterNote;

    fs.writeFile(outputPath, JSON.stringify(filterNote), function (err) {
      if (err) return console.log(err);
    });
  });
};
