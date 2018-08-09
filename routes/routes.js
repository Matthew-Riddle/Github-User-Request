const faker = require("faker")
const axios = require("../axiosInstance")
const performGetRequest = require("../index")

var appRouter = app => {
  app.get("/", function(req, res) {
    res.status(200).send({
      message:
        "Welcome to my Restful API. You can retrieve five followers of a github user along with five of their followers up to 3 levels deep."
    })
  })

  app.get("/user", async (req, res) => {
    let state = {
      // State object to model and store our data
      user: "", // Initial user
      followers: [
        {
          // Their followers
          user: "", // Follower
          followers: ["", ""] // Followers of our followers
        }
      ]
    }

    state = { user: "", followers: [] } // Set our state to be empty

    let isUserFound = true

    let respo = axios
      .get("/users/matthew-riddle/followers")
      .then(response => {
        userArray = response.data.map(val => val["login"])
        return userArray
      }) //console.log(response.data))
      .catch(error => console.log(error))

    respo
      .then(response => {
        res.status(200).send(response)
      })
      .catch(error => console.log(error))
  })
}

module.exports = appRouter
