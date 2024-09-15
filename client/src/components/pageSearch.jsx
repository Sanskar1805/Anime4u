import React from 'react';
import { useLocation } from 'react-router-dom';
import NavBar from './navbar';
import axios from 'axios';
import {useEffect,useState} from 'react';
import AnimeGrid from './animeGrid';

function XYZPage() {
  const location = useLocation();
  const searchQuery = new URLSearchParams(location.search).get('search');
  const sQ2 = searchQuery.toLowerCase();

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
  
 {/* const pictures = animeList.map(anime => anime.pictures[0]);
const names = animeList.map(anime => anime.name);*/}

  const filteredAnime = animeList.filter(anime => anime.name.toLowerCase().includes(sQ2));

const names = filteredAnime.map(anime => anime.name);
const pictures = filteredAnime.map(anime => anime.pictures[0]);


const filteredAnime2 = animeList.filter(anime => {
    const lowerCaseGenres = anime.genre.map(genre => String(genre).toLowerCase());
    return lowerCaseGenres.includes(sQ2.toLowerCase());
  });

const names2 = filteredAnime2.map(anime => anime.name);
const pictures2 = filteredAnime2.map(anime => anime.pictures[0]);
const mNames = [...names,...names2];
const mPictures = [...pictures,...pictures2]

  return (
    <div class  = "bg-light" style = {{backgroundColor:"black"}}>
    <div class = 'bg-light' style = {{color:'black'}}>
      <NavBar bgCol="bg-warning" textCol="white" />
      <p class= "content">Search results for: {searchQuery}</p>
      <AnimeGrid pictures = {mPictures} name = {mNames} bgCol = "bg-light"/>
      <div class = "bg-light" style ={{marginBottom:"1000px"}}></div>
      {/* Display the search results */}
    </div>
    </div>
  );
}

export default XYZPage;
