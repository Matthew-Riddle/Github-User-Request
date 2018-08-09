//import axios from "axios"
const axios = require("axios")

const instance = axios.create({
  baseURL: "https://api.github.com"
})

module.exports = instance
