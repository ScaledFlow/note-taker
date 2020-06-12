// ===============================================================================
// DEPENDENCIES
// We need to include the path package to get the correct file path for our html
// ===============================================================================
var path = require("path");

// ===============================================================================
// ROUTING
// ===============================================================================

module.exports = function (app) {
  // HTML GET Requests
  // Below code handles when users "visit" a page.
  // In each of the below cases the user is shown an HTML page of content
  // ---------------------------------------------------------------------------
  console.log("in app function");

  app.get("/notes", function (req, res) {
    res.sendFile(path.join(__dirname, "../public/notes.html"));
    console.log("notes page launch");
  });

  // If no matching route is found default to home
  app.get("*", function (req, res) {
    res.sendFile(path.join(__dirname, "../public/index.html"));
    console.log("home 'index' page launched");
  });
};
