import React from 'react';
import {useState,useEffect} from 'react';
import axios from "axios";
import RefreshingComponent from "./messages";


const Chat = ({ username }) => {
    const name1 = username; 
    const [message1, setMessage1] = useState('');

    const handleSend = async (e) => {
        e.preventDefault();
    
        try {
          const response = await axios.post('http://localhost:8000/send', {
            name1,
            message1
          });
    
          console.log(response.data.message);
          setMessage1('');
    
          // Perform further actions, such as showing a success message or redirecting the user
        } catch (error) {
          console.error(error.response.data.message);
        }
      };
    




  return (
    <div className="chat-container">
      <div className="chat-header">
        <h3 style={{fontFamily:"Jost"}}>Welcome, {username}!</h3>
      </div>
      <RefreshingComponent />
      <footer className="chat-footer">

      <form onSubmit={handleSend}>
        <div class="input-group mb-3">
          <input class="form-control" type="text" value={message1} onChange={(e) => setMessage1(e.target.value)} />
          <div><button class="btn btn-outline-secondary" type="submit">Send</button>
          </div>
          </div>
      </form>

        {/* Add chat input and send button here */}
      </footer>
    </div>
  );
};

export default Chat;
