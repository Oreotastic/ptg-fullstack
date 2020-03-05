const pg = require('pg')
const {Client} = pg

const client = new Client(process.env.DATABASE_URL || 'https://localhost/poketeam')

client.connect()

const sync = async() => {
  const sql = `
    DROP TABLE IF EXISTS pokemon;
    CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
    
    CREATE TABLE pokemon(
      id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
      name VARCHAR
    );
  `

  await client.query(sql)
}

const getPokemon = async() => {
  const sql = `SELECT * FROM pokemon`
  const response = await client.query(sql)
  return response.rows
}

const createRow = async(name) => {
  const sql = `INSERT INTO pokemon(name) VALUES($1) returning *`
  const response = await client.query(sql, [name])
  return response.rows[0]
} 

module.exports = {
  sync,
  getPokemon,
  createRow
}