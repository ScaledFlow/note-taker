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
  // Below code handles when a user submits a form and thus submits data to the server.
  // In each of the below cases, when a user submits form data (a JSON object)
  // ...the JSON is pushed to the appropriate JavaScript array
  // (ex. User fills out a reservation request... this data is then sent to the server...
  // Then the server saves the data to the tableData array)
  // ---------------------------------------------------------------------------
  app.post("/api/notes", function (req, res) {
    // Note the code here. Our "server" will respond to requests and let users know if they have a table or not.
    // It will do this by sending out the value "true" have a table
    // req.body is available since we're using the body parsing middleware
    console.log("Made it to post");
    if (dbJson.length > 0) {
      console.log("table length; " + dbJson.length);
      console.log("db title: " + dbJson.title);
      console.log(dbJson[0].title);
      console.log(req.body);
      dbJson.push(req.body);
      console.log(dbJson);
    }

    res.json(dbJson);
    // if (tableData.length < 5) {
    //   tableData.push(req.body);
    //   res.json(true);
    // } else {
    //   waitListData.push(req.body);
    //   res.json(false);
    // }
  });
  // // ---------------------------------------------------------------------------
  // // I added this below code so you could clear out the table while working with the functionality.
  // // Don"t worry about it!
  // app.post("/api/clear", function (req, res) {
  //   // Empty out the arrays of data
  //   tableData.length = 0;
  //   waitListData.length = 0;
  //   res.json({ ok: true });
  // });
};
