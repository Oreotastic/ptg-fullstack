import React from 'react'
import axios from 'axios'

const Search = ({setTeams, teams, team, pokemon}) => {
  const api = `https://pokeapi.co/api/v2`
  const {useState} = React
  const [name, setName] = useState('')

  const onSubmit = async(el) => {
    el.preventDefault()
    const data = (await axios.get(`${api}/pokemon/${name.toLowerCase()}`)).data
    const string = JSON.stringify({place: pokemon.length+1, id: `${team.name}-${pokemon.length}`, name: data.name, type: data.types[0].type.name})
    const newMember = [...pokemon, string]
    await axios.put(`/api/teams/${team.id}`, {pokemon: newMember})
    setTeams(teams.map(item => {
      if(item.id === team.id) {
        item.pokemon = newMember
        return item
      } else {
        return item
      }
    }))
  }

  return(
    <div>
      <form onSubmit={onSubmit}>
        <input type="text" value={name} onChange={(el) => setName(el.target.value)}/>
        <button>Add</button>
      </form>
    </div>
  )
}

export default Search