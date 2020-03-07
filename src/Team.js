import React from 'react'
import Search from './Search'
import axios from 'axios'

const Team = ({setTeams, teams, team, pokemon}) => {

  const deletePokemon = async(poke, index) => {
    poke.pokemon.splice(index, 1)
    poke.pokemon.map((item, index) => {
      const json = JSON.parse(item)
      json.place = index
      json.id = `${poke.name}-${index}`
      const string = JSON.stringify(json)
      return string
    })
    setTeams(teams.map(team => {
      if(team.id === poke.id) {
        team.pokemon = poke.pokemon
        return team
      } else {
        return team
      }
    }))

    await axios.put(`/api/teams/${poke.id}`, {pokemon: poke.pokemon})
  }

  return (
    <div>
      <h4>Team</h4>
      <Search setTeams={setTeams} teams={teams} team={team} pokemon={pokemon} />
      <ul>
        {
          pokemon.map((pokemon, index) => {
            const poke = JSON.parse(pokemon)
            return(
              <li key={`${team.name}-${index}`}>
                <p>{poke.name} <span>{poke.type}</span> <button onClick={()=>deletePokemon(team, index)}>X</button></p>
              </li>
            )
          })
        }
      </ul>
    </div>
  )
}

export default Team