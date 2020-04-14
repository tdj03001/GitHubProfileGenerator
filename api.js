const axios = require("axios");

const api = {
  getUsername(username) {
    return axios.get(`https://api.github.com/users/${username}?client_id=${process.env.CLIENT_ID}&client_secret=${process.env.CLIENT_SECRET}`
    ).catch(err => {
      console.log(err + "Try a different username");
      process.exit(1);
    });
  },
  getStarCount(username) {
    return axios.get(`https://api.github.com/users/${username}/repos?client_id=${process.env.CLIENT_ID}&client_secret=${process.env.CLIENT_SECRET}&per_page=100`
    )
      .then(response => {
        return response.data.reduce((accumulator, currentValue) => {
          accumulator += currentValue.stargazers_count;
          return accumulator;
        }, 0);
      });
  }
}



module.exports = api;
