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
    <div className="container app">
      <header>
        <h1>Team Generator</h1>
      </header>
      <div className="container main">
        <form onSubmit={onSubmit}>
          <input type="text" value={name} onChange={(el) => setName(el.target.value)} />
          <button>create</button>
        </form>
        <div className="container teamList">
          <ul>
            {
              teams.map(team => {
                return(
                  <li className="teamListItem" key={team.id}>
                    <p className="teamName">{team.name} <button className="delete" onClick={(el) => deleteTeam(team.id)}>X</button></p>
                    <Team setTeams={setTeams} teams={teams} team={team} pokemon={team.pokemon} />
                  </li>
                )
              })
            }
          </ul>
        </div>
      </div>
    </div>
  )
}

export default App