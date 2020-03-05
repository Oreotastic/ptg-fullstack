import React from 'react';
import ReactDOM from 'react-dom';

const { useState, useEffect } = React;

const App = () => {
  const [rows, setRows] = useState([])
  const [name, setName] = useState('')

  const createRows = async(name) => {
    try {
      const created = (await axios.post('/api/pokemon', {name})).data
      setRows([...rows, created])
    } catch (error) {
      window.alert(error)
    }
  }

  const onSubmit = (el) => {
    el.preventDefault()
    createRows(name)
  }

  useEffect(() => {
    Promise.all([
      axios.get('/api/pokemon')
    ])
    .then(response => {
      setRows(response[0].data)
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
          rows.map(row => {
            console.log(row)
            return(
              <li key={row.id}>
                <p>{row.name}</p>
              </li>
            )
          })
        }
      </ul>
    </div>
  )
}
const root = document.querySelector('#root');
ReactDOM.render(<App />, root);

