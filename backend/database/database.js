const mariadb = require('mariadb')
require('dotenv').config();

let credentials = require('../config/credentials.json')
let hostName = credentials.hostname
let username = credentials.username
let pw = credentials.password

const pool = mariadb.createPool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DATABASE,
  connectionLimit: 5
})

module.exports = pool
