import React, { useState, useEffect, useRef } from 'react';
import axios from "axios";


const useInterval = (callback, delay) => {
    const savedCallback = useRef();
  
    useEffect(() => {
      savedCallback.current = callback;
    }, [callback]);
  
    useEffect(() => {
      const tick = () => {
        savedCallback.current();
      };
  
      if (delay !== null) {
        const intervalId = setInterval(tick, delay);
        return () => clearInterval(intervalId);
      }
    }, [delay]);
  };

const RefreshingComponent = () => {
  const [chatList, setChatList] = useState([]);



  useInterval(() => {
    fetchData();
  }, 500);

  useEffect(() => {
    fetchData();
  }, []);
 
    const fetchData = async () => {
      try {
        const response = await axios.get('http://localhost:8000/chat'); // Replace '/api/animes' with your API endpoint to retrieve anime data
        setChatList(response.data);
      } catch (error) {
        console.error('Error fetching chat data:', error);
      }
    };
  
    fetchData();


  const messages = chatList.map(chat => chat.message);
  const names = chatList.map(chat => chat.name);

  const combined = names.map((name, index) => ({
      message:messages[index],
      name: name
    }));

  var toggle= "grey";



  return (
    <div>
      <div style = {{color:"black"}} >
      {combined.map((ele,index) => (

        <div style = {{backgroundColor:toggle==="white"?(toggle= "white-smoke"):(toggle="white")}}>
        <h5 style ={{fontFamily:"Tajawal"}}>{ele.name} :</h5>
        <p style = {{fontFamily:"Jost"}}>{ele.message}</p>
        <hr></hr>
        </div>

      ))}
        {/* Display chat messages here */}
      </div>
    </div>
  );
};

export default RefreshingComponent;
