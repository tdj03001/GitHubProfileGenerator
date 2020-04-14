const inquirer = require("inquirer");
const fs = require("fs");
const util = require("util");



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