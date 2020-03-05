import React from 'react'

const Team = ({pokemon}) => {
  return (
    <div>
      <h4>Team</h4>
      <ul>
        {
          pokemon.map(poke => {
            const item = JSON.parse(poke)
            return(
              <li key={item.id}>
                <p>{item.name}</p>
                <span>{item.type}</span>
              </li>
            )
          })
        }
      </ul>
    </div>
  )
}

export default Team