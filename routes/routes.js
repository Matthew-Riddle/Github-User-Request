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
      user: "",
      followers: [
        {
          user: "",
          followers: ["", ""]
        }
      ]
    }

    state = { user: "", followers: [] } // Set our state to be empty

    let isUserFound = true

    await getUser(req.params.user) // Await is necessary with asynchronus calls to make them behave more like a synchronized function
      // In this case we need to wait for the promise to be fulfilled so we can use the data retrieved or return if nothing is found
      .then(response => (state.user = response.data.login))
      .catch(error => {
        isUserFound = false
        res.status().send(error.message)
      })

    if (status === false) return

    getFollowers(req.params.user).then(response => {
      extractFollowers(response.data)
        // .slice(0, 5) // Slice out the first 5 followers.Thank god for transducers
        // .map(val => val.login) // Map the sliced out followers login names to a new array that we will return
    })
    .then(async (followers) => {
      followers.length.forEach(follower => {
        let temp = {}
        let ff = await getFollowers(followers[i])
        .then(response => {
          extractFollowers(response.data)
        })

        temp.user = followers[i]
        temp.followers = ff
        state.followers.push(temp)

      });
      res.status().send(state)
    })
    .catch(error => {
      res.status().send(error.message)
    })

    // let respo = axios
    //   .get("/users/matthew-riddle/followers")
    //   .then(response => {
    //     userArray = response.data.map(val => val["login"])
    //     return userArray
    //   }) //console.log(response.data))
    //   .catch(error => console.log(error))

    // respo
    //   .then(response => {
    //     res.status(200).send(response)
    //   })
    //   .catch(error => console.log(error))
  })

  getUser = user => {
    return axios.get(`users/${user}`)
  }

  getFollowers = user => {
    return axios.get(`user/${user}/followers`)
  }

  extractFollowers = (response) => {
    response.slice(0, 5)
    .map(val => val.login)
  }
}

module.exports = appRouter
