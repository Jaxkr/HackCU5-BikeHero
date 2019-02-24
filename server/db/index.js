const {Pool} = require('pg')

const pool = new Pool({connectionString:"postgresql://35.222.176.122"})

module.exports = {
  query: (text, params) => {
    return pool.query(text, params)
  },
  pool: pool
}