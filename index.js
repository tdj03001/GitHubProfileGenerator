//set up required packages and directory files
const inquirer = require("inquirer");
const fs = require("fs");
const util = require("util");
const generateHTML = require("./generateHTML");
const api = require("./api");
const convertFactory = require("electron-html-to");
const path = require("path");

//declared question as a variable in order to destructure them later on when inquirer.prompt runs
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

//prompt user with 2 questions and use the responses to gather data from github profile
function promptUser() {
  inquirer.prompt(questions).then(({ github, color }) => { //github and color are destructured here from the 'questions' variable
    console.log("Searching GitHub...");

    //using the api.js file, we make the axios call to github's api and provide our github username from the previously answered questions
    api
      .getUsername(github).then(response =>
        api.getStarCount(github).then(stars => {
          return generateHTML({ stars, color, ...response.data }); //this line genereates the HTML and populates it with data for stars, color, and (spread operator) the rest of the data in the response.
        })
      ).then(html => {  //here we say 'html' is referring to the generated HTML file above and we set up the convert method from electron
        const conversion = convertFactory({
          converterPath: convertFactory.converters.PDF
        });

        /*'html' below is destructured from the generated HTML above so it can be passed into the conversion function's 
        first argument as a file so the app knows which file it is supposed to convert. This is where the conversion happens*/
        conversion({ html }, function (err, result) {
          if (err) {
            return console.log(err);
          }

          //this line of code 'streams' the data to the output file, profile.pdf
          result.stream.pipe(fs.createWriteStream(path.join(__dirname, "profile.pdf")));
          conversion.kill(); //kill the process
        });
      });
  });
};

promptUser();