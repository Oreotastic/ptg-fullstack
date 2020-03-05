const pg = require('pg')
const {Client} = pg

const client = new Client(process.env.DATABASE_URL || 'https://localhost/poketeam')

client.connect()

const sync = async() => {
  const sql = `
    DROP TABLE IF EXISTS teams;
    CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
    
    CREATE TABLE teams(
      id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
      name VARCHAR,
      pokemon text [] NOT NULL
    );
  `

  await client.query(sql)
}

const getPokemon = async() => {
  const sql = `SELECT * FROM teams`
  const response = await client.query(sql)
  return response.rows
}

const createTeam = async(name, pokemon) => {
  const sql = `INSERT INTO teams(name, pokemon) VALUES($1, $2) returning *`
  const response = await client.query(sql, [name, pokemon])
  return response.rows[0]
} 

module.exports = {
  sync,
  getPokemon,
  createTeam
}