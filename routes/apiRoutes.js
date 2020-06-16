fs = require("fs");
const path = require("path");
const OUTPUT_DIR = require("../db/store");
const outputPath = path.join(OUTPUT_DIR(), "db.json");

// ===============================================================================
// LOAD DATA
// We are linking our routes to a series of "data" sources.
// These data sources hold arrays of information on table-data, waitinglist, etc.
// ===============================================================================

var dbJson = require("../db/db.json");

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
    console.log("made it to api get");
    res.json(dbJson);
    // console.log(res.json(dbJson));
  });

  // API POST Requests
  // ---------------------------------------------------------------------------
  app.post("/api/notes", function (req, res) {
    console.log("Made it to post");
    if (dbJson.length > 0) {
      dbJson.push(req.body);
    }

    res.json(dbJson);

    fs.writeFile(outputPath, JSON.stringify(dbJson), function (err) {
      if (err) return console.log(err);
    });
  });

  // API DELETE Requests
  // ---------------------------------------------------------------------------
  app.delete("/api/notes/:id", function (req, res) {
    console.log(
      "XXXXXXXXXXXXXXXXXXXXXMade it to deleteXXXXXXXXXXXXXXXXXXXXXXXXXXX"
    );
    delID = req.params.id;
    console.log("id to delete " + delID);
    // console.log(req.params);
    //console.log("delete reg.body " + reg.body);

    // if (dbJson.length > 0) {
    //   dbJson.push(req.body);
    // }

    res.json(dbJson);

    // fs.writeFile(outputPath, JSON.stringify(dbJson), function (err) {
    //   if (err) return console.log(err);
    // });
  });
};
