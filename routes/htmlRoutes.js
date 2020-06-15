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
  // console.log("in app function");

  app.get("/notes", function (req, res) {
    res.sendFile(path.join(__dirname, "../public/notes.html"));
    console.log("notes.html page launch from htmlRoutes");
  });

  // If no matching route is found default to home
  // app.get("/index", function (req, res) {
  //   res.sendFile(path.join(__dirname, "../public/index.html"));
  //   console.log("index.html page launched from htmlRouts");
  // });
};
