import React, { useEffect, useState } from 'react';
import logo from './logo.svg';
import './App.css';
import { Link, Route, Switch } from 'react-router-dom';
import Helloworld from './HelloWorld'


 function Home () {
  const [message, setMessage] = useState('Loading')

  useEffect(() => {
    fetch('http://localhost:8000/home')
      .then(res => res.text())
      .then(res => setMessage(res))
      .catch(err => console.log(err))
  }, [message])

  return (
      <div>
        <h1>Home</h1>
        <p>{message}</p>
      </div>
  )
 } 

 function Secret () {
  const [message, setMessage] = useState('Loading')

  useEffect(() => {
    fetch('http://localhost:8000/secret')
      .then(res => res.text())
      .then(res => setMessage(res));
  }, [message])

  return (
      <div>
        <h1>Secret</h1>
        <p>{message}</p>
      </div>
  )
 } 

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <Helloworld />
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
      <div>
      <ul>
          <li><Link to="/">Home</Link></li>
          <li><Link to="/secret">Secret</Link></li>
          {/* <li><Link to="/login">Login</Link></li> */}
        </ul>

        <Switch>
          <Route path="/" exact component={Home} />
          <Route path="/secret" exact component={Secret} />
          {/* <Route path="/secret" component={withAuth(Secret)} /> */}
          {/* <Route path="/login" component={Login} /> */}
        </Switch>
      </div>
    </div>
  );
}

export default App;
