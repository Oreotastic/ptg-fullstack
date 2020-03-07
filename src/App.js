import React from 'react'
import axios from 'axios'
import Team from './Team'

const { useState, useEffect } = React;

const App = () => {
  const [teams, setTeams] = useState([])

  const [name, setName] = useState('')

  const createTeam = async(name) => {
    try {
      const created = (await axios.post('/api/teams', {name, pokemon: []})).data
      setTeams([...teams, created])
    } catch (error) {
      window.alert(error)
    }
  }

  const deleteTeam = async(id) => {
    try {
      await axios.delete(`/api/teams/${id}`)
      setTeams(teams.filter(team => team.id !== id))
    } catch (error) {
      window.alert(error)
    }
  }

  const onSubmit = (el) => {
    el.preventDefault()
    createTeam(name)
  }

  useEffect(() => {
    Promise.all([
      axios.get('/api/teams'),
    ])
    .then(response => {
      setTeams(response[0].data)
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
            return(
              <li key={team.id}>
                <p>{team.name} <button onClick={(el) => deleteTeam(team.id)}>X</button></p>
                <Team setTeams={setTeams} teams={teams} team={team} pokemon={team.pokemon} />
              </li>
            )
          })
        }
      </ul>
    </div>
  )
}

export default App