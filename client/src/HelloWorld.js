import React, { useEffect } from 'react';

function Helloworld() {
  
  useEffect(() => {
    fetch("http://localhost:8000/status")
    .then(res => console.log(res))
    .catch (e =>  console.log(e))
  })

  return (
    <div>
      <p>You clicked times</p>
      <button >
        Click me
      </button>
    </div>
  );
}

export default Helloworld
