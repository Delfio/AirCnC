import React, { useState } from 'react';
import api from './services/api';
import './App.css';


import logo from './assets/logo.svg'

function App() {
  const [ email, setEmail ] = useState('');

  //Enviar para o servidor
  async function handleSubmit(event){
    event.preventDefault();
    
    const response = await api.post('/sessions', {email: email})

    console.log(response);
  }

  return (
    <div className="container">
      <img src={logo} alt="logo"/>
      <div className="content">
        <p>
          Ofereça <strong>spots</strong> para programadores e encontre <strong>talentos</strong> para sua empresa
        </p>

        <form onSubmit={handleSubmit}>
          <label htmlFor="email">E-mail *</label>
          <input 
          type="email"
          placeholder="Seu melhor e-mail"
          id="email"
          value={email}
          onChange={event => setEmail(event.target.value)}
          />
          <button className="btn" type="submit">Entrar</button>
        </form>
      </div>
    </div>
  );
}

export default App;
