//import axios from "./axiosInstance"
const axios = require("./axiosInstance")

let performGetRequest = () => {
  let userArray
  let count = 3
  axios
    .get("/users/matthew-riddle/followers")
    .then(response => {
      userArray = response.data.map(val => val["login"])
      console.log(userArray)
      return userArray
    }) //console.log(response.data))
    .catch(error => console.log(error))
}

module.exports = performGetRequest
