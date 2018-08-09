const faker = require("faker")
const axios = require("../axiosInstance")
const performGetRequest = require("../index")

var appRouter = app => {
  app.get("/", function(req, res) {
    res.status(200).send({ message: "Welcome to our restful API" })
  })

  let data = {
    username: null
  }

  app.get("/user", (req, res) => {
    let userArray = []
    let count = 3
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

  app.get("/users/:num", function(req, res) {
    var users = []
    var num = req.params.num

    if (isFinite(num) && num > 0) {
      for (i = 0; i <= num - 1; i++) {
        users.push({
          firstName: faker.name.firstName(),
          lastName: faker.name.lastName(),
          username: faker.internet.userName(),
          email: faker.internet.email()
        })
      }

      res.status(200).send(users)
    } else {
      res.status(400).send({ message: "invalid number supplied" })
    }
  })
}

module.exports = appRouter
