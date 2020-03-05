import React from 'react'
import axios from 'axios'
import Team from './Team'

const { useState, useEffect } = React;

const api = `https://pokeapi.co/api/v2`

const App = () => {
  const [teams, setTeams] = useState([])
  const [pokemon, setPokemon] = useState([])

  const [name, setName] = useState('')

  const createTeam = async(name, pokemon) => {
    console.log(pokemon)
    try {
      const created = (await axios.post('/api/teams', {name, pokemon: [pokemon]})).data
      setTeams([...teams, created])
    } catch (error) {
      window.alert(error)
    }
  }

  const onSubmit = (el) => {
    pokemon
    el.preventDefault()
    createTeam(name, pokemon)
  }

  useEffect(() => {
    Promise.all([
      axios.get('/api/teams'),
      axios.get(`${api}/pokemon/ditto/`)
    ])
    .then(response => {
      setTeams(response[0].data)
      const poke = response[1].data
      setPokemon({place: 1, id: poke.id, name: poke.name, type: poke.types[0].type.name})
    })
  }, [])


  return(
    <div>
      <h1>Hello World</h1>
      <form onSubmit={onSubmit}>
        <input type="text" value={name} onChange={(el) => setName(el.target.value)} />
        <button>create</button>
      </form>
      <ul>
        {
          teams.map(team => {
            console.log(team)
            return(
              <li key={team.id}>
                <p>{team.name}</p>
                <Team pokemon={team.pokemon} />
              </li>
            )
          })
        }
      </ul>
    </div>
  )
}

export default App