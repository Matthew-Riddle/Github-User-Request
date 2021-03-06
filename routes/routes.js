const faker = require("faker") // Was used for testing initially. Generates random data
const axios = require("../axiosInstance")

var appRouter = app => {
  app.get("/", function(req, res) {
    res.send({
      message:
        "Welcome to my Restful API. You can retrieve five followers of a github user along with five of their followers up to 3 levels deep."
    })
  })

  app.get("/:userId", async (req, res) => {
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

    await getUser(req.params.userId) // Await is necessary with asynchronus calls to make them behave more like a synchronized function
      // In this case we need to wait for the promise to be fulfilled so we can use the data retrieved or return if nothing is found
      .then(response => (state.user = response.data["login"]))
      .catch(error => {
        isUserFound = false
        res.send(error.message)
      })

    if (isUserFound === false) return

    getFollowers(req.params.userId)
      .then(response => {
        return extractFollowers(response.data)
      })
      .then(async followers => {
        // Must be async in order to use 'await'
        for (let i = 0; i < followers.length; i++) {
          let temp = {}
          let ff = await getFollowers(followers[i]).then(response => {
            return extractFollowers(response.data)
          })

          temp.user = followers[i]
          temp.followers = ff
          state.followers.push(temp)
        }

        res.send(state)
        /*Below is for a more readable version of the JSON data*/
        // res.send(
        //   JSON.stringify(state)
        //     .replace(/(\")|(\{)|(\})/gim, "") // Remove all the messy parts of the json data
        //     .replace(/(\,)/gim, ", ")
        //     .replace(/(\[)/gim, "[ ")
        //     .replace(/(\])/gim, " ]")
        // )
      })
      .catch(error => {
        res.send(error.message)
      })

    /*For initial testing purposes*/
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
    return axios.get(`users/${user}/followers`)
  }

  extractFollowers = response => {
    return response
      .slice(0, 5) // Slice out the first 5 followers.Thank god for transducers
      .map(val => val["login"]) // Map the sliced out followers login names to a new array that we will return
  }
}

module.exports = appRouter
