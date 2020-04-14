//set up required package
const axios = require("axios");

//create api object to be exported for use in index.html file
const api = {
  /*this function, when invoked, will take the username from the answered questions, insert it into the URL for the axios call to 
  github's api, and console.log any errors we get back*/
  getUsername(username) {
    return axios.get(`https://api.github.com/users/${username}?client_id=${process.env.CLIENT_ID}&client_secret=${process.env.CLIENT_SECRET}`
    ).catch(err => {
      console.log(err + ". Please enter a valid username.");
      process.exit(1);
    });
  },
  getStarCount(username) {
    return axios.get(`https://api.github.com/users/${username}/repos?client_id=${process.env.CLIENT_ID}&client_secret=${process.env.CLIENT_SECRET}&per_page=100`
    )
      .then(response => {
        return response.data.reduce((accumulator, currentValue) => { //we accumulate the returned values from the callback, and if none, then '0'
          accumulator += currentValue.stargazers_count;
          return accumulator;
        }, 0);
      });
  }
}

//export for use in index.js
module.exports = api;
