import React from 'react'
import Search from './Search'
import axios from 'axios'
import {v4 as uuidv4} from 'uuid'

const Team = ({setTeams, teams, team, pokemon}) => {

  const deletePokemon = async(poke) => {
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
      <h4>{`Lineup (${team.pokemon.length})`}</h4>
      <Search setTeams={setTeams} teams={teams} team={team} pokemon={pokemon} />
      <div className="container pokemon">
        <ul>
          {
            pokemon.map((pokemon, index) => {
              const poke = JSON.parse(pokemon)
              return(
                <li key={uuidv4()}>
                  <img className="sprite" src={poke.sprite} height="100px"></img>
                  <p>Name: {poke.name}</p> 
                  <p>Type: {poke.type}</p> 
                  <button onClick={()=>deletePokemon(team, index)}>X</button>
                </li>
              )
            })
          }
        </ul>
      </div>
    </div>
  )
}

export default Team