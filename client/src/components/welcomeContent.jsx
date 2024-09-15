
import WelText from "./welcomeText";
import CarouselOne from "./carousel1";
import AnimeGrid from "./animeGrid";
import NavBar from "./navbar";
import axios from "axios"
import React, { useState , useEffect} from "react";
import { Link, useLocation } from "react-router-dom";





function WelcContent(){

    const [animeList, setAnimeList] = useState([]);

    useEffect(() => {
      const fetchAnime = async () => {
        try {
          const response = await axios.get('http://localhost:8000/animes'); // Replace '/api/animes' with your API endpoint to retrieve anime data
          setAnimeList(response.data);
        } catch (error) {
          console.error('Error fetching anime data:', error);
        }
      };
    
      fetchAnime();
    }, []);


    const location = useLocation();
    const username = new URLSearchParams(location.search).get('name');
    var username2 = "anonymous";
    username2 = username===null?username2:username;

    
    const pictures = animeList.map(anime => anime.pictures[0]);
    const names = animeList.map(anime => anime.name);

    const filteredAnime2 = animeList.filter(anime => {
      const lowerCaseGenres = anime.genre.map(genre => String(genre).toLowerCase());
      return lowerCaseGenres.includes("action");
    });
  
    const names2 = filteredAnime2.map(anime => anime.name);
    const pictures2 = filteredAnime2.map(anime => anime.pictures[0]);

    const animeList2 = animeList;
    animeList2.sort((a, b) => b.ratings - a.ratings);

    const names3 = animeList2.map(anime => anime.name);
    const pictures3 = animeList2.map(anime => anime.pictures[0]);

    const filteredAnime3 = animeList.filter(anime => {
      const lowerCaseGenres = anime.genre.map(genre => String(genre).toLowerCase());
      return lowerCaseGenres.includes("adventure");
    });    

    const names4 = filteredAnime3.map(anime => anime.name);
    const pictures4 = filteredAnime3.map(anime => anime.pictures[0]);    

    return <div class = 'bg-dark'>
    {/*<div style = {{fontFamily : "Righteous" , backgroundColor : "beige" }} class= "p-3"><center><h1 style = {{fontSize : "50px"}}><img src= {image} style = {{width: "60px", height :"60px"}} alt = "" /> Anime4u</h1></center></div>*/}
    <NavBar bgCol = "bg-warning" textCol="white" userName = {username2} />
    <div class="row bg-dark grid content" style = {{backgroundColor:"white"}}>
        <div class="col-6 grid-item" style = {{paddingLeft: "2%" , paddingRight: "2%"}} md={6}><WelText /></div>
        <div class="col-6 grid-item" style = {{paddingTop : "3%", paddingLeft: "2%" , paddingRight: "2%"}} md={6}><CarouselOne /></div>
    </div>
    <AnimeGrid userName={username2}  pictures = {pictures} name = {names} board = "1" heading = "Top Rated Animes" bgCol = "bg-dark" />
    <AnimeGrid userName={username2}  pictures = {pictures2} name = {names2} board = "1" heading = "Action Animes" bgCol = "bg-dark" />
    <AnimeGrid userName={username2}  pictures = {pictures3} name = {names3} board = "1" heading = "Adventure Animes" bgCol = "bg-dark" />
    </div>;

}
export default WelcContent;