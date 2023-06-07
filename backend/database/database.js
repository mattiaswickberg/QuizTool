const mariadb = require('mariadb')

let credentials = require('../config/credentials.json')
let hostName = credentials.hostname
let username = credentials.username
let pw = credentials.password

const pool = mariadb.createPool({
  host: hostName,
  user: username,
  password: pw,
  database: 'quiztool',
  connectionLimit: 5
})

module.exports = pool
