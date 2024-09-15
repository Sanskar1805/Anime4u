import React, { useState } from 'react';
import axios from 'axios';
import {Link} from 'react-router-dom';
import NavBar from './navbar';

const LoginForm = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [username, setUsername] = useState('');

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post('http://localhost:8000/login', {
        email,
        password
      });

      setUsername(response.data.username);
      // Additional logic or redirect to the profile page
    } catch (error) {
      console.error(error.response.data.message);
    }
  };

  return (
    <div style = {{marginLeft:"40%", marginTop:"12%"}}>
    <NavBar bgCol="bg-warning" textCol = "white" />
    <h2 style = {{fontFamily:"Jost"}}>Login</h2>
    <form onSubmit={handleLogin}>
    <label style = {{fontFamily:"Jost"}}>Email:</label>
      <input
        type="email"
        placeholder="Email"
        class="input-group-text"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <label style = {{fontFamily:"Jost"}}>Password:</label>
      <input
        type="password"
        placeholder="Password"
        class="input-group-text"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <button type="submit" class="btn btn-success" style = {{marginTop:"10px"}}>Login</button>
      <div style = {{marginTop:"1%"}}><a href = {`/?name=${username}`} style={{marginTop:"20px"}}>Go to Home</a>
      {username && <p>Welcome, {username}!</p>}</div>
    </form>
    </div>
  );
};

export default LoginForm;
