const inquirer = require("inquirer");
const fs = require("fs");
const util = require("util");
const generateHTML = require("./generateHTML");
const api = require("./api");
const convertFactory = require("electron-html-to");
const path = require("path");

const questions = [
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
];

function promptUser() {
  inquirer.prompt(questions).then(({ github, color }) => {
    console.log("Searching GitHub...");

    api
      .getUsername(github).then(response =>
        api.getStarCount(github).then(stars => {
          return generateHTML({ stars, color, ...response.data });
        })
      ).then(html => {
        const conversion = convertFactory({
          converterPath: convertFactory.converters.PDF
        });

        conversion({ html }, function (err, result) {
          if (err) {
            return console.log(err);
          }

          result.stream.pipe(fs.createWriteStream(path.join(__dirname, "profile.pdf")));
          conversion.kill();
        });
      });
  });
};

promptUser();