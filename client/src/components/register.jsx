import React, { useState } from 'react';
import axios from 'axios';
import {Input} from '@mui/icons-material';
import NavBar from './navbar';

const Register = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleRegister = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post('http://localhost:8000/register', {
        name,
        email,
        password
      });

      console.log(response.data.message);

      // Perform further actions, such as showing a success message or redirecting the user
    } catch (error) {
      console.error(error.response.data.message);
    }
  };

  return (
    <div style = {{marginLeft:"40%", marginTop:"12%"}}>
    <NavBar bgCol="bg-warning" textCol= "white" />
      <h2 style = {{fontFamily:"Jost"}}>Register</h2>
      <form onSubmit={handleRegister}>
        <div >
          <label style = {{fontFamily:"Jost"}}>Name:</label>
          
          <input class="input-group-text" type="text" value={name} onChange={(e) => setName(e.target.value)} />
        </div>
        <div>
          <label style = {{fontFamily:"Jost"}}>Email:</label>
          <input class= "input-group-text" type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
        </div>
        <div>
          <label style = {{fontFamily:"Jost"}}>Password:</label>
          <input class= "input-group-text" type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
        </div>
        <button type="submit" class="btn btn-success" style = {{marginTop:"10px"}}>Register</button>
      </form>
    </div>
  );
};

export default Register;
