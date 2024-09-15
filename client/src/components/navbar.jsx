import React,{useState} from "react";
import image from './otaku.png';
import { Link } from 'react-router-dom';
import Button from '@mui/material/Button';
import { Home, Search,Forum,Login,AppRegistration} from '@mui/icons-material';
import Chat from './chat';


function NavBar({bgCol,textCol,userName}){
  const existingClasses = "navbar border-bottom border-bottom-dark ";
  const modifiedClasses = `${existingClasses} ${bgCol}`;
  const [isChatVisible, setChatVisible] = useState(false);

  const toggleChatVisibility = () => {
    setChatVisible(!isChatVisible);
  };

  const [searchText, setSearchText] = useState('');
  

  const handleSearch = () => {
    window.location.href = `/components/xyz?search=${searchText}`;
    // Navigate to the XYZ page with the search text as a query parameter
    
  };
 

    return <nav class={modifiedClasses}  data-bs-theme="dark">
    <div class="container-fluid">
      <a class="navbar-brand" style = {{color : `${textCol}`,fontFamily:"Righteous",fontSize:"30px"}}><img src= {image} style = {{width: "30px", height :"30px"}} alt = "" />Anime4u </a>
      <ul class="navbar-nav me-auto mb-2 mb-lg-0">
        <li class="nav-item">
          
        </li></ul>
        <a class="nav-link active" aria-current="page" style  = {{color:"white"}} href="/"><Home x={{ fontSize: 50 }} /></a>
        <a class="nav-link active" aria-current="page" style  = {{color:"white"}} href="/components/register"><AppRegistration x={{ fontSize: 50 }} /></a>
        <a class="nav-link active" aria-current="page" style  = {{color:"white"}} href="/components/login"><Login x={{ fontSize: 50 }} /></a>
        <button onClick={toggleChatVisibility} style = {{background:"none",border:"none", marginRight:"10px", color:"white"}}><Forum /></button>
        {isChatVisible && <Chat username= {userName}/>}
        
      <form class="d-flex" role="search">
        <input class="form-control me-2" type="search" value = {searchText} placeholder="Search" aria-label="Search" onChange={(e) => setSearchText(e.target.value)} />
        <Link to={`/xyz?search=${searchText}`}><button class="btn btn-outline-success" type="submit" onClick={handleSearch}>Search</button></Link>
      </form>
    </div>
    </nav>;
}
export default NavBar;