const inquirer = require("inquirer");
const fs = require("fs");
const util = require("util");
const generateHTML = require("./generateHTML");

const writeFileAsync = util.promisify(fs.writeFile);


function promptUser() {
  return inquirer.prompt([
    {
      type: "input",
      name: "github",
      message: "What is your GitHub username?"
    },

    {
      type: "list",
      name: "color",
      message: "What is your favorite color?",
      choices: ["red", "blue", "green", "pink"]
    }
  ]);
}



promptUser()
  .then(function (answers) {
    const html = generateHTML(answers);

    return writeFileAsync("index.html", html);
  })
  .then(function () {
    console.log("Successfully wrote to index.html");
  })
  .catch(function (err) {
    console.log(err);
  });
