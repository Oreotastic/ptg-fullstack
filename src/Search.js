import React from 'react'
import axios from 'axios'
import {v4 as uuidv4} from 'uuid'

const Search = ({setTeams, teams, team, pokemon}) => {
  const api = `https://pokeapi.co/api/v2`
  const {useState} = React
  const [name, setName] = useState('')
  const [amount, setAmount] = useState('')
  
  const addRandom = async(el) => {
    let arr = []
    let promise = []
    el.preventDefault()
    for(let i = 0; i < amount; i++) {
      if(team.pokemon.length < 6) {
        const randInt = Math.floor(Math.random() * (800 - 1) + 1)
        const link = axios.get(`${api}/pokemon/${randInt}`)
        promise = [...promise, link]
      } else {
        return 'team is full'
      }
    }

    await Promise.all(promise)
    .then(results => {
      for(let i = 0; i < results.length; i++) {
        const data = results[i].data
        const string = JSON.stringify({id: uuidv4(), name: data.name, type: data.types[0].type.name, sprite: data.sprites.front_default})
        arr = [...arr, string]
      }
    })

    setTeams(teams.map((item) => {
      if(item.id === team.id) {
        item.pokemon = item.pokemon.concat(arr)
        arr = item.pokemon
          return item
        } else {
          return item
        }
      }))

      await axios.put(`/api/teams/${team.id}`, {pokemon: arr})
    
  }

  const onSubmit = async(el) => {
    el.preventDefault()
    if(team.pokemon.length < 6) {
      const data = (await axios.get(`${api}/pokemon/${name.toLowerCase()}`)).data
      const string = JSON.stringify({id: uuidv4(), name: data.name, type: data.types[0].type.name, sprite: data.sprites.front_default})
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
    } else {
      return 'team is full'
    }
  }

  return(
    <div>
      <form onSubmit={onSubmit}>
        <input type="text" value={name} onChange={(el) => setName(el.target.value)}/>
        <button>Add</button>
      </form>
      <form onSubmit={addRandom}>
        <input className="random" min="0" max={6-team.pokemon.length} type="number" value={amount} onChange={(el) => setAmount(el.target.value)} />
        <button>Random</button>
      </form>
    </div>
  )
}

export default Search