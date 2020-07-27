// we are sending information to the local systems
const env = require("./environment");
const fs = require("fs");
const path = require("path");

// calls the express app
module.exports = (app) => {
  app.locals.assetPath = function (filePath) {
    if (env.name == "development") {
      return "/" + filePath;
    }
    // this is the helpers function
    console.log(filePath,  "/" + JSON.parse(fs.readFileSync(path.join(__dirname, "../rev-manifest.json")))[filePath])
    return (
      "/" +
      JSON.parse(fs.readFileSync(path.join(__dirname, "../rev-manifest.json")))[
        filePath
      ]
    );
  };
};
