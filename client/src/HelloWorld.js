import React, { useEffect, useState } from 'react';

function Helloworld() {
  const [data, setData] = useState({players: []})
  
  useEffect(() => {
    fetch("http://localhost:8000/api?query={players{first_name}}")
    .then(res => {
      return res.json()
    })
    .then(json => {
      setData(json.data)
    })
    .catch (e =>  console.log(e))
  }, [])

  return (
    <div>
      { data.players.map( player => <p>{player.first_name}</p>) }
    </div>
  );
}

export default Helloworld
